/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/ui/fl/FakeLrepLocalStorage",
	"sap/ui/fl/FakeLrepConnector",
	"sap/ui/fl/LrepConnector",
	"sap/ui/fl/Cache",
	"sap/ui/fl/ChangePersistenceFactory",
	"sap/ui/fl/Utils"
	], function(
	FakeLrepLocalStorage, FakeLrepConnector, LrepConnector, Cache, ChangePersistenceFactory, Utils) {
	"use strict";

	FakeLrepConnectorLocalStorage._oBackendInstances = {};

	/**
	 * Class for connecting to Fake LREP storing changes in localStorage
	 *
	 * @class
	 *
	 * @author SAP SE
	 * @version 1.52.9
	 *
	 * @private
	 * @static
	 * @since 1.48
	 * @alias sap.ui.fl.FakeLrepConnectorLocalStorage
	 */
	function FakeLrepConnectorLocalStorage(mSettings){
		this.mSettings = jQuery.extend({
			"isKeyUser": true,
			"isAtoAvailable": false,
			"isProductiveSystem": false
		}, mSettings);
	}

	jQuery.extend(FakeLrepConnectorLocalStorage.prototype, FakeLrepConnector.prototype);

	/**
	 * Creates a Fake Lrep change in localStorage
	 * @param  {Object|Array} vChangeDefinitions - single or multiple changeDefinitions
	 * @returns {Promise} Returns a promise to the result of the request
	 */
	FakeLrepConnectorLocalStorage.prototype.create = function(vChangeDefinitions) {
		var response;
		if (Array.isArray(vChangeDefinitions)) {
			response = vChangeDefinitions.map(function(mChangeDefinition) {
				return this._saveChange(mChangeDefinition);
			}.bind(this));
		} else {
			response = this._saveChange(vChangeDefinitions);
		}

		return Promise.resolve({
			response: response,
			status: 'success'
		});
	};

	FakeLrepConnectorLocalStorage.prototype._saveChange = function(mChangeDefinition) {
		if (!mChangeDefinition.creation){
			mChangeDefinition.creation = new Date().toISOString();
		}
		FakeLrepLocalStorage.saveChange(mChangeDefinition.fileName, mChangeDefinition);
		return mChangeDefinition;
	};


	FakeLrepConnectorLocalStorage.prototype.update = function(mChangeDefinition, sChangeName, aChangelist, bIsVariant) {
		return Promise.resolve({
			response: this._saveChange(mChangeDefinition),
			status: 'success'
		});
	};

	/**
	 * Deletes a Fake Lrep change in localStorage
	 * @param  {Object} oChange - The change object
	 * @param  {Object} oChange.sChangeName - File name of the change object
	 * @returns {Promise} Returns a promise to the result of the request
	 */
	FakeLrepConnectorLocalStorage.prototype.deleteChange = function(oChange) {

		FakeLrepLocalStorage.deleteChange(oChange.sChangeName);

		return Promise.resolve({
			response: undefined,
			status: "nocontent"
		});
	};

	/**
	 * Deletes all Fake Lrep changes in localStorage
	 * @returns {Promise} Returns a promise to the result of the request
	 */
	FakeLrepConnectorLocalStorage.prototype.deleteChanges = function() {

		FakeLrepLocalStorage.deleteChanges();

		return Promise.resolve({
			response: undefined,
			status: "nocontent"
		});
	};

	/**
	 * Loads the changes for the given Component class name
	 * from the FakeLrepLocalStorage
	 * and also loads the mandatory FakeLrepConnector.json file.
	 * The settings are take from the JSON file, but changes are replaced with
	 * the changes from the local storage.
	 *
	 * @param {String} sComponentClassName - Component class name
	 * @returns {Promise} Returns a Promise with the changes and componentClassName
	 * @public
	 */
	FakeLrepConnectorLocalStorage.prototype.loadChanges = function(sComponentClassName) {
		var aChanges = FakeLrepLocalStorage.getChanges();

		return new Promise(function(resolve, reject) {
			var mResult = {};
			if (this.mSettings.sInitialComponentJsonPath) {
				jQuery.getJSON(this.mSettings.sInitialComponentJsonPath).done(function (oResponse) {
					mResult = {
						changes: oResponse,
						componentClassName: sComponentClassName
					};
					resolve(mResult);
				}).fail(function (error) {
					reject(error);
				});
			} else {
				resolve(mResult);
			}
		}.bind(this)).then(function(mResult) {
			var aVariants = [];
			var aControlVariantChanges = [];
			var aFilteredChanges = [];

			aChanges.forEach(function(oChange) {
				if (oChange.fileType === "ctrl_variant" && oChange.variantManagementReference) {
					aVariants.push(oChange);
				} else if (oChange.fileType === "ctrl_variant_change") {
					aControlVariantChanges.push(oChange);
				} else {
					aFilteredChanges.push(oChange);
				}
			});

			mResult = this._createChangesMap(mResult, aVariants);
			mResult = this._sortChanges(mResult, aFilteredChanges, aControlVariantChanges);
			mResult = this._assignVariantReferenceChanges(mResult);

			mResult.changes.contexts = [];
			mResult.changes.settings = this.mSettings;
			mResult.componentClassName = sComponentClassName;

			return mResult;
		}.bind(this));
	};

	FakeLrepConnectorLocalStorage.prototype._createChangesMap = function(mResult, aVariants) {
		if (!mResult || !mResult.changes) {
			mResult = {
					changes: {}
			};
		}
		if (!mResult.changes.changes) {
			mResult.changes.changes = [];
		}
		if (!mResult.changes.variantSection) {
			mResult.changes.variantSection = {};
		}
		var fnCheckForDuplicates = function(aExistingVariants, oNewVariantFromChange) {
			return aExistingVariants.some(function(oVariant) {
				return oVariant.content.fileName === oNewVariantFromChange.fileName;
			});
		};

		var oVariantManagementSection = {};
		aVariants.forEach(function(oVariant) {
			oVariantManagementSection = mResult.changes.variantSection[oVariant.variantManagementReference];
			//if VariantManagement doesn't exist
			if (!oVariantManagementSection) {
				oVariantManagementSection = {
					variants : [{
						content: oVariant,
						changes: [],
						variantChanges : {
							setTitle : []
						}
					}],
					defaultVariant : oVariant.fileName
				};
				mResult.changes.variantSection[oVariant.variantManagementReference] = oVariantManagementSection;
			} else {
				//if not a duplicate variant
				if (!fnCheckForDuplicates(oVariantManagementSection.variants, oVariant)) {
					oVariantManagementSection.variants.push({
						content: oVariant,
						changes: [],
						variantChanges : {
							setTitle : []
						}
					});
				}
			}
		});

		return mResult;
	};

	FakeLrepConnectorLocalStorage.prototype._assignVariantReferenceChanges = function(mResult) {
		Object.keys(mResult.changes.variantSection).forEach( function (sVariantManagementReference) {
			var aVariants = mResult.changes.variantSection[sVariantManagementReference].variants;
			aVariants.forEach(function (oVariant) {
				var sVariantReference = oVariant.content.variantReference;
				var aExistingChanges = oVariant.changes;
				if (sVariantReference) {
					//Referenced changes should be applied first
					aExistingChanges = this._getReferencedChanges(mResult, oVariant).concat(aExistingChanges);
				}
				oVariant.changes = aExistingChanges;
			}.bind(this));
		}.bind(this));
		return mResult;
	};

	FakeLrepConnectorLocalStorage.prototype._getReferencedChanges = function(mResult, oCurrentVariant) {
		var aReferencedChanges = [];
		mResult.changes.variantSection[oCurrentVariant.content.variantManagementReference].variants.some( function (oVariant) {
			if (oCurrentVariant.content.variantReference === oVariant.content.fileName) {
				aReferencedChanges = oVariant.changes.filter( function (oReferencedChange) {
					return Utils.isLayerAboveCurrentLayer(oReferencedChange.layer) === -1;
				});
				if (oVariant.content.variantReference) {
					aReferencedChanges = aReferencedChanges.concat(this._getReferencedChanges(mResult, oVariant));
				}
				return true;
			}
		}.bind(this));
		return aReferencedChanges;
	};

	FakeLrepConnectorLocalStorage.prototype._sortChanges = function(mResult, aChanges, aControlVariantChanges) {

		var fnAddChangeToVariant = function(mResult, sVariantManagementReference, oChange) {
			mResult.changes.variantSection[sVariantManagementReference].variants.some(function(oVariant) {
				if (oVariant.content.fileName === oChange.variantReference) {
					oVariant.changes.push(oChange);
					return true;
				}
			});
		};

		var fnAddVariantChangeToVariant = function(mResult, sVariantManagementReference, oVariantChange) {
			mResult.changes.variantSection[sVariantManagementReference].variants.some(function(oVariant) {
				if (oVariant.content.fileName === oVariantChange.variantReference) {
					oVariant.variantChanges[oVariantChange.changeType].push(oVariantChange);
					return true;
				}
			});
		};

		aChanges.forEach(function(oChange) {
			if (!oChange.variantReference) {
				mResult.changes.changes.push(oChange);
			} else {
				Object.keys(mResult.changes.variantSection).forEach(function(sVariantManagementReference) {
					fnAddChangeToVariant(mResult, sVariantManagementReference, oChange);
				});
			}
		});

		aControlVariantChanges.forEach(function(oVariantChange) {
			Object.keys(mResult.changes.variantSection).forEach(function(sVariantManagementReference) {
				fnAddVariantChangeToVariant(mResult, sVariantManagementReference, oVariantChange);
			});
		});

		return mResult;
	};


	/**
	 * Loads the settings.
	 * The settings is actually an empty object and is required for mocking the customer/vendor based process.
	 *
	 * @returns {Promise} Returns a Promise with an empty object as current settings
	 * @public
	 */
	FakeLrepConnectorLocalStorage.prototype.loadSettings = function() {

		return new Promise(function(resolve, reject){
			var oSettings = {};
			resolve(oSettings);
		});

	};

	/**
	 * Enables fake LRep connector.
	 *
	 * Hooks into the {@link sap.ui.fl.LrepConnector.createConnector} factory function to enable the fake LRep connector.
	 * If the <code>sAppComponentName</code> is provided, replaces the connector instance of corresponding {@link sap.ui.fl.ChangePersistence} by a fake one.
	 * After enabling fake LRep connector, function {@link sap.ui.fl.FakeLrepConnectorLocalStorage.disableFakeConnector} must be called to restore the original connector.
	 *
	 * @param {object} [mSettings] - map of FakeLrepConnector settings
	 * @param {string} [sAppComponentName] - Name of application component to overwrite the existing LRep connector
	 * @param {string} [sAppVersion] - Version of application to overwrite the existing LRep connector
	 */
	FakeLrepConnectorLocalStorage.enableFakeConnector = function(mSettings, sAppComponentName, sAppVersion){
		mSettings = mSettings || {};

		function replaceConnectorFactory() {
			FakeLrepConnectorLocalStorage.enableFakeConnector.original = LrepConnector.createConnector;
			LrepConnector.createConnector = function() {
				if (!FakeLrepConnectorLocalStorage._oFakeInstance){
					FakeLrepConnectorLocalStorage._oFakeInstance = new FakeLrepConnectorLocalStorage(mSettings);
				}
				return FakeLrepConnectorLocalStorage._oFakeInstance;
			};
		}

		if (sAppComponentName && sAppVersion) {
			var oChangePersistence = ChangePersistenceFactory.getChangePersistenceForComponent(sAppComponentName, sAppVersion);
			if (!(oChangePersistence._oConnector instanceof FakeLrepConnectorLocalStorage)) {
				Cache.clearEntry(sAppComponentName, sAppVersion);
				if (!FakeLrepConnectorLocalStorage._oBackendInstances[sAppComponentName]){
					FakeLrepConnectorLocalStorage._oBackendInstances[sAppComponentName] = {};
				}
				FakeLrepConnectorLocalStorage._oBackendInstances[sAppComponentName][sAppVersion] = oChangePersistence._oConnector;

				oChangePersistence._oConnector = new FakeLrepConnectorLocalStorage(mSettings);

			}
			replaceConnectorFactory();
			return;
		}

		Cache.clearEntries();

		if (FakeLrepConnectorLocalStorage.enableFakeConnector.original){
			return;
		}
		replaceConnectorFactory();
	};

	/**
	 * Restores the original {@link sap.ui.fl.LrepConnector.createConnector} factory function.
	 * If the <code>sAppComponentName</code> is provided, restores the connector instance of corresponding {@link sap.ui.fl.ChangePersistence} by the original one.
	 *
	 * @param {string} [sAppComponentName] - Name of application component to restore the original LRep connector
	 * @param {string} [sAppVersion] - Version of application to restore the original LRep connector
	 */
	FakeLrepConnectorLocalStorage.disableFakeConnector = function(sAppComponentName, sAppVersion){

		function restoreConnectorFactory() {
			if (FakeLrepConnectorLocalStorage.enableFakeConnector.original){
				LrepConnector.createConnector = FakeLrepConnectorLocalStorage.enableFakeConnector.original;
				FakeLrepConnectorLocalStorage.enableFakeConnector.original = undefined;
				FakeLrepConnectorLocalStorage._oFakeInstance = undefined;
			}
		}

		if (sAppComponentName && sAppVersion) {
			var oChangePersistence = ChangePersistenceFactory.getChangePersistenceForComponent(sAppComponentName, sAppVersion);
			if (!(oChangePersistence._oConnector instanceof LrepConnector)){
				Cache.clearEntry(sAppComponentName, sAppVersion);
				if (FakeLrepConnectorLocalStorage._oBackendInstances[sAppComponentName] && FakeLrepConnectorLocalStorage._oBackendInstances[sAppComponentName][sAppVersion]) {
					oChangePersistence._oConnector = FakeLrepConnectorLocalStorage._oBackendInstances[sAppComponentName][sAppVersion];
					FakeLrepConnectorLocalStorage._oBackendInstances[sAppComponentName][sAppVersion] = undefined;
				}
			}
			restoreConnectorFactory();
			return;
		}

		Cache.clearEntries();
		restoreConnectorFactory();
	};

	return FakeLrepConnectorLocalStorage;

}, /* bExport= */ true);