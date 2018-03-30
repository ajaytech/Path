/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.f.DynamicPageTitle.
sap.ui.define([
	"./library",
	"sap/ui/core/Control",
	"sap/ui/base/ManagedObjectObserver",
	"sap/m/Toolbar",
	"sap/m/ToolbarSeparator",
	"sap/m/OverflowToolbar",
	"sap/m/Button"
], function (library, Control, ManagedObjectObserver, Toolbar, ToolbarSeparator, OverflowToolbar, Button) {
	"use strict";

	// shortcut for sap.f.DynamicPageTitleArea
	var DynamicPageTitleArea = library.DynamicPageTitleArea;
	var oCore = sap.ui.getCore();

	/**
	 * Constructor for a new <code>DynamicPageTitle</code>.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @class
	 * Title of the {@link sap.f.DynamicPage}.
	 *
	 * <h3>Overview</h3>
	 *
	 * The <code>DynamicPageTitle</code> control is part of the {@link sap.f.DynamicPage}
	 * family and is used to serve as title of the {@link sap.f.DynamicPage DynamicPage}.
	 *
	 * <h3>Usage</h3>
	 *
	 * The <code>DynamicPageTitle</code> can hold any control and displays the most important
	 * information regarding the object that will always remain visible while scrolling.
	 *
	 * <b>Note:</b> The <code>actions</code> aggregation accepts any UI5 control, but it`s
	 * recommended to use controls, suitable for {@link sap.m.Toolbar} and {@link sap.m.OverflowToolbar}.
	 *
	 * If the <code>toggleHeaderOnTitleClick</code> property of the {@link sap.f.DynamicPage DynamicPage}
	 * is set to <code>true</code>, the user can switch between the expanded/collapsed states of the
	 * {@link sap.f.DynamicPageHeader DynamicPageHeader} by clicking on the <code>DynamicPageTitle</code>
	 * or by using the expand/collapse visual indicators, positioned at the bottom of the
	 * <code>DynamicPageTitle</code> and the <code>DynamicPageHeader</code>.
	 *
	 * If set to <code>false</code>, the <code>DynamicPageTitle</code> is not clickable,
	 * the visual indicators are not available, and the app must provide other means for
	 * expanding/collapsing the <code>DynamicPageHeader</code>, if necessary.
	 *
	 * <h3>Responsive Behavior</h3>
	 *
	 * The responsive behavior of the <code>DynamicPageTitle</code> depends on the behavior of the
	 * content that is displayed.
	 *
	 * @extends sap.ui.core.Control
	 *
	 * @author SAP SE
	 * @version 1.52.9
	 *
	 * @constructor
	 * @public
	 * @since 1.42
	 * @alias sap.f.DynamicPageTitle
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var DynamicPageTitle = Control.extend("sap.f.DynamicPageTitle", /** @lends sap.f.DynamicPageTitle.prototype */ {
		metadata: {
			library: "sap.f",
			properties: {
				/**
				* Determines which of the <code>DynamicPageTitle</code> areas (Begin, Middle) is primary.
				*
				* <b>Note:</b> The primary area is shrinking at lower rate, remaining visible as much as it can.
				*
				* @since 1.50
				*/
				primaryArea : {type: "sap.f.DynamicPageTitleArea", group: "Appearance", defaultValue: DynamicPageTitleArea.Begin}
			},
			aggregations: {

				/**
				 * The <code>heading</code> is positioned in the <code>DynamicPageTitle</code> left area
				 * and is displayed in both expanded and collapsed (snapped) states of the header.
				 * Use this aggregation to display a title (or any other UI5 control that serves
				 * as a heading) that has to be present in both expanded and collapsed states of the header.
				 *
				 * <b>Note:</b> <code>heading</code> is mutually exclusive with <code>snappedHeading</code>
				 * and <code>expandedHeading</code>. If <code>heading</code> is provided, both
				 * <code>snappedHeading</code> and <code>expandedHeading</code> are ignored.
				 * <code>heading</code> is useful when the content of <code>snappedHeading</code> and
				 * <code>expandedHeading</code> needs to be the same as it replaces them both.
				 */
				heading: {type: "sap.ui.core.Control", multiple: false, defaultValue: null},

				/**
				 * The <code>snappedHeading</code> is positioned in the <code>DynamicPageTitle</code> left area
				 * and is displayed when the header is in collapsed (snapped) state only.
				 * Use this aggregation to display a title (or any other UI5 control that serves
				 * as a heading) that has to be present in collapsed state only.
				 *
				 * <b>Note:</b> In order for <code>snappedHeading</code> to be taken into account,
				 * <code>heading</code> has to be empty. Combine <code>snappedHeading</code> with
				 * <code>expandedHeading</code> to switch content when the header switches state.
				 * @since 1.52
				 */
				snappedHeading: {type: "sap.ui.core.Control", multiple: false, defaultValue: null},

				/**
				 * The <code>expandedHeading</code> is positioned in the <code>DynamicPageTitle</code> left area
				 * and is displayed when the header is in expanded state only.
				 * Use this aggregation to display a title (or any other UI5 control that serves
				 * as a heading) that has to be present in expanded state only.
				 *
				 * <b>Note:</b> In order for <code>expandedHeading</code> to be taken into account,
				 * <code>heading</code> has to be empty. Combine <code>expandedHeading</code> with
				 * <code>snappedHeading</code> to switch content when the header switches state.
				 * @since 1.52
				 */
				expandedHeading: {type: "sap.ui.core.Control", multiple: false, defaultValue: null},

				/**
				 * The <code>DynamicPageTitle</code> actions.
				 * <br><b>Note:</b> The <code>actions</code> aggregation accepts any UI5 control, but it`s recommended to use controls,
				 * suitable for {@link sap.m.Toolbar} and {@link sap.m.OverflowToolbar}.
				 */
				actions: {type: "sap.ui.core.Control", multiple: true, singularName: "action"},

				/**
				 * The <code>DynamicPageTitle</code> navigation actions.
				 *
				 * <b>Note:</b> The <code>navigationActions</code> position depends on the control size.
				 * If the control size is 1280px or bigger, they are rendered right next to the <code>actions</code>.
				 * Otherwise, they are rendered in the top-right area, above the <code>actions</code>.
				 * If a large number of elements(buttons) are used, there could be visual degradations
				 * as the space for the <code>navigationActions</code> is limited.
				 * @since 1.52
				 */
				navigationActions: {type: "sap.m.Button", multiple: true, singularName: "navigationAction"},

				/**
				* The content is positioned in the <code>DynamicPageTitle</code> middle area
				* and displayed in both expanded and collapsed (snapped) states.
				* @since 1.50
				*/
				content: {type: "sap.ui.core.Control", multiple: true},

				/**
				 * The content that is displayed in the <code>DynamicPageTitle</code> in collapsed (snapped) state.
				 */
				snappedContent: {type: "sap.ui.core.Control", multiple: true},

				/**
				 * The content that is displayed in the <code>DynamicPageTitle</code> in expanded state.
				 */
				expandedContent: {type: "sap.ui.core.Control", multiple: true},

				/**
				 * The breadcrumbs displayed in the <code>DynamicPageTitle</code> top-left area.
				 * @since 1.52
				 */
				breadcrumbs: {type: "sap.m.IBreadcrumbs", multiple: false},

				/**
				 * Internal <code>OverflowToolbar</code> for the <code>DynamicPageTitle</code> actions.
				 */
				_actionsToolbar: {type: "sap.m.OverflowToolbar", multiple: false, visibility: "hidden"},

				/**
				 * Internal <code>Toolbar</code> for the <code>DynamicPageTitle</code> navigation actions.
				 * @since 1.52
				 */
				_navActionsToolbar: {type: "sap.m.Toolbar", multiple: false, visibility: "hidden"},

				/**
				 * Internal <code>ToolbarSeparator</code> to separate the <code>actions</code> and <code>navigationActions</code>.
				 * @since 1.52
				 */
				_navActionsToolbarSeparator: {type: "sap.m.ToolbarSeparator", multiple: false, visibility: "hidden"},

				/**
				 * Visual indication for expanding.
				 * @since 1.52
				 */
				_expandButton: {type: "sap.m.Button", multiple: false,  visibility: "hidden"}
			},
			designTime: true
		}
	});

	function exists(vObject) {
		if (arguments.length === 1) {
			// Check if vObject is an Array or jQuery empty object,
			// by looking for the inherited property "length" via the "in" operator.
			// If yes - check if the "length" is positive.
			// If not - cast the vObject to Boolean.
			return vObject && ("length" in vObject) ? vObject.length > 0 : !!vObject;
		}

		return Array.prototype.slice.call(arguments).every(function (oObject) {
			return exists(oObject);
		});
	}

	/* ========== STATIC MEMBERS  ========== */

	DynamicPageTitle.NAV_ACTIONS_PLACEMENT_BREAK_POINT = 1280; // px.

	/**
	 * Flushes the given control into the given container.
	 * @param {Element} oContainerDOM
	 * @param {sap.ui.core.Control} oControlToRender
	 * @private
	 */
	DynamicPageTitle._renderControl = function (oContainerDOM, oControlToRender) {
		var oRenderManager;

		if (!oControlToRender || !oContainerDOM) {
			return;
		}

		oRenderManager = oCore.createRenderManager();
		oRenderManager.renderControl(oControlToRender);
		oRenderManager.flush(oContainerDOM);
		oRenderManager.destroy();
	};


	function isFunction(oObject) {
		return typeof oObject === "function";
	}

	/* ========== LIFECYCLE METHODS  ========== */

	DynamicPageTitle.prototype.init = function () {
		this._bExpandedState = true;
		this._bShowExpandButton = false;
		this._fnActionSubstituteParentFunction = function () {
			return this;
		}.bind(this);

		this._bNavigationActionsInTopArea = false;
		this._oRB = oCore.getLibraryResourceBundle("sap.f");

		this._oObserver = new ManagedObjectObserver(DynamicPageTitle.prototype._observeChanges.bind(this));
		this._oObserver.observe(this, {
			aggregations: [
				"content"
			]
		});

		this._oRB = sap.ui.getCore().getLibraryResourceBundle("sap.f");
	};

	DynamicPageTitle.prototype.onBeforeRendering = function () {
		this._getActionsToolbar();
	};

	DynamicPageTitle.prototype.onAfterRendering = function () {
		this._cacheDomElements();
		this._toggleState(this._bExpandedState);
		this._doNavigationActionsLayout();
	};

	DynamicPageTitle.prototype.exit = function () {
		if (this._oObserver) {
			this._oObserver.disconnect();
			this._oObserver = null;
		}
	};

	/* ========== PUBLIC METHODS  ========== */

	DynamicPageTitle.prototype.setPrimaryArea = function (sArea) {
		if (this.getDomRef()) {
			this._toggleAreaPriorityClasses(sArea === DynamicPageTitleArea.Begin);
		}
		return this.setProperty("primaryArea", sArea, true);
	};


	/**
	 * Fires the <code>DynamicPageTitle</code> press event.
	 * @param {jQuery.Event} oEvent
	 */
	DynamicPageTitle.prototype.ontap = function (oEvent) {
		var oSrcControl = oEvent.srcControl;

		if (oSrcControl === this
			|| oSrcControl === this.getAggregation("_actionsToolbar")
			|| oSrcControl === this.getAggregation("breadcrumbs")) {
			this.fireEvent("_titlePress");
		}
	};

	DynamicPageTitle.prototype.onmouseover = function (oEvent) {
		this.fireEvent("_titleMouseOver");
	};

	DynamicPageTitle.prototype.onmouseout = function (oEvent) {
		this.fireEvent("_titleMouseOut");
	};

	/**
	 * Fires the <code>DynamicPageTitle</code> press event.
	 * @param {jQuery.Event} oEvent
	 */
	DynamicPageTitle.prototype.onsapspace = function (oEvent) {
		this.onsapenter(oEvent);
	};

	/**
	 * Fires the <code>DynamicPageTitle</code> press event.
	 * @param {jQuery.Event} oEvent
	 */
	DynamicPageTitle.prototype.onsapenter = function (oEvent) {
		if (oEvent.srcControl === this) {
			this.fireEvent("_titlePress");
		}
	};

	/* ========== DynamicPageTitle actions aggregation methods ========== */

	["addAction", "insertAction", "removeAction", "indexOfAction", "removeAllActions", "destroyActions", "getActions"]
		.forEach(function (sMethod) {
			DynamicPageTitle.prototype[sMethod] = function (oControl) {
				var oToolbar = this._getActionsToolbar(),
					sToolbarMethod = sMethod.replace(/Actions?/, "Content"),
					bSeparatorVisibilityUpdateNeeded = true,
					vResult;

				if (sMethod === "addAction" || sMethod === "insertAction") {
					oToolbar[sToolbarMethod].apply(oToolbar, arguments);
					this._preProcessAction(oControl, "actions");
					vResult = this;
				} else if (sMethod === "removeAction") {
					this._postProcessAction(oControl);
				} else if (sMethod === "removeAllActions") {
					this.getActions().forEach(this._postProcessAction, this);
				} else if (sMethod === "destroyActions") {
					this.getActions().forEach(this._postProcessAction, this);
					oToolbar[sToolbarMethod].apply(oToolbar, arguments);
					vResult = this;
				} else if (sMethod === "getActions") {
					bSeparatorVisibilityUpdateNeeded = false;
				}

				vResult = vResult || oToolbar[sToolbarMethod].apply(oToolbar, arguments);

				bSeparatorVisibilityUpdateNeeded && this._updateSeparatorVisibility();

				return vResult;
			};
		});

	/* ========== DynamicPageTitle navigationActions aggregation methods ========== */

	[
		"addNavigationAction",
		"insertNavigationAction",
		"removeNavigationAction",
		"indexOfNavigationAction",
		"removeAllNavigationActions",
		"destroyNavigationActions",
		"getNavigationActions"
	].forEach(function (sMethod) {
			DynamicPageTitle.prototype[sMethod] = function (oControl) {
				var oToolbar = this._getNavigationActionsToolbar(),
					sToolbarMethod = sMethod.replace(/NavigationActions?/, "Content"),
					bSeparatorVisibilityUpdateNeeded = true,
					vResult;

				if (sMethod === "addNavigationAction" || sMethod === "insertNavigationAction") {
					oToolbar[sToolbarMethod].apply(oToolbar, arguments);
					this._preProcessAction(oControl, "navigationActions");
					vResult = this;
				} else if (sMethod === "removeNavigationAction") {
					this._postProcessAction(oControl);
				} else if (sMethod === "removeAllNavigationActions") {
					this.getNavigationActions().forEach(this._postProcessAction, this);
				} else if (sMethod === "destroyNavigationActions") {
					this.getNavigationActions().forEach(this._postProcessAction, this);
					oToolbar[sToolbarMethod].apply(oToolbar, arguments);
					vResult = this;
				} else if (sMethod === "getNavigationActions") {
					bSeparatorVisibilityUpdateNeeded = false;
				}

				vResult = vResult || oToolbar[sToolbarMethod].apply(oToolbar, arguments);

				bSeparatorVisibilityUpdateNeeded && this._updateSeparatorVisibility();

				return vResult;
			};
		});

	/* ========== PRIVATE METHODS  ========== */

	/**
	 * Caches the DOM elements in a jQuery wrapper for later reuse.
	 * @private
	 */
	DynamicPageTitle.prototype._cacheDomElements = function () {
		this.$topNavigationActionsArea = this.$("topNavigationArea");
		this.$mainNavigationActionsArea = this.$("mainNavigationArea");
		this.$beginArea = this.$("left-inner");
		this.$middleArea = this.$("content");
		this.$snappedHeadingWrapper = this.$("snapped-heading-wrapper");
		this.$expandHeadingWrapper = this.$("expand-heading-wrapper");
		this.$snappedWrapper = this.$("snapped-wrapper");
		this.$expandWrapper = this.$("expand-wrapper");
	};

	/**
	 * Updates the priority classes of the <code>DynamicPageTitle</code> areas.
	 * @param {boolean} isPrimaryAreaBegin
	 * @private
	 */
	DynamicPageTitle.prototype._toggleAreaPriorityClasses = function (isPrimaryAreaBegin) {
		this.$beginArea.toggleClass("sapFDynamicPageTitleAreaHighPriority", isPrimaryAreaBegin);
		this.$beginArea.toggleClass("sapFDynamicPageTitleAreaLowPriority", !isPrimaryAreaBegin);
		this.$middleArea.toggleClass("sapFDynamicPageTitleAreaHighPriority", !isPrimaryAreaBegin);
		this.$middleArea.toggleClass("sapFDynamicPageTitleAreaLowPriority", isPrimaryAreaBegin);
	};

	/**
	 * Lazily retrieves the internal <code>_actionsToolbar</code> aggregation.
	 * @returns {sap.m.OverflowToolbar}
	 * @private
	 */
	DynamicPageTitle.prototype._getActionsToolbar = function () {
		if (!this.getAggregation("_actionsToolbar")) {
			this.setAggregation("_actionsToolbar", new OverflowToolbar({
				id: this.getId() + "-_actionsToolbar"
			}).addStyleClass("sapFDynamicPageTitleActionsBar"), true); // suppress invalidate, as this is always called onBeforeRendering
		}

		return this.getAggregation("_actionsToolbar");
	};

	/**
	 * Lazily retrieves the internal <code>_navActionsToolbar</code> aggregation.
	 * @returns {sap.m.Toolbar}
	 * @private
	 */
	DynamicPageTitle.prototype._getNavigationActionsToolbar = function () {
		if (!this.getAggregation("_navActionsToolbar")) {
			this.setAggregation("_navActionsToolbar", new Toolbar({
				id: this.getId() + "-navActionsToolbar"
			}).addStyleClass("sapFDynamicPageTitleActionsBar"), true);
		}

		return this.getAggregation("_navActionsToolbar");
	};

	/**
	 * Lazily retrieves the internal <code>_navActionsToolbarSeparator</code> aggregation.
	 * @returns {sap.m.Toolbar}
	 * @private
	 */
	DynamicPageTitle.prototype._getToolbarSeparator = function () {
		if (!this.getAggregation("_navActionsToolbarSeparator")) {
			this.setAggregation("_navActionsToolbarSeparator", new ToolbarSeparator({
				id: this.getId() + "-separator"
			}), true);
		}

		return this.getAggregation("_navActionsToolbarSeparator");
	};

	/* ========== DynamicPageTitle actions and navigationActions processing ========== */

	/**
	 * Pre-processes a <code>DynamicPageTitle</code> action before inserting it in the aggregation.
	 * The action would returns the <code>DynamicPageTitle</code> as its parent, rather than its real parent (the <code>OverflowToolbar</code>).
	 * This way, it looks like the <code>DynamicPageTitle</code> aggregates the actions.
	 * @param {sap.ui.core.Control} oAction
	 * @param {string} sParentAggregationName
	 * @private
	 */
	DynamicPageTitle.prototype._preProcessAction = function (oAction, sParentAggregationName) {
		if (isFunction(oAction._fnOriginalGetParent)) {
			return;
		}

		this._observeAction(oAction);

		oAction._fnOriginalGetParent = oAction.getParent;
		oAction.getParent = this._fnActionSubstituteParentFunction;

		oAction._sOriginalParentAggregationName = oAction.sParentAggregationName;
		oAction.sParentAggregationName = sParentAggregationName;
	};

	/**
	 * Post-processes a <code>DynamicPageTitle</code> action before removing it from the aggregation, so it returns its real parent (the <code>OverflowToolbar</code>),
	 * thus allowing proper processing by the framework.
	 * @param {sap.ui.core.Control} oAction
	 * @private
	 */
	DynamicPageTitle.prototype._postProcessAction = function (oAction) {
		if (!isFunction(oAction._fnOriginalGetParent)) {
			return;
		}

		this._unobserveAction(oAction);

		// The runtime adaptation tipically removes and then adds aggregations multiple times.
		// That is why we need to make sure that the controls are in their previous state
		// when preprocessed. Otherwise the wrong parent aggregation name is passed
		oAction.getParent = oAction._fnOriginalGetParent;
		oAction._fnOriginalGetParent = null;

		oAction.sParentAggregationName = oAction._sOriginalParentAggregationName;
		oAction._sOriginalParentAggregationName = null;
	};

	/**
	 * Starts observing the <code>visible</code> property.
	 * @param {sap.ui.core.Control} oControl
	 * @private
	 */
	DynamicPageTitle.prototype._observeAction = function(oControl) {
		this._oObserver.observe(oControl, {
			properties: ["visible"]
		});
	};

	/**
	 * Stops observing the <code>visible</code> property.
	 * @param {sap.ui.core.Control} oControl
	 * @private
	 */
	DynamicPageTitle.prototype._unobserveAction = function(oControl) {
		this._oObserver.unobserve(oControl, {
			properties: ["visible"]
		});
	};

	/* ========== DynamicPageTitle navigationActions placement methods ========== */

	/**
	 * Renders the <code>navigationActions</code>, depending on the <code>DynamicPageTitle</code> width.
	 * <b>Note</b> The controls are rendered either in the <code>DynamicPageTitle</code> top-right area
	 * or <code>DynamicPageTitle</code> main area.
	 * The method is called <code>onAfterRendering</code>.
	 * @private
	 */
	DynamicPageTitle.prototype._doNavigationActionsLayout = function () {
		var bRenderNavigationActionsInTopArea,
			oNavigationActionsContainerDOM,
			oNavigationActionsBar;

		if (this.getNavigationActions().length === 0) {
			return;
		}

		oNavigationActionsBar = this._getNavigationActionsToolbar();
		bRenderNavigationActionsInTopArea = this._shouldRenderActionsInTopArea();

		if (bRenderNavigationActionsInTopArea) {
			oNavigationActionsContainerDOM = this.$topNavigationActionsArea[0]; // Element should be rendered and cached already.
		} else {
			oNavigationActionsContainerDOM = this.$mainNavigationActionsArea[0]; // Element should be rendered and cached already.
		}

		this._bNavigationActionsInTopArea = bRenderNavigationActionsInTopArea;

		DynamicPageTitle._renderControl(oNavigationActionsContainerDOM, oNavigationActionsBar);
		this._updateSeparatorVisibility();
	};

	/**
	 * Handles control re-sizing.
	 * <b>Note:</b> The method is called by the parent <code>DynamicPage</code>.
	 * @param {Number} iCurrentWidth
	 * @private
	 */
	DynamicPageTitle.prototype._onResize = function (iCurrentWidth) {
		var bNavigationActionsShouldBeInTopArea,
			bNavigationActionsAreInTopArea,
			bShouldChangeNavigationActionsPlacement;

		if (this.getNavigationActions().length === 0) {
			return;
		}

		bNavigationActionsShouldBeInTopArea = iCurrentWidth < DynamicPageTitle.NAV_ACTIONS_PLACEMENT_BREAK_POINT;
		bNavigationActionsAreInTopArea = this._areNavigationActionsInTopArea();
		// expression evaluates to true, when we have 'false' and 'true' or 'true' and 'false'.
		bShouldChangeNavigationActionsPlacement = bNavigationActionsShouldBeInTopArea ^ bNavigationActionsAreInTopArea;

		if (bShouldChangeNavigationActionsPlacement) {
			this._toggleNavigationActionsPlacement(bNavigationActionsShouldBeInTopArea);
		}
	};

	/**
	 * Updates the <code>navigationActions</code> position.
	 * The action will be either placed in the <code>DynamicPageTitle</code> top-right area or in the main-right area.
	 * @param {boolean} bShowActionsInTopArea
	 * @private
	 */
	DynamicPageTitle.prototype._toggleNavigationActionsPlacement = function (bShowActionsInTopArea) {
		this["_showNavigationActionsIn" + (bShowActionsInTopArea ? "Top" : "Main") +  "Area"]();
		this._updateSeparatorVisibility();
	};

	/**
	 * Shows the <code>navigationActions</code> in the <code>DynamicPageTitle</code> top-right area.
	 * @private
	 */
	DynamicPageTitle.prototype._showNavigationActionsInTopArea = function () {
		var oNavigationBar = this._getNavigationActionsToolbar();

		if (this.$topNavigationActionsArea && this.$topNavigationActionsArea.length > 0) {
			this.$topNavigationActionsArea.html(oNavigationBar.$());
		}

		this._bNavigationActionsInTopArea = true;
	};

	/**
	 * Shows the <code>navigationActions</code> in the <code>DynamicPageTitle</code> main right area.
	 * @private
	 */
	DynamicPageTitle.prototype._showNavigationActionsInMainArea = function () {
		var oNavigationBar = this._getNavigationActionsToolbar();

		if (this.$mainNavigationActionsArea && this.$mainNavigationActionsArea.length > 0) {
			this.$mainNavigationActionsArea.html(oNavigationBar.$());
		}

		this._bNavigationActionsInTopArea = false;
	};

	DynamicPageTitle.prototype._areNavigationActionsInTopArea = function () {
		return this._bNavigationActionsInTopArea;
	};

	/**
	 * Updates the <code>ToolbarSeparator</code> visibility.
	 * The <code>ToolbarSeparator</code> separates the <code>actions</code> and the <code>navigationActions</code>.
	 * @private
	 */
	DynamicPageTitle.prototype._updateSeparatorVisibility = function() {
		if (this.getDomRef()) {
			this._getToolbarSeparator().toggleStyleClass("sapUiHidden", !this._shouldShowSeparator());
		}
	};

	/**
	 * Determines if the <code>ToolbarSeparator</code> should be displayed.
	 * @returns {Boolean}
	 * @private
	 */
	DynamicPageTitle.prototype._shouldShowSeparator = function() {
		var bHasVisibleActions,
			bHasVisibleNavigationActions;

		if (this._bNavigationActionsInTopArea) {
			return false;
		}

		bHasVisibleActions = this._getVisibleActions().length > 0;
		bHasVisibleNavigationActions = this._getVisibleNavigationActions().length > 0;

		return bHasVisibleActions && bHasVisibleNavigationActions;
	};

	/**
	 * Returns an array of the visible <code>actions</code>.
	 * @returns {Array}
	 * @private
	 */
	DynamicPageTitle.prototype._getVisibleActions = function() {
		return this.getActions().filter(function(oAction){
			return oAction.getVisible();
		});
	};

	/**
	 * Returns an array of the visible <code>navigationActions</code>.
	 * @returns {Array}
	 * @private
	 */
	DynamicPageTitle.prototype._getVisibleNavigationActions = function() {
		return this.getNavigationActions().filter(function(oAction){
			return oAction.getVisible();
		});
	};

	/**
	 * Determines if the <code>navigationActions</code> should be rendered in the top area.
	 * @returns {Boolean}
	 * @private
	 */
	DynamicPageTitle.prototype._shouldRenderActionsInTopArea = function () {
		return this._getWidth() < DynamicPageTitle.NAV_ACTIONS_PLACEMENT_BREAK_POINT;
	};

	/* ========== DynamicPageTitle expand and snapped content ========== */

	/**
	 * Toggles the title state to expanded (if bExpanded=true) or to snapped otherwise
	 * @param bExpanded
	 * @private
	 */
	DynamicPageTitle.prototype._toggleState = function (bExpanded) {
		this._bExpandedState = bExpanded;

		// Snapped content
		if (exists(this.getSnappedContent())) {
			this.$snappedWrapper.toggleClass("sapUiHidden", bExpanded);
			this.$snappedWrapper.parent().toggleClass("sapFDynamicPageTitleMainSnapContentVisible", !bExpanded);
		}

		// Snapped heading
		if (exists(this.getSnappedHeading())) {
			this.$snappedHeadingWrapper.toggleClass("sapUiHidden", bExpanded);
		}

		// Expanded content
		if (exists(this.getExpandedContent())) {
			this.$expandWrapper.toggleClass("sapUiHidden", !bExpanded);
			this.$expandWrapper.parent().toggleClass("sapFDynamicPageTitleMainExpandContentVisible", bExpanded);
		}

		// Expanded heading
		if (exists(this.getExpandedHeading())) {
			this.$expandHeadingWrapper.toggleClass("sapUiHidden", !bExpanded);
		}
	};

	/* ========== DynamicPageTitle expand indicator ========== */

	/**
	 * Lazily retrieves the <code>expandButton</code> aggregation.
	 * @returns {sap.m.Button}
	 * @private
	 */
	DynamicPageTitle.prototype._getExpandButton = function () {
		if (!this.getAggregation("_expandButton")) {
			var oExpandButton = new Button({
				id: this.getId() + "-expandBtn",
				icon: "sap-icon://slim-arrow-down",
				press: this._onExpandButtonPress.bind(this),
				tooltip: this._oRB.getText("EXPAND_HEADER_BUTTON_TOOLTIP")
			}).addStyleClass("sapFDynamicPageToggleHeaderIndicator sapUiHidden");
			this.setAggregation("_expandButton", oExpandButton, true);
		}

		return this.getAggregation("_expandButton");
	};

	/**
	 * Handles <code>expandButton</code> press.
	 * @private
	 */
	DynamicPageTitle.prototype._onExpandButtonPress = function () {
		this.fireEvent("_titleVisualIndicatorPress");
	};

	/**
	 * Toggles the <code>expandButton</code> visibility.
	 * @param {boolean} bToggle
	 * @private
	 */
	DynamicPageTitle.prototype._toggleExpandButton = function (bToggle) {
		this._setShowExpandButton(bToggle);
		this._getExpandButton().$().toggleClass("sapUiHidden", !bToggle);
	};

	/**
	 * Returns the private <code>bShowExpandButton</code> property.
	 * @returns {boolean}
	 * @private
	 */
	DynamicPageTitle.prototype._getShowExpandButton = function () {
		return this._bShowExpandButton;
	};

	/**
	 * Sets the private <code>bShowExpandButton</code> property.
	 * @param {boolean} bValue
	 * @private
	 */
	DynamicPageTitle.prototype._setShowExpandButton = function (bValue) {
		this._bShowExpandButton = !!bValue;
	};

	/**
	 * Focuses the <code>expandButton</code> button.
	 * @private
	 */
	DynamicPageTitle.prototype._focusExpandButton = function () {
		this._getExpandButton().$().focus();
	};

	/**
	 * Returns the <code>DynamicPageTitle</code> width
	 * @returns {number}
	 * @private
	 */
	DynamicPageTitle.prototype._getWidth = function () {
		return this.$().outerWidth();
	};

	/**
	* Determines the <code>DynamicPageTitle</code> state.
	* @returns {Object}
	* @private
	*/
	DynamicPageTitle.prototype._getState = function () {
		var bHasActions = this.getActions().length > 0,
			bHasNavigationActions = this.getNavigationActions().length > 0,
			aContent = this.getContent(),
			aSnapContent = this.getSnappedContent(),
			aExpandContent = this.getExpandedContent(),
			bHasExpandedContent = aExpandContent.length > 0,
			bHasSnappedContent = aSnapContent.length > 0,
			bisPrimaryAreaBegin = this.getPrimaryArea() === DynamicPageTitleArea.Begin,
			oExpandButton = this._getExpandButton(),
			oBreadcrumbs = this.getBreadcrumbs(),
			bHasTopContent = oBreadcrumbs || bHasNavigationActions,
			bHasOnlyBreadcrumbs = !!(oBreadcrumbs && !bHasNavigationActions),
			bHasOnlyNavigationActions = bHasNavigationActions && !oBreadcrumbs;

			oExpandButton.toggleStyleClass("sapUiHidden", !this._getShowExpandButton());

			return {
				id: this.getId(),
				actionBar: this._getActionsToolbar(),
				navigationBar: this._getNavigationActionsToolbar(),
				hasActions: bHasActions,
				hasNavigationActions: bHasNavigationActions,
				content: aContent,
				hasContent: aContent.length > 0,
				heading: this.getHeading(),
				snappedHeading: this.getSnappedHeading(),
				expandedHeading: this.getExpandedHeading(),
				expandButton: oExpandButton,
				snappedContent: aSnapContent,
				expandedContent: aExpandContent,
				hasSnappedContent:bHasSnappedContent,
				hasExpandedContent: bHasExpandedContent,
				hasAdditionalContent: bHasExpandedContent || bHasSnappedContent,
				isSnapped: !this._bExpandedState,
				isPrimaryAreaBegin: bisPrimaryAreaBegin,
				ariaText: this._oRB.getText("TOGGLE_HEADER"),
				breadcrumbs: this.getBreadcrumbs(),
				separator: this._getToolbarSeparator(),
				hasTopContent: bHasTopContent,
				hasOnlyBreadcrumbs: bHasOnlyBreadcrumbs,
				hasOnlyNavigationActions: bHasOnlyNavigationActions,
				contentAreaFlexBasis: this._sContentAreaFlexBasis
			};
	};

	/**
	 * Called whenever the content, actions or navigationActions aggregation are mutated.
	 * @param oChanges
	 * @private
	 */
	DynamicPageTitle.prototype._observeChanges = function (oChanges) {
		var oObject = oChanges.object,
			sChangeName = oChanges.name;

		if (oObject === this) {// changes on DynamicPageTitle level

			if (sChangeName === "content") { // change of the content aggregation
				this._observeContentChanges(oChanges);
			}

		} else if (sChangeName === "visible") { // change of the actions or navigationActions elements` visibility
				this._updateSeparatorVisibility();
		}
	};

	/**
	* Called whenever the content aggregation is mutated
	* @param {Object} oChanges
	* @private
	*/
	DynamicPageTitle.prototype._observeContentChanges = function (oChanges) {
			var oControl = oChanges.child,
				sMutation = oChanges.mutation;

		// Only overflow toolbar is supported as of now
		if (!(oControl instanceof OverflowToolbar)) {
			return;
		}

		if (sMutation === "insert") {
			oControl.attachEvent("_contentSizeChange", this._onContentSizeChange, this);
		} else if (sMutation === "remove") {
			oControl.detachEvent("_contentSizeChange", this._onContentSizeChange, this);
			this._setContentAreaFlexBasis(0);
		}
	};

	/**
	 * Called whenever the content size of an overflow toolbar, used in the content aggregation, changes.
	 * Content size is defined as the total width of the toolbar's overflow-enabled content, not the toolbar's own width.
	 * @param oEvent
	 * @private
	 */
	DynamicPageTitle.prototype._onContentSizeChange = function (oEvent) {
		var iContentSize = oEvent.getParameter("contentSize");
		this._setContentAreaFlexBasis(iContentSize);
	};

	/**
	 * Sets (if iContentSize is non-zero) or resets (otherwise) the flex-basis of the HTML element where the
	 * content aggregation is rendered.
	 * @param iContentSize - the total width of the overflow toolbar's overflow-enabled content (items that can overflow)
	 * @private
	 */
	DynamicPageTitle.prototype._setContentAreaFlexBasis = function (iContentSize) {
		var sFlexBasis;

		iContentSize = parseInt(iContentSize, 10);
		sFlexBasis = iContentSize ? iContentSize + "px" : "auto";
		this.$("content").css({
			"flex-basis": sFlexBasis,
			"-webkit-flex-basis": sFlexBasis
		});
		this._sContentAreaFlexBasis = sFlexBasis !== "auto" ? sFlexBasis : undefined;
	};

	return DynamicPageTitle;
});
