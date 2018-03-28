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
			//Adding view on Model to access later
			sap.ui.getCore().setModel(oView,"viewDetails");
			
			//if(this.getRouter().getRoute("object"));
			this.getOwnerComponent().getRouter().getRoute("detailsNav").attachPatternMatched(this._onObjectMatched, this);
			//We can get access to the oView with Model, so not sending the data
			this._promiseOnDataLoadComplete();
			
		},
			
		//Handling direct routing to a particular path
		_onObjectMatched : function(oEvt){
			var aArg = oEvt.getParameter("arguments");
			
			if(aArg.title !== "RouteNav" || aArg.title !== "SAPUI5 End-to-End Consultant" ){
			//	UI5 Routes Not Implemented In PATH Beta
			//We can move the onSelect Master Controller function to here
			}
			
			
		},
			
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ui5cnLearningPath.view.detail
		 */
			/*onBeforeRendering: function() {
			
				
			},*/
			
			onSuggestionPress: function(oEvt){
			//jQuery code for Internal CRM integration
				document.getElementById("ui5cnContact").click();
				sap.m.MessageToast.show("Make Sure the Popup is Enabled!");
				
			},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ui5cnLearningPath.view.detail
		 */
		//onAfterRendering: function() {
			
		//	},
			
		// When User Press Nav Button on Mobile
		onNavBack : function(){
			sap.ui.core.BusyIndicator.show();
			sap.ui.core.UIComponent.getRouterFor(this).navTo("master");
			sap.ui.core.BusyIndicator.hide();
		},
		
		// When data is loaded complete of Global Model add Detail Model
		// This function can also be removed by adding path specific model
		// Which will be also demonstrated  in examples
		_promiseOnDataLoadComplete : function(){
			
				//First time data load on the view, we are using promises
				// We can also use the path but promises example sho callbacks
				// and all
			var dataLoaded = new Promise(function (resolve, reject) {
			
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.loadData("./model/dataMain.json",{},false);
				if(oModel.getData()["ui5cnLearningPath"]){
						return resolve(oModel.getData()["ui5cnLearningPath"][0]);
				}else{
					return reject({});
				}
			  });
			  
			dataLoaded.then(function(oData){
				sap.ui.getCore().getModel("viewDetails").setModel(new sap.ui.model.json.JSONModel(oData),"dataCoursesDetail");
				
				sap.ui.core.BusyIndicator.hide();
				$(".loader-wrapper").remove();
				
				}).catch(function(){
					sap.m.MessageToast.show("Error in Data Load, Clear the Catch and Reload");
					sap.ui.core.BusyIndicator.hide();
					$(".loader-wrapper").remove();
					
				});
				
			
			//removing the loading message and loader
			
			
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