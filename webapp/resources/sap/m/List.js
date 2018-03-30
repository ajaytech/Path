/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./ListBase','./library'],function(L,l){"use strict";var B=l.BackgroundDesign;var a=L.extend("sap.m.List",{metadata:{library:"sap.m",properties:{backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:B.Solid}},aggregations:{columns:{type:"sap.m.Column",multiple:true,singularName:"column",deprecated:true}}}});a.prototype.onBeforeRendering=function(){if(L.prototype.onBeforeRendering){L.prototype.onBeforeRendering.call(this);}if(!this.getColumns().length||this._isColumnsIncompatible()){return;}var p=sap.ui.requireSync("sap/m/Table").prototype;Object.keys(p).forEach(function(k){this[k]=p[k];},this);if(!this.mProperties.hasOwnProperty("backgroundDesign")){this.setBackgroundDesign("Translucent");}};a.prototype._isColumnsIncompatible=function(){return sap.ui.getCore().getConfiguration().getCompatibilityVersion("sapMListAsTable").compareTo("1.16")>=0;};return a;});
