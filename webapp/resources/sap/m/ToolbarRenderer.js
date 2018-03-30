/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./BarInPageEnabler','sap/m/Toolbar'],function(B,T){"use strict";var a={};a.render=B.prototype.render;a.decorateRootElement=function(r,t){r.addClass("sapMTB");r.writeAccessibilityState(t,{role:t._getAccessibilityRole()});if(!T.hasNewFlexBoxSupport){r.addClass("sapMTBOldFlex");}else{r.addClass("sapMTBNewFlex");}if(t.getActive()){r.addClass("sapMTBActive");r.writeAttribute("tabindex","0");}else{r.addClass("sapMTBInactive");}r.addClass("sapMTB-"+t.getActiveDesign()+"-CTX");var w=t.getWidth();var h=t.getHeight();w&&r.addStyle("width",w);h&&r.addStyle("height",h);};a.renderBarContent=function(r,t){t.getContent().forEach(function(c){B.addChildClassTo(c,t);r.renderControl(c);});};a.shouldAddIBarContext=function(c){return false;};return a;},true);
