sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"ui5cnLearningPath/model/formatter"
], function(Controller, Filter, FilterOperator, formatter) {
	"use strict";

	return Controller.extend("ui5cnLearningPath.controller.Master", {
		formatter: formatter,
		onInit: function(oEvt) {
			sap.ui.core.BusyIndicator.show();
			sap.ui.getCore().setModel(this.getView(), "viewMaster");
			// keeps the filter and search state
			this._oListFilterState = {
				aFilter: [],
				aSearch: []
			};
			this._oList = this.byId("list");
		},

		onSelectionChange: function(oEvt) {
			sap.ui.core.BusyIndicator.show();
			var sTitleClicked = typeof oEvt.getSource().getSelectedItem === 'function'?oEvt.getSource().getSelectedItem().getProperty("title"):oEvt.getSource().getTitle();
			this._oList = this.byId("list");
			sap.ui.core.UIComponent.getRouterFor(this).navTo("detailsNav",{
				title: sTitleClicked
			});
			sap.ui.core.BusyIndicator.hide();

		},
		onSearch: function(oEvent) {

			if (oEvent.getParameters().refreshButtonPressed) {
				// Search field's 'refresh' button has been pressed.
				// This is visible if you select any master list item.
				// In this case no new search is triggered, we only
				// refresh the list binding.
				this.onRefresh();
				return;
			}

			var sQuery = oEvent.getParameter("query");
			

			if (sQuery) {
				this._oListFilterState.aSearch = [new Filter("Title", FilterOperator.Contains, sQuery)];
			} else {
				this._oListFilterState.aSearch = [];
			}
			
			this._applyFilterSearch();

		},
		onLiveSearch: function(oEvent) {

			if (oEvent.getParameters().refreshButtonPressed) {
				// Search field's 'refresh' button has been pressed.
				// This is visible if you select any master list item.
				// In this case no new search is triggered, we only
				// refresh the list binding.
				this.onRefresh();
				return;
			}

			var	sQuery = oEvent.getParameter("newValue");
			

			if (sQuery) {
				this._oListFilterState.aSearch = [new Filter("Title", FilterOperator.Contains, sQuery)];
			} else {
				this._oListFilterState.aSearch = [];
			}
			
			this._applyFilterSearch();

		},
		_applyFilterSearch: function() {
			var aFilters = this._oListFilterState.aSearch.concat(this._oListFilterState.aFilter),
				oViewModel = this.getView().getModel("dataCourses");
			this._oList.getBinding("items").filter(aFilters, "Application");
		},
		onAfterRendering: function() {
			sap.ui.core.BusyIndicator.hide();

		}

	});

});