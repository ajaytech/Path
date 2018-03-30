/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the Design Time Metadata for the sap.ui.layout.form.FormContainer control
sap.ui.define(['sap/ui/fl/changeHandler/ChangeHandlerMediator'],
	function(ChangeHandlerMediator) {
	"use strict";

	function _allFormElementsInvisible(oFormContainer){

		return oFormContainer.getFormElements().every(function(oFormElement){
			return oFormElement.getVisible() === false;
		});
	}

	return {
		isVisible: function(oFormContainer) {
			return oFormContainer.isVisible();
		},
		actions: {
			remove: {
				changeType: "hideControl"
			},
			rename: {
				changeType: "renameGroup",
				domRef: function (oFormContainer) {
					return jQuery(oFormContainer.getRenderedDomRef()).find(".sapUiFormTitle")[0];
				},
				isEnabled : function (oFormContainer) {
					return !(oFormContainer.getToolbar() || !oFormContainer.getTitle());
				}
			}
		},
		aggregations : {
			formElements : {
				childNames : {
					singular : "FIELD_CONTROL_NAME",
					plural : "FIELD_CONTROL_NAME_PLURAL"
				},
				domRef: function (oFormContainer) {
					var oDomRef = oFormContainer.getDomRef();
					var oHeader = oFormContainer.getTitle() || oFormContainer.getToolbar();
					if (!oDomRef && (oFormContainer.getFormElements().length === 0 || _allFormElementsInvisible(oFormContainer)) && oHeader instanceof sap.ui.core.Element) {
						return oHeader.getDomRef();
					} else if (typeof oHeader === "string") {
						return jQuery(oDomRef).find(".sapUiFormTitle").get(0);
					} else {
						return oDomRef;
					}
				},
				actions: {
					move: "moveControls",
					addODataProperty : function (oFormContainer) {
						var mChangeHandlerSettings = ChangeHandlerMediator.getAddODataFieldWithLabelSettings(oFormContainer);

						if (mChangeHandlerSettings){
							return {
								changeType: "addFormField",
								changeOnRelevantContainer : true,
								changeHandlerSettings : mChangeHandlerSettings
							};
						}
					}

				}
			},
			toolbar : {
				domRef: function (oFormContainer) {
					var oToolbar = oFormContainer.getToolbar();
					if (oToolbar) {
						return oToolbar.getDomRef();
					}
				}
			}
		},
		name: {
			singular: "GROUP_CONTROL_NAME",
			plural: "GROUP_CONTROL_NAME_PLURAL"
		}
	};

}, /* bExport= */ false);