/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./ListItemBase','./library','sap/ui/core/library'],function(L,l,c){"use strict";var T=c.TextDirection;var I=L.extend("sap.m.InputListItem",{metadata:{library:"sap.m",properties:{label:{type:"string",group:"Misc",defaultValue:null},labelTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:T.Inherit}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content",bindable:"bindable"}},designTime:true}});I.prototype.getContentAnnouncement=function(){var a=this.getLabel();this.getContent().forEach(function(C){a+=L.getAccessibilityText(C)+" ";});return a;};return I;});
