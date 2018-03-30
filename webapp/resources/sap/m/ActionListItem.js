/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./ListItemBase','./library'],function(L,l){"use strict";var a=l.ListMode;var b=l.ListType;var A=L.extend("sap.m.ActionListItem",{metadata:{library:"sap.m",properties:{text:{type:"string",group:"Misc",defaultValue:null}}}});A.prototype.init=function(){this.setType(b.Active);L.prototype.init.apply(this,arguments);};A.prototype.getMode=function(){return a.None;};A.prototype.onsapspace=A.prototype.onsapenter;A.prototype.getContentAnnouncement=function(){return this.getText();};return A;});
