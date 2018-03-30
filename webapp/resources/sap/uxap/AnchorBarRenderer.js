/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/ToolbarRenderer","sap/ui/core/Renderer","sap/m/BarInPageEnabler","./AnchorBar","./library"],function(T,R,B,A,l){"use strict";var a=R.extend(T);a.renderBarContent=function(r,t){if(t._bHasButtonsBar){r.renderControl(t._getScrollArrowLeft());r.write("<div");r.writeAttributeEscaped("id",t.getId()+"-scrollContainer");r.writeAttributeEscaped("aria-label",l.i18nModel.getResourceBundle().getText("ANCHOR_BAR_LABEL"));r.addClass("sapUxAPAnchorBarScrollContainer");r.writeClasses();r.write(">");r.write("<div");r.writeAttributeEscaped("id",t.getId()+"-scroll");r.writeAttributeEscaped("role","menu");r.write(">");a.renderBarItems(r,t);r.write("</div>");r.write("</div>");r.renderControl(t._getScrollArrowRight());}B.addChildClassTo(t._oSelect,t);r.renderControl(t._oSelect);};a.renderBarItems=function(r,t){var s=t.getSelectedButton();t.getContent().forEach(function(c){B.addChildClassTo(c,t);if(c.getId()===s){c.addStyleClass("sapUxAPAnchorBarButtonSelected");}r.renderControl(c);});};a.decorateRootElement=function(r,t){T.decorateRootElement.apply(this,arguments);if(t._sHierarchicalSelectMode===A._hierarchicalSelectModes.Icon){r.addClass("sapUxAPAnchorBarOverflow");}};return a;},true);
