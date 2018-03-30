sap.ui.define([
	] , function () {
		"use strict";

		return {

			/**
			 * Rounds the number unit value to 2 digits
			 * @public
			 * @param {string} sValue the number string to be rounded
			 * @returns {string} sValue with 2 digits rounded
			 */

			nameForStatus : function (sValue) {
				if(sValue === "projectCourse"){
					return "Project Based Course";
				}else if(sValue === "onGoing"){
					return "On-Going";
				}else if(sValue === "onGoingUpdate"){
					return "On-Going Update";
				}else if (sValue === "bundleCourse"){
					return "Bundle and Courses";
				}else{
					return "";
				}
				
			}

		};

	}
);