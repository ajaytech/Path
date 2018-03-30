/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var I={};I._aAllIconColors=['sapMITBFilterCritical','sapMITBFilterPositive','sapMITBFilterNegative','sapMITBFilterDefault'];I.render=function(r,c){var C=c.getContent(),h=c._getIconTabHeader();r.write("<div ");r.writeControlData(c);r.addClass("sapMITB");if(c.getStretchContentHeight()){r.addClass("sapMITBStretch");}if(!c.getApplyContentPadding()){r.addClass("sapMITBNoContentPadding");}r.addClass("sapMITBBackgroundDesign"+c.getBackgroundDesign());r.writeClasses();r.write(">");if(!c._bHideHeader){r.renderControl(h);}r.write("<div id='"+c.getId()+"-containerContent' ");r.addClass("sapMITBContainerContent");if(!c.getExpanded()){r.addClass("sapMITBContentClosed");}r.writeClasses();r.write(">");r.write("<div id='"+c.getId()+"-content' class='sapMITBContent' role='tabpanel' ");if(!c.getExpanded()){r.write("style='display: none'");}r.write(">");if(c.getExpanded()){if(h.oSelectedItem&&h.oSelectedItem.getContent()){var o=h.oSelectedItem.getContent();if(o.length>0){C=o;}}if(C.length>0){for(var i=0;i<C.length;i++){r.renderControl(C[i]);}}}r.write("</div>");r.write("</div>");r.write("</div>");};return I;},true);
