sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ui5cnLearningPath.controller.Detail", {
	
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ui5cnLearningPath.view.detail
		 */
		onInit: function() {
			var oView = this.getView();
			sap.ui.getCore().setModel(oView,"viewDetails");
			
		},
			
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ui5cnLearningPath.view.detail
		 */
			onBeforeRendering: function() {
			
				var oView = this.getView(),
				 globalModel = oView.getModel("dataCourses"),
				 oNewModel = new sap.ui.model.json.JSONModel(globalModel.getData()["ui5cnLearningPath"][0]);
				oView.setModel(oNewModel,"dataCoursesDetail");
				
				sap.ui.core.BusyIndicator.hide();
			},
			
			onSuggestionPress: function(oEvt){
			//jQuery code for Internal CRM integration
				$('#contactUS').click();
				sap.m.MessageToast.show("Make Sure the Popup is Enabled, Fill the Form, We Will Act on It !");
				
			},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ui5cnLearningPath.view.detail
		 */
		onAfterRendering: function() {
				sap.ui.core.BusyIndicator.hide();

			}

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ui5cnLearningPath.view.detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});