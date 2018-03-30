/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the Design Time Metadata for the sap.uxap.ObjectPageLayout control
sap.ui.define(["sap/uxap/library"],
	function(library) {
	"use strict";

	return {
		name : {
			singular : function(){
				return library.i18nModel.getResourceBundle().getText("LAYOUT_CONTROL_NAME");
			},
			plural : function(){
				return library.i18nModel.getResourceBundle().getText("LAYOUT_CONTROL__PLURAL");
			}
		},
		aggregations : {
			sections : {
				domRef : function(oElement) {
					return oElement.$("sectionsContainer").get(0);
				},
				childNames : {
					singular : function(){
						return library.i18nModel.getResourceBundle().getText("SECTION_CONTROL_NAME");
					},
					plural : function(){
						return library.i18nModel.getResourceBundle().getText("SECTION_CONTROL_NAME_PLURAL");
					}
				},
				actions : {
					move : "moveControls"
				}
			},
			headerContent : {
				domRef : function(oElement) {
					return oElement.$("headerContent").get(0);
				},
				actions : {
					move : function(oElement){
						if (!oElement || oElement.getMetadata().getName() !== 'sap.uxap.ObjectPageSection'){
							return "moveControls";
						}
					}
				}
			}
		},
		scrollContainers : [{
			domRef : "> .sapUxAPObjectPageWrapper",
			aggregations : ["sections", "headerContent"]
		}, {
			domRef : function(oElement) {
				return oElement.$("vertSB-sb").get(0);
			}
		}],

		cloneDomRef : ":sap-domref > header"
	};

}, /* bExport= */ false);
