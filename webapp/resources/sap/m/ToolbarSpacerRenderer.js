/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/ToolbarSpacer"],function(T){"use strict";var a={};a.render=function(r,c){r.write("<div");r.writeControlData(c);r.addClass("sapMTBSpacer");var w=c.getWidth();if(w){r.addStyle("width",w);}else{r.addClass(T.flexClass);}r.writeStyles();r.writeClasses();r.write("></div>");};return a;},true);
