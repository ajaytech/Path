/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the Design Time Metadata for the sap.m.Table control
sap.ui.define([
	"sap/ui/fl/changeHandler/ChangeHandlerMediator"
], function (
	ChangeHandlerMediator
) {
	"use strict";

	return {
		aggregations: {
			columns: {
				childNames : {
					singular : "COLUMN_NAME",
					plural : "COLUMN_NAME_PLURAL"
				},
				domRef: ":sap-domref .sapMListTblHeader",
				actions: {
					move: "moveTableColumns",
					addODataProperty: function (oTable) {
						var mChangeHandlerSettings = ChangeHandlerMediator.getAddODataFieldSettings(oTable);

						if (mChangeHandlerSettings){
							return {
								changeType: "addTableColumn",
								changeHandlerSettings : mChangeHandlerSettings
							};
						}
					}
				}
			}
		},
		name: {
			singular: "TABLE_NAME",
			plural: "TABLE_NAME_PLURAL"
		}
	};

}, /* bExport= */ false);