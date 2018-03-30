/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library'],function(q,l){"use strict";try{sap.ui.getCore().loadLibrary("sap.f");}catch(e){q.sap.log.error("The control 'sap.uxap.ObjectPageDynamicHeaderContent' needs library 'sap.f'.");throw(e);}var D=sap.ui.requireSync("sap/f/DynamicPageHeader");var O=D.extend("sap.uxap.ObjectPageDynamicHeaderContent",{metadata:{interfaces:["sap.uxap.IHeaderContent"],library:"sap.uxap"}});O.createInstance=function(c,v,C,p){return new O({content:c,visible:v,pinnable:p});};O.prototype.supportsPinUnpin=function(){return true;};O.prototype.supportsChildPageDesign=function(){return false;};O.prototype.supportsAlwaysExpanded=function(){return false;};O.prototype.setContentDesign=function(d){};return O;});
