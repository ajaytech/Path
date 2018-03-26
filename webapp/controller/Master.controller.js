sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("ui5cnLearningPath.controller.Master", {

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

			var oDetailView = sap.ui.getCore().getModel("viewDetails"),
			 oDetailModel = oDetailView.getModel("dataCoursesDetail"),
			 oMasterView = this.getView(),
			 oMasterModel = oMasterView.getModel("dataCourses"),
			 sTitleClicked = oEvt.getSource().getSelectedItem().getProperty("title"),
			 oGlobalModelData = oMasterModel.getData()["ui5cnLearningPath"],
			 newModelData;
			for (var i = 0; i < oGlobalModelData.length; i++) {
				if (oGlobalModelData[i]["Title"] === sTitleClicked) {
					newModelData = oGlobalModelData[i];
					oDetailModel.setData(newModelData);
					break;
				}

			}
			this._oList = this.byId("list"); 
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