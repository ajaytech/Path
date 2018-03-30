/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./ListItemBase','./library','sap/ui/core/library'],function(L,l,c){"use strict";var T=c.TextDirection;var D=L.extend("sap.m.DisplayListItem",{metadata:{library:"sap.m",properties:{label:{type:"string",group:"Misc",defaultValue:null},value:{type:"string",group:"Data",defaultValue:null},valueTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:T.Inherit}}}});D.prototype.getContentAnnouncement=function(){return this.getLabel()+" "+this.getValue();};return D;});
