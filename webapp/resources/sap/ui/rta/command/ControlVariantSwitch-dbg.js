/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	'sap/ui/rta/command/BaseCommand',
	'sap/ui/fl/changeHandler/BaseTreeModifier',
	'sap/ui/fl/Utils'
], function(BaseCommand, BaseTreeModifier, flUtils) {
	"use strict";

	/**
	 * Switch control variants
	 *
	 * @class
	 * @extends sap.ui.rta.command.BaseCommand
	 * @author SAP SE
	 * @version 1.52.9
	 * @constructor
	 * @private
	 * @since 1.50
	 * @alias sap.ui.rta.command.ControlVariantSwitch
	 */
	var ControlVariantSwitch = BaseCommand.extend("sap.ui.rta.command.ControlVariantSwitch", {
		metadata : {
			library : "sap.ui.rta",
			properties : {
				targetVariantReference : {
					type : "string"
				},
				sourceVariantReference : {
					type : "string"
				}
			},
			associations : {},
			events : {}
		}
	});

	ControlVariantSwitch.prototype.MODEL_NAME = "$FlexVariants";

	ControlVariantSwitch.prototype._getAppComponent = function(oElement) {
		if (!this._oControlAppComponent) {
			this._oControlAppComponent = oElement ? flUtils.getAppComponentForControl(oElement) : this.getSelector().appComponent;
		}
		return this._oControlAppComponent;
	};

	/**
	 * @public Template Method to implement execute logic, with ensure precondition Element is available
	 * @returns {promise} Returns resolve after execution
	 */
	ControlVariantSwitch.prototype.execute = function() {
		var oElement = this.getElement(),
			oAppComponent = this._getAppComponent(oElement),
			sNewVariantReference = this.getTargetVariantReference();

		this.oModel = oAppComponent.getModel(this.MODEL_NAME);
		this.sVariantManagementReference = BaseTreeModifier.getSelector(oElement, oAppComponent).id;
		return this._updateModelVariant(sNewVariantReference);
	};

	/**
	 * @public Template Method to implement undo logic
	 * @returns {promise} Returns resolve after undo
	 */
	ControlVariantSwitch.prototype.undo = function() {
		var sOldVariantReference = this.getSourceVariantReference();
		return this._updateModelVariant(sOldVariantReference);
	};

	/**
	 * @private Update variant for the underlying model
	 * @returns {promise} Returns promise resolve
	 */
	ControlVariantSwitch.prototype._updateModelVariant = function (sVariantReference) {
		if (this.getTargetVariantReference() !== this.getSourceVariantReference()) {
			return Promise.resolve(this.oModel.updateCurrentVariant(this.sVariantManagementReference, sVariantReference));
		}
		return Promise.resolve();
	};

	return ControlVariantSwitch;

}, /* bExport= */true);
