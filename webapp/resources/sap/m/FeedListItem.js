/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListItemBase","./Link","./library","./FormattedText","sap/ui/core/Control","sap/ui/core/IconPool","sap/m/Button","sap/ui/Device"],function(L,a,l,F,C,I,B,D){"use strict";var b=l.ListType;var c=l.ImageHelper;var d=l.LinkConversion;var e=l.ButtonType;var f=L.extend("sap.m.FeedListItem",{metadata:{library:"sap.m",properties:{icon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},activeIcon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},sender:{type:"string",group:"Data",defaultValue:null},text:{type:"string",group:"Data",defaultValue:null},info:{type:"string",group:"Data",defaultValue:null},timestamp:{type:"string",group:"Data",defaultValue:null},senderActive:{type:"boolean",group:"Behavior",defaultValue:true},iconActive:{type:"boolean",group:"Behavior",defaultValue:true},iconDensityAware:{type:"boolean",defaultValue:true},showIcon:{type:"boolean",group:"Behavior",defaultValue:true},convertLinksToAnchorTags:{type:"sap.m.LinkConversion",group:"Behavior",defaultValue:d.None},convertedLinksDefaultTarget:{type:"string",group:"Behavior",defaultValue:"_blank"},maxCharacters:{type:"int",group:"Behavior",defaultValue:null}},defaultAggregation:"actions",aggregations:{actions:{type:"sap.m.FeedListItemAction",multiple:true},_text:{type:"sap.m.FormattedText",multiple:false,visibility:"hidden"},_actionSheet:{type:"sap.m.ActionSheet",multiple:false,visibility:"hidden"},_actionButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{senderPress:{parameters:{domRef:{type:"string"},getDomRef:{type:"function"}}},iconPress:{parameters:{domRef:{type:"string"},getDomRef:{type:"function"}}}}}});f._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");f._nMaxCharactersMobile=300;f._nMaxCharactersDesktop=500;f._sTextShowMore=f._oRb.getText("TEXT_SHOW_MORE");f._sTextShowLess=f._oRb.getText("TEXT_SHOW_LESS");f.prototype.init=function(){L.prototype.init.apply(this);this.setAggregation("_text",new F(this.getId()+"-formattedText"),true);this.setAggregation("_actionButton",new B({id:this.getId()+"-actionButton",type:e.Transparent,icon:"sap-icon://overflow",press:[this._onActionButtonPress,this]}),true);};f.prototype._onActionButtonPress=function(){sap.ui.require(["sap/m/ActionSheet"],this._openActionSheet.bind(this));};f.prototype._openActionSheet=function(A){var o=this.getAggregation("_actionSheet");var g=this.getActions();var h;if(!(o&&o instanceof A)){o=new A({id:this.getId()+"-actionSheet",beforeOpen:[this._onBeforeOpenActionSheet,this]});this.setAggregation("_actionSheet",o,true);}o.destroyAggregation("buttons",true);for(var i=0;i<g.length;i++){h=g[i];o.addButton(new B({icon:h.getIcon(),text:h.getText(),press:h.firePress.bind(h,{"item":this})}));}o.openBy(this.getAggregation("_actionButton"));};f.prototype._onBeforeOpenActionSheet=function(g){var A,t;if(D.system.phone){return;}t=sap.ui.getCore().getConfiguration().getTheme();A=g.getSource().getParent();A.removeStyleClass("sapContrast sapContrastPlus");if(t==="sap_belize"){A.addStyleClass("sapContrast");}else if(t==="sap_belize_plus"){A.addStyleClass("sapContrastPlus");}};f.prototype.invalidate=function(){C.prototype.invalidate.apply(this,arguments);delete this._bTextExpanded;if(this._oLinkExpandCollapse){this._oLinkExpandCollapse.setProperty("text",f._sTextShowMore,true);}};f.prototype.onBeforeRendering=function(){this.$("realtext").find('a[target="_blank"]').off("click");var o=this.getAggregation("_text");o.setProperty("convertLinksToAnchorTags",this.getConvertLinksToAnchorTags(),true);o.setProperty("convertedLinksDefaultTarget",this.getConvertedLinksDefaultTarget(),true);if(this.getConvertLinksToAnchorTags()===l.LinkConversion.None){o.setHtmlText(this.getText());}else{o.setProperty("htmlText",this.getText(),true);}this._sFullText=o._getDisplayHtml().replace(/\n/g,"<br>");this._sShortText=this._getCollapsedText();this._bEmptyTagsInShortTextCleared=false;};f.prototype.onAfterRendering=function(){if(this._checkTextIsExpandable()&&!this._bTextExpanded){this._clearEmptyTagsInCollapsedText();}var r=this.$("realtext");F.prototype.onAfterRendering.apply({$:function(){return r;}});};f.prototype.exit=function(){this.$("realtext").find('a[target="_blank"]').off("click");if(this._oLinkControl){this._oLinkControl.destroy();}if(this._oImageControl){this._oImageControl.destroy();}if(this._oLinkExpandCollapse){this._oLinkExpandCollapse.destroy();}L.prototype.exit.apply(this);};f.prototype.ontap=function(E){if(E.srcControl){if((!this.getIconActive()&&this._oImageControl&&E.srcControl.getId()===this._oImageControl.getId())||(!this.getSenderActive()&&this._oLinkControl&&E.srcControl.getId()===this._oLinkControl.getId())||(!this._oImageControl||(E.srcControl.getId()!==this._oImageControl.getId())&&(!this._oLinkControl||(E.srcControl.getId()!==this._oLinkControl.getId()))&&(!this._oLinkExpandCollapse||(E.srcControl.getId()!==this._oLinkExpandCollapse.getId())))){L.prototype.ontap.apply(this,[E]);}}};f.prototype.onfocusin=function(E){if(this._oImageControl){var $=this.$("icon");if(E.target.id===this.getId()){$.removeAttr("alt");}else{$.attr("alt"," ");}}};f.prototype._getImageControl=function(){var i=this.getIcon();var s=i?i:I.getIconURI("person-placeholder");var g=this.getId()+'-icon';var p={src:s,alt:encodeURI(this.getSender()),densityAware:this.getIconDensityAware(),decorative:false,useIconTooltip:false};var h;if(this.getIconActive()){h=['sapMFeedListItemImage'];}else{h=['sapMFeedListItemImageInactive'];}var t=this;this._oImageControl=c.getImageControl(g,this._oImageControl,this,p,h);if(this.getIconActive()){this._oImageControl.attachPress(function(){t.fireIconPress({domRef:this.getDomRef(),getDomRef:this.getDomRef.bind(this)});});}return this._oImageControl;};f.prototype._getLinkSender=function(w){if(!this._oLinkControl){var t=this;this._oLinkControl=new a({press:function(){t.fireSenderPress({domRef:this.getDomRef(),getDomRef:this.getDomRef.bind(this)});}});this._oLinkControl.setParent(this,null,true);}if(w){this._oLinkControl.setProperty("text",this.getSender()+f._oRb.getText("COLON"),true);}else{this._oLinkControl.setProperty("text",this.getSender(),true);}this._oLinkControl.setProperty("enabled",this.getSenderActive(),true);return this._oLinkControl;};f.prototype._activeHandlingInheritor=function(){var A=this.getActiveIcon();if(this._oImageControl&&A){this._oImageControl.setSrc(A);}};f.prototype._inactiveHandlingInheritor=function(){var s=this.getIcon()?this.getIcon():I.getIconURI("person-placeholder");if(this._oImageControl){this._oImageControl.setSrc(s);}};f.prototype._getCollapsedText=function(){this._nMaxCollapsedLength=this.getMaxCharacters();if(this._nMaxCollapsedLength===0){if(D.system.phone){this._nMaxCollapsedLength=f._nMaxCharactersMobile;}else{this._nMaxCollapsedLength=f._nMaxCharactersDesktop;}}var p=this._convertHtmlToPlainText(this._sFullText);var t=null;if(p&&p.length>this._nMaxCollapsedLength){var s=p.substring(0,this._nMaxCollapsedLength);var n=s.lastIndexOf(" ");if(n>0){s=s.substr(0,n);}if(p.length===this._sFullText.length){t=s;}else{t=this._convertPlainToHtmlText(s);}}return t;};f.prototype._clearEmptyTagsInCollapsedText=function(){var r;if(this._bEmptyTagsInShortTextCleared){return;}this._bEmptyTagsInShortTextCleared=true;do{r=this.$("realtext").find(":empty").remove();}while(r.length>0);this._sShortText=this.$("realtext").html();};f.prototype._toggleTextExpanded=function(){var $=this.$("realtext");var g=this.$("threeDots");if(this._bTextExpanded){$.html(this._sShortText.replace(/&#xa;/g,"<br>"));g.text(" ... ");this._oLinkExpandCollapse.setText(f._sTextShowMore);this._bTextExpanded=false;this._clearEmptyTagsInCollapsedText();}else{$.html(this._sFullText.replace(/&#xa;/g,"<br>"));g.text("  ");this._oLinkExpandCollapse.setText(f._sTextShowLess);this._bTextExpanded=true;}};f.prototype._getLinkExpandCollapse=function(){if(!this._oLinkExpandCollapse){this._oLinkExpandCollapse=new a({text:f._sTextShowMore,press:[this._toggleTextExpanded,this]});this._bTextExpanded=false;this._oLinkExpandCollapse.setParent(this,null,true);}return this._oLinkExpandCollapse;};f.prototype._convertHtmlToPlainText=function(h){var r=/(<([^>]+)>)/ig;return h.replace(r,"");};f.prototype._convertPlainToHtmlText=function(g){var s=this._sFullText;var r=/(<([^>]+)>)/ig;var E=s.split(r);var t="";for(var i=0;i<E.length;i++){if(E[i].length===0){continue;}if(g.length>0&&E[i].indexOf(g.trim())!==-1){E[i]=g;}if(/^<.+>$/.test(E[i])){t=t+E[i];E[i+1]="";continue;}if(g.indexOf(E[i].trim())===-1){continue;}else{g=g.replace(E[i],"");}t=t+E[i];}return t;};f.prototype._checkTextIsExpandable=function(){return this._sShortText!==null;};f.prototype.setType=function(t){if(this.getType()!==t){if(t===b.Navigation){this.setProperty("type",b.Active);}else{this.setProperty("type",t);}}return this;};f.prototype.setUnread=function(v){return this.setProperty("unread",false,true);};return f;});