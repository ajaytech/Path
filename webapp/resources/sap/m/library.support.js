/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
/**
 * Adds support rules of the sap.m library to the support infrastructure.
 */
sap.ui.define(["jquery.sap.global", "sap/ui/support/library",
			   "./rules/Button.support",
			   "./rules/Dialog.support",
			   "./rules/Input.support",
			   "./rules/Panel.support",
			   "./rules/SelectDialog.support"],
	function(jQuery, SupportLib,
			ButtonSupport,
			DialogSupport,
			InputSupport,
			PanelSupport,
			SelectDialogSupport) {
	"use strict";

	return {
		name: "sap.m",
		niceName: "UI5 Main Library",
		ruleset: [
			ButtonSupport,
			DialogSupport,
			InputSupport,
			PanelSupport,
			SelectDialogSupport
		]
	};

}, true);
