/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library"],function(c){"use strict";var T=c.TextAlign;var a=c.TitleLevel;var b={};b.render=function(r,t){var A=t._getTitle(),l=(A?A.getLevel():t.getLevel())||a.Auto,d=l==a.Auto,s=d?"div":l;r.write("<",s);r.writeControlData(t);r.addClass("sapMTitle");r.addClass("sapMTitleStyle"+(t.getTitleStyle()||a.Auto));r.addClass(t.getWrapping()?"sapMTitleWrap":"sapMTitleNoWrap");r.addClass("sapUiSelectable");var w=t.getWidth();if(!w){r.addClass("sapMTitleMaxWidth");}else{r.addStyle("width",w);}var e=t.getTextAlign();if(e&&e!=T.Initial){r.addClass("sapMTitleAlign"+e);}if(t.getParent()instanceof sap.m.Toolbar){r.addClass("sapMTitleTB");}var f=A?A.getTooltip_AsString():t.getTooltip_AsString();if(f){r.writeAttributeEscaped("title",f);}if(d){r.writeAttribute("role","heading");}r.writeClasses();r.writeStyles();r.write("><span");r.writeAttribute("id",t.getId()+"-inner");r.write(">");r.writeEscaped(A?A.getText():t.getText());r.write("</span></",s,">");};return b;},true);
