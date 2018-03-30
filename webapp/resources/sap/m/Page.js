/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Control","sap/ui/core/delegate/ScrollEnablement","sap/m/Title","sap/m/Button","sap/m/Bar","sap/ui/core/ContextMenuSupport","sap/ui/core/library","sap/ui/Device","sap/ui/core/Element"],function(q,l,C,S,T,B,a,b,c,D,E){"use strict";var A=c.AccessibleLandmarkRole;var d=l.ButtonType;var P=l.PageBackgroundDesign;var e=c.TitleLevel;var f="div";var H="header";var F="footer";var g=C.extend("sap.m.Page",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Data",defaultValue:null},titleLevel:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:e.Auto},showNavButton:{type:"boolean",group:"Appearance",defaultValue:false},showHeader:{type:"boolean",group:"Appearance",defaultValue:true},showSubHeader:{type:"boolean",group:"Appearance",defaultValue:true},navButtonText:{type:"string",group:"Misc",defaultValue:null,deprecated:true},navButtonTooltip:{type:"string",group:"Misc",defaultValue:null},enableScrolling:{type:"boolean",group:"Behavior",defaultValue:true},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null,deprecated:true},backgroundDesign:{type:"sap.m.PageBackgroundDesign",group:"Appearance",defaultValue:P.Standard},navButtonType:{type:"sap.m.ButtonType",group:"Appearance",defaultValue:d.Back,deprecated:true},showFooter:{type:"boolean",group:"Appearance",defaultValue:true},contentOnlyBusy:{type:"boolean",group:"Appearance",defaultValue:false},floatingFooter:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},customHeader:{type:"sap.m.IBar",multiple:false},footer:{type:"sap.m.IBar",multiple:false},subHeader:{type:"sap.m.IBar",multiple:false},headerContent:{type:"sap.ui.core.Control",multiple:true,singularName:"headerContent"},landmarkInfo:{type:"sap.m.PageAccessibleLandmarkInfo",multiple:false},_internalHeader:{type:"sap.m.IBar",multiple:false,visibility:"hidden"}},events:{navButtonTap:{deprecated:true},navButtonPress:{}},designTime:true}});b.apply(g.prototype);g.FOOTER_ANIMATION_DURATION=350;g.prototype._hasScrolling=function(){return this.getEnableScrolling();};g.prototype.onBeforeRendering=function(){if(this._oScroller&&!this._hasScrolling()){this._oScroller.destroy();this._oScroller=null;}else if(this._hasScrolling()&&!this._oScroller){this._oScroller=new S(this,null,{scrollContainerId:this.getId()+"-cont",horizontal:false,vertical:true});}if(this._headerTitle){this._headerTitle.setLevel(this.getTitleLevel());}};g.prototype.onAfterRendering=function(){q.sap.delayedCall(10,this,this._adjustFooterWidth);};g.prototype.exit=function(){if(this._oScroller){this._oScroller.destroy();this._oScroller=null;}if(this._headerTitle){this._headerTitle.destroy();this._headerTitle=null;}if(this._navBtn){this._navBtn.destroy();this._navBtn=null;}if(this._appIcon){this._appIcon.destroy();this._appIcon=null;}};g.prototype.setBackgroundDesign=function(s){var h=this.getBackgroundDesign();this.setProperty("backgroundDesign",s,true);this.$().removeClass("sapMPageBg"+h).addClass("sapMPageBg"+this.getBackgroundDesign());return this;};g.prototype.setTitle=function(t){var w=!this._headerTitle;this._headerTitle=this._headerTitle||new T(this.getId()+"-title",{level:this.getTitleLevel()});this._headerTitle.setText(t);if(w){this._updateHeaderContent(this._headerTitle,"middle",0);}this.setProperty("title",t,true);return this;};g.prototype._ensureNavButton=function(){var s=this.getNavButtonTooltip()||sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("PAGE_NAVBUTTON_TEXT");if(!this._navBtn){var n=this.getNavButtonType();this._navBtn=new B(this.getId()+"-navButton",{press:q.proxy(function(){this.fireNavButtonPress();this.fireNavButtonTap();},this)});if(D.os.android&&n==d.Back){this._navBtn.setType(d.Up);}else{this._navBtn.setType(n);}}this._navBtn.setTooltip(s);};g.prototype.setShowNavButton=function(s){var o=!!this.getShowNavButton();if(s===o){return this;}this.setProperty("showNavButton",s,true);if(s){this._ensureNavButton();if(this._appIcon){this._updateHeaderContent(this._appIcon,"left",-1);}this._updateHeaderContent(this._navBtn,"left",0);}else if(this._navBtn){this._updateHeaderContent(this._navBtn,"left",-1);}return this;};g.prototype.setShowFooter=function(s){if(this.getDomRef()){(s)?this.$().addClass("sapMPageWithFooter"):this.$().removeClass("sapMPageWithFooter");}var $=q(this.getDomRef()).find(".sapMPageFooter").last(),u=sap.ui.getCore().getConfiguration().getAnimation();if(!this.getFloatingFooter()){this.setProperty("showFooter",s);return this;}this.setProperty("showFooter",s,true);$.removeClass("sapUiHidden");$.toggleClass("sapMPageFooterControlShow",s);$.toggleClass("sapMPageFooterControlHide",!s);if(s){return this;}if(u){q.sap.delayedCall(g.FOOTER_ANIMATION_DURATION,this,function(){$.toggleClass("sapUiHidden",s);});}else{$.toggleClass("sapUiHidden",s);}return this;};g.prototype.setNavButtonType=function(n){this._ensureNavButton();if(!D.os.ios&&n==d.Back){this._navBtn.setType(d.Up);}else{this._navBtn.setType(n);}this.setProperty("navButtonType",n,true);return this;};g.prototype.setNavButtonText=function(t){this._ensureNavButton();this.setProperty("navButtonText",t,true);return this;};g.prototype.setNavButtonTooltip=function(t){this.setProperty("navButtonTooltip",t,true);this._ensureNavButton();return this;};g.prototype.setIcon=function(i){var o=this.getIcon();if(o===i){return this;}this.setProperty("icon",i,true);return this;};g.prototype._adjustFooterWidth=function(){if(!this.getShowFooter()||!this.getFloatingFooter()||!this.getFooter()){return;}var $=q(this.getDomRef()).find(".sapMPageFooter").last();if(this._contentHasScroll()){$.css("right",q.position.scrollbarWidth()+"px");$.css("width","initial");}else{$.css("right",0);$.css("width","");}};g.prototype._contentHasScroll=function(){var $=q.sap.byId(this.getId()+"-cont",this.getDomRef());return $[0].scrollHeight>$.innerHeight();};g.prototype._updateHeaderContent=function(o,s,i){var I=this._getInternalHeader();if(I){switch(s){case"left":if(i==-1){if(I.getContentLeft()){I.removeContentLeft(o);}}else{if(I.indexOfContentLeft(o)!=i){I.insertContentLeft(o,i);I.invalidate();}}break;case"middle":if(i==-1){if(I.getContentMiddle()){I.removeContentMiddle(o);}}else{if(I.indexOfContentMiddle(o)!=i){I.insertContentMiddle(o,i);I.invalidate();}}break;case"right":if(i==-1){if(I.getContentRight()){I.removeContentRight(o);}}else{if(I.indexOfContentRight(o)!=i){I.insertContentRight(o,i);I.invalidate();}}break;default:break;}}};g.prototype._getInternalHeader=function(){var i=this.getAggregation("_internalHeader");if(!i){this.setAggregation("_internalHeader",new a(this.getId()+"-intHeader"),true);i=this.getAggregation("_internalHeader");if(this.getShowNavButton()&&this._navBtn){this._updateHeaderContent(this._navBtn,"left",0);}if(this.getTitle()&&this._headerTitle){this._updateHeaderContent(this._headerTitle,"middle",0);}}return i;};g.prototype._getAnyHeader=function(){var o=this.getCustomHeader();if(o){return o.addStyleClass("sapMPageHeader");}return this._getInternalHeader().addStyleClass("sapMPageHeader");};g.prototype.getScrollDelegate=function(){return this._oScroller;};g.prototype._formatLandmarkInfo=function(L,p){if(L){var r=L["get"+p+"Role"]()||"",s=L["get"+p+"Label"]()||"";if(r===A.None){r='';}return{role:r.toLowerCase(),label:s};}return{};};g.prototype._getHeaderTag=function(L){if(L&&L.getHeaderRole()!==A.None){return f;}return H;};g.prototype._getSubHeaderTag=function(L){if(L&&L.getSubHeaderRole()!==A.None){return f;}return H;};g.prototype._getFooterTag=function(L){if(L&&L.getFooterRole()!==A.None){return f;}return F;};g.prototype.scrollTo=function(y,t){if(this._oScroller){this._oScroller.scrollTo(0,y,t);}return this;};g.prototype.scrollToElement=function(o,t){if(o instanceof E){o=o.getDomRef();}if(this._oScroller){this._oScroller.scrollToElement(o,t);}return this;};g.prototype.setContentOnlyBusy=function(h){this.setProperty("contentOnlyBusy",h,true);this.$().toggleClass("sapMPageBusyCoversAll",!h);return this;};g.prototype.getHeaderContent=function(){return this._getInternalHeader().getContentRight();};g.prototype.indexOfHeaderContent=function(o){return this._getInternalHeader().indexOfContentRight(o);};g.prototype.insertHeaderContent=function(o,i){return this._getInternalHeader().insertContentRight(o,i);};g.prototype.addHeaderContent=function(o){return this._getInternalHeader().addContentRight(o);};g.prototype.removeHeaderContent=function(o){return this._getInternalHeader().removeContentRight(o);};g.prototype.removeAllHeaderContent=function(){return this._getInternalHeader().removeAllContentRight();};g.prototype.destroyHeaderContent=function(){return this._getInternalHeader().destroyContentRight();};g.prototype.setCustomHeader=function(h){this.setAggregation("customHeader",h);if(h&&this.mEventRegistry["_adaptableContentChange"]){this.fireEvent("_adaptableContentChange",{"parent":this,"adaptableContent":h});}return this;};g.prototype._getAdaptableContent=function(){return this._getAnyHeader();};return g;});
