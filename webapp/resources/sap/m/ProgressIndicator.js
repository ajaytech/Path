/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/ValueStateSupport','sap/ui/core/library'],function(q,l,C,V,c){"use strict";var T=c.TextDirection;var a=c.ValueState;var P=C.extend("sap.m.ProgressIndicator",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},state:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:a.None},displayValue:{type:"string",group:"Appearance",defaultValue:null},percentValue:{type:"float",group:"Data",defaultValue:0},showValue:{type:"boolean",group:"Appearance",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:T.Inherit},displayOnly:{type:"boolean",group:"Behavior",defaultValue:false}}}});var u=sap.ui.getCore().getConfiguration().getAnimation();P.prototype.setPercentValue=function(p){var t=this,$,f,b=this.$(),A;if(!i(p)){p=0;q.sap.log.warning(this+": percentValue ("+p+") is not correct! Setting the default percentValue:0.");}if(this.getPercentValue()!==p){f=this.getPercentValue()-p;this.setProperty("percentValue",p,true);if(!b.length){return this;}["sapMPIValueMax","sapMPIValueMin","sapMPIValueNormal","sapMPIValueGreaterHalf"].forEach(function(s){b.removeClass(s);});b.addClass(this._getCSSClassByPercentValue(p));b.addClass("sapMPIAnimate").attr("aria-valuenow",p).attr("aria-valuetext",this._getAriaValueText({fPercent:p}));A=u?Math.abs(f)*20:0;$=this.$("bar");$.stop();$.animate({"flex-basis":p+"%"},A,"linear",function(){t._setText.apply(t);t.$().removeClass("sapMPIAnimate");});}return this;};P.prototype._setText=function(){this.$().toggleClass("sapMPIValueGreaterHalf",this.getPercentValue()>50);return this;};P.prototype.setDisplayValue=function(d){this.setProperty("displayValue",d,true);var $=this.$("textLeft");var b=this.$("textRight");$.text(d);b.text(d);this.$().attr("aria-valuetext",this._getAriaValueText({sText:d}));return this;};P.prototype.setDisplayOnly=function(d){this.setProperty("displayOnly",d,true);if(this.getDomRef()){this.$().toggleClass("sapMPIDisplayOnly",d);}return this;};P.prototype._getCSSClassByPercentValue=function(p){if(p===100){return"sapMPIValueMax sapMPIValueGreaterHalf";}if(p===0){return"sapMPIValueMin";}if(p<=50){return"sapMPIValueNormal";}return"sapMPIValueNormal sapMPIValueGreaterHalf";};P.prototype._getAriaValueText=function(p){p.sText=p.sText||this.getDisplayValue();p.fPercent=p.fPercent||this.getPercentValue();p.sStateText=p.sStateText||this._getStateText();var A=p.sText||p.fPercent+"%";if(p.sStateText){A+=" "+p.sStateText;}return A;};P.prototype._getStateText=function(){return V.getAdditionalText(this.getState());};P.prototype.getAccessibilityInfo=function(){var b=sap.ui.getCore().getLibraryResourceBundle("sap.m");return{role:"progressbar",type:b.getText("ACC_CTR_TYPE_PROGRESS"),description:b.getText("ACC_CTR_STATE_PROGRESS",[this.getPercentValue()]),focusable:this.getEnabled(),enabled:this.getEnabled()};};function i(v){return(typeof(v)==='number')&&!isNaN(v)&&v>=0&&v<=100;}return P;});
