/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
  "jquery.sap.global",
  "sap/ui/rta/Utils",
  "sap/ui/fl/Utils",
  "sap/ui/rta/appVariant/AppVariantUtils",
  "sap/m/MessageBox",
  "sap/ui/core/BusyIndicator"
], function(jQuery,
	RtaUtils,
	FlexUtils,
	AppVariantUtils,
	MessageBox,
	BusyIndicator) {
  "use strict";

	var oAppVariantOverviewDialog,
		oAppVariantManager;

	sap.ui.getCore().getEventBus().subscribe("sap.ui.rta.appVariant.manageApps.controller.ManageApps", "navigate", function() {
		if (oAppVariantOverviewDialog) {
			oAppVariantOverviewDialog.destroy();
			oAppVariantOverviewDialog = null;
		}
	});

	return {
		onGetOverview: function(oRootControl) {
			return new Promise( function(resolve) {
				var fnCancel = function() {
					sap.ui.getCore().getEventBus().publish("sap.ui.rta.appVariant.manageApps.controller.ManageApps", "navigate");
				};
				sap.ui.require(["sap/ui/rta/appVariant/ManageAppsDialog"], function(AppVariantOverviewDialog) {
					if (!oAppVariantOverviewDialog) {
						oAppVariantOverviewDialog = new AppVariantOverviewDialog("appVariantOverviewDialog", {
							rootControl: oRootControl
						});
					}
					oAppVariantOverviewDialog.attachCancel(fnCancel);
					resolve(oAppVariantOverviewDialog.open());
				});
			});
		},
		// App variant functionality is only supported in S/4 Hana Cloud Platform & S/4 Hana (On Premise)  with 'sap-ui-xx-rta-save-as=true' (feature switch) as a part of url.
		isPlatFormEnabled: function(sLayer, oRootControl) {
			var oDescriptor = FlexUtils.getAppDescriptor(oRootControl);

			if (oDescriptor["sap.app"] && oDescriptor["sap.app"].id) {
				return AppVariantUtils.getManifirstSupport(oDescriptor["sap.app"].id).then(function(oResult) {
					if (RtaUtils.getUshellContainer() && !AppVariantUtils.isStandAloneApp() && sLayer === "CUSTOMER" && oResult.response) {
						var oUriParams = jQuery.sap.getUriParameters();
						var aUriLayer = oUriParams.mParams["sap-ui-xx-rta-save-as"];

						if (aUriLayer && aUriLayer.length) {
							var oInboundInfo;
							if (oDescriptor["sap.app"].crossNavigation && oDescriptor["sap.app"].crossNavigation.inbounds) {
								oInboundInfo = AppVariantUtils.getInboundInfo(oDescriptor["sap.app"].crossNavigation.inbounds);
							}

							if (oInboundInfo) {
								return aUriLayer[0] === 'true' ? true : false;
							}
						}
					}
					return false;
				}).catch(function(oError) {
					return AppVariantUtils.showTechnicalError(MessageBox.Icon.ERROR, "HEADER_APP_VARIANT_FEATURE_FAILED", "MSG_APP_VARIANT_FEATURE_FAILED", oError);
				});
			}

			return Promise.resolve(false);
		},
		onSaveAs: function(oRootControlRunningApp, oAppVariantDescriptor) {
			var oDescriptor, oRunningAppDescriptor, oAppVariantDescriptorClosure;

			var oEvaluateSaveAsFlow = {
				closeRunningApp : false,
				copyDirtyChanges: false
			};

			if (oAppVariantDescriptor) {
				oDescriptor = oAppVariantDescriptor;
				oRunningAppDescriptor = FlexUtils.getAppDescriptor(oRootControlRunningApp);

				if (oRunningAppDescriptor["sap.app"].id === oDescriptor["sap.app"].id) {
					oEvaluateSaveAsFlow.copyDirtyChanges = true;
				}
			} else {
				oDescriptor = FlexUtils.getAppDescriptor(oRootControlRunningApp);
				oEvaluateSaveAsFlow.closeRunningApp = true;
				oEvaluateSaveAsFlow.copyDirtyChanges = true;
			}

			return new Promise( function(resolve, reject) {
				sap.ui.require(["sap/ui/rta/appVariant/AppVariantManager"], function(AppVariantManager) {
					if (!oAppVariantManager) {
						oAppVariantManager = new AppVariantManager();
					}
					// Key user gives the input e.g title, subtitle, description, icon to create a tile on FLP
					return oAppVariantManager.processSaveAsDialog(oDescriptor)
						.then(function(oAppVariantData) {
							// Based on the key user provided info, app variant descriptor is created
							return oAppVariantManager.createDescriptor(oAppVariantData);
						})
						.then(function(oAppVariantDescriptor) {
							if (oAppVariantDescriptor) {
								BusyIndicator.show();
								oAppVariantDescriptorClosure = oAppVariantDescriptor;
								// App variant descriptor is getting saved to the layered repository
								return oAppVariantManager.saveAppVariantToLREP(oAppVariantDescriptor);
							} else {
								return false;
							}
						})
						.then(function(bSuccess) {
							if (bSuccess) {
								// If there are any unsaved changes, should be taken away for the new created app variant
								return oAppVariantManager.copyUnsavedChangesToLREP(oAppVariantDescriptorClosure._id, oRootControlRunningApp, oEvaluateSaveAsFlow.copyDirtyChanges);
							} else {
								return false;
							}
						})
						.then(function(bSuccess) {
							if (bSuccess) {
								// In case of S4 Hana Cloud, trigger automatic catalog assignment
								return oAppVariantManager.triggerCatalogAssignment(oAppVariantDescriptorClosure);
							} else {
								return false;
							}
						})
						.then(function(oResult) {
							if (oResult) {
								BusyIndicator.hide();
								var oUshellContainer = RtaUtils.getUshellContainer();
								if (oUshellContainer) {
									// Tell FLP that no UI change is booked for the currently adapting app
									oUshellContainer.setDirtyFlag(false);
								}
								// Shows the success message and closes the current app (if 'Save As' triggered from RTA toolbar) or opens the app variant overview list (if 'Save As' triggered from App variant overview List)
								return oAppVariantManager.showSuccessMessageAndTriggerActionFlow(oAppVariantDescriptorClosure, oEvaluateSaveAsFlow.closeRunningApp, oRootControlRunningApp)
									.then(function() {
										if (oResult && oResult.response && oResult.response.IAMId) {
											// In case of S4 Hana Cloud, notify the key user to refresh the FLP Homepage manually
											return oAppVariantManager.notifyKeyUserWhenTileIsReady(oResult.response.IAMId, oAppVariantDescriptorClosure._id);
										} else {
											resolve();
										}
									});
							} else {
								return false;
							}
						})
						["catch"](function() {
							resolve(false);
						});
				});
			});
		}
	};

});