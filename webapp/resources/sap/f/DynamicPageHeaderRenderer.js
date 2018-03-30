/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var D={};D.render=function(r,d){var o=d._getState();r.write("<header");r.writeControlData(d);r.writeAccessibilityState({role:"region"});r.addClass("sapContrastPlus");r.addClass("sapFDynamicPageHeader");if(o.headerHasContent){r.addClass("sapFDynamicPageHeaderWithContent");}if(o.headerPinnable){r.addClass("sapFDynamicPageHeaderPinnable");}r.writeClasses();r.write(">");this._renderHeaderContent(r,o);r.renderControl(o.collapseButton);r.write("</header>");};D._renderHeaderContent=function(r,d){if(d.headerHasContent){r.write("<div");r.addClass("sapFDynamicPageHeaderContent");r.writeClasses();r.write(">");d.content.forEach(r.renderControl);r.write("</div>");if(d.headerPinnable){this._renderPinUnpinArea(r,d);}}};D._renderPinUnpinArea=function(r,d){r.write("<div");r.addClass("sapFDynamicPageHeaderPinButtonArea");r.writeClasses();r.write(">");r.renderControl(d.pinButton);r.write("</div>");};return D;},true);
