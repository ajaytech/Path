/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides helper sap.ui.table.TableDragAndDropExtension.
sap.ui.define([
	"./TableExtension", "sap/ui/table/TableUtils"
], function(TableExtension, TableUtils) {
	"use strict";

	var SESSION_DATA_KEY_NAMESPACE = "sap.ui.table";

	var ExtensionHelper = {
		/**
		 * Gets the session data from the drag session. To get the session data that is shared by all table instances, do not specify a key.
		 *
		 * @param {Object} oDragSession The drag session.
		 * @param {string} [sKey=undefined] The key of the session data.
		 * @returns {any} The session data.
		 */
		getSessionData: function(oDragSession, sKey) {
			return oDragSession.getComplexData(SESSION_DATA_KEY_NAMESPACE + (sKey == null ? "" : "-" + sKey));
		},

		/**
		 * Sets the session data to the drag session. To set the session data that is shared by all table instances, do not specify a key.
		 *
		 * @param {Object} oDragSession The drag session.
		 * @param {any} oSessionData The session data.
		 * @param {string} [sKey=undefined] The key of the session data.
		 */
		setSessionData: function(oDragSession, oSessionData, sKey) {
			oDragSession.setComplexData(SESSION_DATA_KEY_NAMESPACE + (sKey == null ? "" : "-" + sKey), oSessionData);
		},

		/**
		 * Gets the session data of an instance from the drag session.
		 *
		 * @param {Object} oDragSession The drag session.
		 * @param {sap.ui.table.Table} oTable The instance of the table, for which to get the session data.
		 * @returns {any} The session data.
		 */
		getInstanceSessionData: function(oDragSession, oTable) {
			return this.getSessionData(oDragSession, oTable.getId());
		},

		/**
		 * Sets the session data of an instance to the drag session.
		 *
		 * @param {Object} oDragSession The drag session.
		 * @param {sap.ui.table.Table} oTable The instance of the table, for which to set the session data.
		 * @param {any} oSessionData The session data.
		 */
		setInstanceSessionData: function(oDragSession, oTable, oSessionData) {
			this.setSessionData(oDragSession, oSessionData, oTable.getId());
		}
	};

	var ExtensionDelegate = {
		ondragstart: function(oEvent) {
			var oDragSession = oEvent.dragSession;

			if (oDragSession == null || oDragSession.draggedControl == null) {
				return;
			}

			var oDraggedControl = oDragSession.draggedControl;
			var oSessionData = {};

			if (TableUtils.isInstanceOf(oDraggedControl, "sap/ui/table/Row")) {
				/*
				 * Rows which must not be draggable:
				 * - Empty rows (rows without context)
				 * - Group header rows
				 * - Sum rows
				 */
				var oDraggedRowContext = this.getContextByIndex(oDraggedControl.getIndex());
				var oDraggedRowDomRef = oDraggedControl.getDomRef();

				if (oDraggedRowContext == null // Empty row
					|| oDraggedRowDomRef.classList.contains("sapUiTableGroupHeader") // Group header row
					|| oDraggedRowDomRef.classList.contains("sapUiAnalyticalTableSum")) { // Sum row

					oEvent.preventDefault();
					return;
				} else {
					// To be able to identify whether a row is dropped on itself we need to compare the contexts. The row index is not reliable. The
					// indexing of the table can change, for example by expanding a node.
					oSessionData.draggedRowContext = oDraggedRowContext;
				}
			}

			if (TableUtils.isInstanceOf(oDraggedControl, "sap/ui/table/Column")) {
				oEvent.preventDefault();
				return;
			}

			ExtensionHelper.setInstanceSessionData(oDragSession, this, oSessionData);
		},

		ondragenter: function(oEvent) {
			var oDragSession = oEvent.dragSession;

			if (oDragSession == null || oDragSession.dropControl == null) {
				return;
			}

			var oSessionData = ExtensionHelper.getInstanceSessionData(oDragSession, this);
			var oDraggedControl = oDragSession.draggedControl;
			var oDropControl = oDragSession.dropControl;

			if (oSessionData == null) {
				oSessionData = {};
			}

			if (TableUtils.isInstanceOf(oDropControl, "sap/ui/table/Row")) {
				/*
				 * Rows which must not be droppable:
				 * - Itself // TODO: Should this be possible, e.g. for copying a row/node next to or into itself?
				 * - Empty rows (rows without context), except all rows are empty
				 * - Group header rows
				 * - Sum rows
				 */
				var oDraggedRowContext = oSessionData.draggedRowContext;
				var oDropRowContext = this.getContextByIndex(oDropControl.getIndex());
				var oDropRowDomRef = oDropControl.getDomRef();
				var bAllRowsAreEmpty = this._getTotalRowCount() === 0;

				if ((oDropRowContext == null && !bAllRowsAreEmpty) // Empty row
					|| (oDraggedRowContext != null && oDraggedRowContext === oDropRowContext) // The dragged row itself
					|| oDropRowDomRef.classList.contains("sapUiTableGroupHeader") // Group header row
					|| oDropRowDomRef.classList.contains("sapUiAnalyticalTableSum")) { // Sum row
					oEvent.preventDefault();
				} else {
					// Because the vertical scrollbar can appear after expanding rows on "longdragover",
					// the dimensions of the drop indicator always need to be updated.
					var bVerticalScrollbarVisible = this._getScrollExtension().isVerticalScrollbarVisible();
					var mTableCntRect = this.getDomRef("sapUiTableCnt").getBoundingClientRect();
					oSessionData.indicatorSize = {
						width: mTableCntRect.width - (bVerticalScrollbarVisible ? 16 : 0),
						left: mTableCntRect.left + (this._bRtlMode && bVerticalScrollbarVisible ? 16 : 0)
					};
				}
			} else if (TableUtils.isInstanceOf(oDropControl, "sap/ui/table/Column")) {
				oEvent.preventDefault();
			} else if (oDraggedControl === oDropControl) {
				oEvent.preventDefault();
			} else {
				delete oSessionData.indicatorSize;
			}

			/*
			 * Add common drag session data:
			 * - Boundaries for vertical scrolling
			 * - Boundaries for horizontal scrolling
			 */

			// TODO: The updates of session data can be done more efficiently by remembering the scrollbar visibilities and only update if needed.

			// It is unlikely, that during a drag&drop action the horizontal scrollbar appears or disappears,
			// therefore the vertical scroll edge only needs to be set once.
			if (oSessionData.verticalScrollEdge == null) {
				var iPageYOffset = window.pageYOffset;
				var mVerticalScrollRect = this.getDomRef("table").getBoundingClientRect();
				oSessionData.verticalScrollEdge = {
					bottom: mVerticalScrollRect.bottom + iPageYOffset,
					top: mVerticalScrollRect.top + iPageYOffset
				};
			}

			// Because the vertical scrollbar can appear after expanding rows on "longdragover",
			// the horizontal scroll edge always needs to be updated.
			var iPageXOffset = window.pageXOffset;
			var mHorizontalScrollRect = this.getDomRef("sapUiTableCtrlScr").getBoundingClientRect();
			oSessionData.horizontalScrollEdge = {
				left: mHorizontalScrollRect.left + iPageXOffset,
				right: mHorizontalScrollRect.right + iPageXOffset
			};

			ExtensionHelper.setInstanceSessionData(oDragSession, this, oSessionData);
		},

		ondragover: function(oEvent) {
			var oDragSession = oEvent.dragSession;

			if (oDragSession == null) {
				return;
			}

			var oSessionData = ExtensionHelper.getInstanceSessionData(oDragSession, this);

			if (oSessionData == null) {
				return;
			}

			var iScrollDistance = 32;
			var iThreshold = 50;
			var oDropControl = oDragSession.dropControl;
			var oIndicator = jQuery(oDragSession.getIndicator());
			var oScrollExtension = this._getScrollExtension();
			var oVerticalScrollbar = oScrollExtension.getVerticalScrollbar();
			var oHorizontalScrollbar = oScrollExtension.getHorizontalScrollbar();
			var oVerticalScrollEdge = oSessionData.verticalScrollEdge;
			var oHorizontalScrollEdge = oSessionData.horizontalScrollEdge;
			var oIndicatorSize = oSessionData.indicatorSize;

			if (oVerticalScrollEdge != null && oVerticalScrollbar != null && oDropControl !== this) {
				var iPageY = oEvent.pageY;

				if (iPageY >= oVerticalScrollEdge.top - iThreshold && iPageY <= oVerticalScrollEdge.top + iThreshold) {
					oVerticalScrollbar.scrollTop -= iScrollDistance;
				} else if (iPageY <= oVerticalScrollEdge.bottom + iThreshold && iPageY >= oVerticalScrollEdge.bottom - iThreshold) {
					oVerticalScrollbar.scrollTop += iScrollDistance;
				}
			}

			if (oHorizontalScrollEdge != null && oHorizontalScrollbar != null && oDropControl !== this) {
				var iPageX = oEvent.pageX;

				if (iPageX >= oHorizontalScrollEdge.left - iThreshold && iPageX <= oHorizontalScrollEdge.left + iThreshold) {
					oHorizontalScrollbar.scrollLeft -= iScrollDistance;
				} else if (iPageX <= oHorizontalScrollEdge.right + iThreshold && iPageX >= oHorizontalScrollEdge.right - iThreshold) {
					oHorizontalScrollbar.scrollLeft += iScrollDistance;
				}
			}

			if (oIndicator != null && oIndicatorSize != null && oDropControl != null) {
				oIndicator.css(oIndicatorSize);
			}
		},

		onlongdragover: function(oEvent) {
			var oDragSession = oEvent.dragSession;

			if (oDragSession == null) {
				return;
			}

			var $Cell = TableUtils.getCell(this, oEvent.target);
			var iRowIndex = TableUtils.getCellInfo($Cell).rowIndex;
			var oRow = iRowIndex == null ? null : this.getRows()[iRowIndex];
			var oDropControl = oDragSession.dropControl;

			if (oRow != null && (oDropControl == oRow || oDropControl == null)) {
				TableUtils.Grouping.toggleGroupHeader(this, oRow.getIndex(), true);
			}
		}
	};

	/**
	 * Extension for sap.ui.table.Table which handles drag and drop.
	 *
	 * @class Extension for sap.ui.table.Table which handles drag and drop.
	 *
	 * @extends sap.ui.table.TableExtension
	 * @author SAP SE
	 * @version 1.52.9
	 * @constructor
	 * @private
	 * @alias sap.ui.table.TableDragAndDropExtension
	 */
	var TableDragAndDropExtension = TableExtension.extend("sap.ui.table.TableDragAndDropExtension",
		/** @lends sap.ui.table.TableDragAndDropExtension.prototype */ {
		/**
		 * @override
		 * @inheritDoc
		 * @returns {string} The name of this extension.
		 */
		_init: function(oTable, sTableType, mSettings) {
			this._oDelegate = ExtensionDelegate;

			oTable.addEventDelegate(this._oDelegate, oTable);

			return "DragAndDropExtension";
		},

		/**
		 * Enables debugging for the extension. Internal helper classes become accessible.
		 *
		 * @private
		 */
		_debug: function() {
			this._ExtensionDelegate = ExtensionDelegate;
		},

		/**
		 * @override
		 * @inheritDoc
		 */
		destroy: function() {
			var oTable = this.getTable();
			if (oTable) {
				oTable.removeEventDelegate(this._oDelegate);
			}

			this._oDelegate = null;
			TableExtension.prototype.destroy.apply(this, arguments);
		}
	});

	return TableDragAndDropExtension;

	});

/**
 * Gets the drag & drop extension.
 *
 * @name sap.ui.table.Table#_getDragAndDropExtension
 * @function
 * @returns {sap.ui.table.TableDragAndDropExtension} The drag & drop extension.
 * @private
 */