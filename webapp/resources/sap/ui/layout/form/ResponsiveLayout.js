/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/layout/ResponsiveFlowLayout','sap/ui/layout/ResponsiveFlowLayoutData','./FormLayout','sap/ui/layout/library','sap/ui/core/Control'],function(q,R,a,F,l,C){"use strict";var b=F.extend("sap.ui.layout.form.ResponsiveLayout",{metadata:{library:"sap.ui.layout"}});var P=C.extend("sap.ui.layout.form.ResponsiveLayoutPanel",{metadata:{aggregations:{"content":{type:"sap.ui.layout.ResponsiveFlowLayout",multiple:false}},associations:{"container":{type:"sap.ui.layout.form.FormContainer",multiple:false},"layout":{type:"sap.ui.layout.form.ResponsiveLayout",multiple:false}}},getLayoutData:function(){var i=sap.ui.getCore().byId(this.getContainer());var L=sap.ui.getCore().byId(this.getLayout());var j;if(L&&i){j=L.getLayoutDataForElement(i,"sap.ui.layout.ResponsiveFlowLayoutData");}return j;},getCustomData:function(){var i=sap.ui.getCore().byId(this.getContainer());if(i){return i.getCustomData();}},refreshExpanded:function(){var i=sap.ui.getCore().byId(this.getContainer());if(i){if(i.getExpanded()){this.$().removeClass("sapUiRLContainerColl");}else{this.$().addClass("sapUiRLContainerColl");}}},renderer:function(r,p){var i=sap.ui.getCore().byId(p.getContainer());var L=sap.ui.getCore().byId(p.getLayout());var j=p.getContent();if(!i||!L){return;}var E=i.getExpandable();var t=i.getTooltip_AsString();var T=i.getToolbar();var s=i.getTitle();r.write("<div");r.writeControlData(p);r.addClass("sapUiRLContainer");if(E&&!i.getExpanded()){r.addClass("sapUiRLContainerColl");}if(T){r.addClass("sapUiFormContainerToolbar");}else if(s){r.addClass("sapUiFormContainerTitle");}if(t){r.writeAttributeEscaped('title',t);}r.writeClasses();L.getRenderer().writeAccessibilityStateContainer(r,i);r.write(">");if(T){r.renderControl(T);}else if(i.getTitle()){L.getRenderer().renderTitle(r,s,i._oExpandButton,E,false,i.getId());}if(j){r.write("<div");r.addClass("sapUiRLContainerCont");r.writeClasses();r.write(">");r.renderControl(j);r.write("</div>");}r.write("</div>");}});b.prototype.init=function(){this.mContainers={};this._defaultLayoutData=new a({margin:false});};b.prototype.exit=function(){for(var s in this.mContainers){m.call(this,s);}if(this._mainRFLayout){this._mainRFLayout.destroy();delete this._mainRFLayout;}this._defaultLayoutData.destroy();delete this._defaultLayoutData;};b.prototype.onBeforeRendering=function(E){var i=this.getParent();if(!i||!(i instanceof sap.ui.layout.form.Form)){return;}i._bNoInvalidate=true;_.call(this,i);o.call(this,i);i._bNoInvalidate=false;};b.prototype.contentOnAfterRendering=function(i,j){F.prototype.contentOnAfterRendering.apply(this,arguments);if(j.getWidth&&(!j.getWidth()||j.getWidth()=="auto")&&(!j.getFormDoNotAdjustWidth||!j.getFormDoNotAdjustWidth())){j.$().css("width","100%");}};b.prototype.toggleContainerExpanded=function(i){var s=i.getId();if(this.mContainers[s]&&this.mContainers[s][0]){var p=this.mContainers[s][0];p.refreshExpanded();}};b.prototype.onLayoutDataChange=function(E){var s=E.srcControl;var i;var j;var p;if(s instanceof sap.ui.layout.form.FormContainer){if(this._mainRFLayout){this._mainRFLayout.onLayoutDataChange(E);}}else if(s instanceof sap.ui.layout.form.FormElement){j=s.getParent().getId();if(this.mContainers[j]&&this.mContainers[j][1]){this.mContainers[j][1].onLayoutDataChange(E);}}else{var r=s.getParent();if(r instanceof sap.ui.layout.form.FormElement){i=r.getParent();j=i.getId();p=r.getId();if(this.mContainers[j]&&this.mContainers[j][2]&&this.mContainers[j][2][p]){if(this.mContainers[j][2][p][1]){var t=r.getFields();h.call(this,this.mContainers[j][2][p][1],t);}this.mContainers[j][2][p][0].onLayoutDataChange(E);}}}};b.prototype.onsapup=function(E){this.onsapleft(E);};b.prototype.onsapdown=function(E){this.onsapright(E);};b.prototype.getContainerRenderedDomRef=function(i){if(this.getDomRef()){var s=i.getId();if(this.mContainers[s]){if(this.mContainers[s][0]){var p=this.mContainers[s][0];return p.getDomRef();}else if(this.mContainers[s][1]){var r=this.mContainers[s][1];return r.getDomRef();}}}return null;};b.prototype.getElementRenderedDomRef=function(E){if(this.getDomRef()){var i=E.getParent();var s=E.getId();var j=i.getId();if(this.mContainers[j]){if(this.mContainers[j][2]){var r=this.mContainers[j][2];if(r[s]){var p=r[s][0];return p.getDomRef();}}}}return null;};function _(j){var p=j.getFormContainers();var r;var s;var L=p.length;var v=0;var t;var u;var i=0;for(i=0;i<L;i++){r=p[i];r._checkProperties();if(r.isVisible()){v++;s=r.getId();t=undefined;u=undefined;if(this.mContainers[s]&&this.mContainers[s][1]){u=this.mContainers[s][1];}else{u=f.call(this,r,undefined);}var T=r.getTitle();var w=r.getToolbar();if(w||T||r.getExpandable()){if(this.mContainers[s]&&this.mContainers[s][0]){t=this.mContainers[s][0];}else{t=c.call(this,r,u);g(u,true);}u.removeStyleClass("sapUiRLContainer");}else{if(this.mContainers[s]&&this.mContainers[s][0]){d(this.mContainers[s][0]);g(u,false);}u.addStyleClass("sapUiRLContainer");}var x=e.call(this,r,u);this.mContainers[s]=[t,u,x];}}var O=Object.keys(this.mContainers).length;if(v<O){for(s in this.mContainers){var y=false;for(i=0;i<L;i++){r=p[i];if(s==r.getId()&&r.isVisible()){y=true;break;}}if(!y){m.call(this,s);}}}}function c(i,r){var s=i.getId();var p=new P(s+"--Panel",{container:i,layout:this,content:r});return p;}function d(p){p.setContent("");p.setLayout("");p.setContainer("");p.destroy();}function e(j,p){var s=j.getId();var E=j.getFormElements();var L=E.length;var v=0;var r={};if(this.mContainers[s]&&this.mContainers[s][2]){r=this.mContainers[s][2];}var t;var u;var w=-1;var x;var y;var i=0;for(i=0;i<L;i++){x=E[i];if(x.isVisible()){y=x.getId();n.call(this,j,x,r,p,i);if(r[y]){t=r[y][0];w=p.indexOfContent(t);if(w!=v){p.removeContent(t);p.insertContent(t,v);w=v;}}else{t=f.call(this,j,x);t.addStyleClass("sapUiRLElement");if(x.getLabel()){t.addStyleClass("sapUiRLElementWithLabel");}r[y]=[t,undefined];w++;p.insertContent(t,w);}var z=x.getFields();if(x.getLabel()&&z.length>1){if(r[y][1]){u=r[y][1];}else{u=f.call(this,j,x,true);u.addStyleClass("sapUiRLElementFields");r[y][1]=u;}h.call(this,u,z);}else{if(r[y][1]){u=r[y][1];k(u);r[y][1]=undefined;}}v++;}}var O=Object.keys(r).length;if(v<O){for(y in r){var A=false;for(i=0;i<L;i++){x=E[i];if(y==x.getId()&&x.isVisible()){A=true;break;}}if(!A){if(r[y][1]){u=r[y][1];k(u);}t=r[y][0];p.removeContent(t);k(t);delete r[y];}}}return r;}function f(i,E,j){var I;if(E&&!j){I=E.getId()+"--RFLayout";}else if(E&&j){I=E.getId()+"--content--RFLayout";}else if(i){I=i.getId()+"--RFLayout";}else{return false;}var r=new R(I);r.__myParentLayout=this;r.__myParentContainerId=i.getId();if(E){r.__myParentElementId=E.getId();if(!j){r.getContent=function(){var E=sap.ui.getCore().byId(this.__myParentElementId);if(E){var p=[];var L=E.getLabelControl();var s=E.getFields();if(!L||s.length<=1){p=s;if(L){p.unshift(L);}}else{var t=this.__myParentLayout;var u=this.__myParentContainerId;var v=E.getId();if(L){p.push(L);}if(t.mContainers[u]&&t.mContainers[u][2]&&t.mContainers[u][2][v]&&t.mContainers[u][2][v][1]){p.push(t.mContainers[u][2][v][1]);}}return p;}else{return false;}};r._addContentClass=function(p,s){if(s==0){var E=sap.ui.getCore().byId(this.__myParentElementId);if(E){var L=E.getLabelControl();if(p==L){return"sapUiFormElementLbl";}}}return null;};}else{r.getContent=function(){var E=sap.ui.getCore().byId(this.__myParentElementId);if(E){return E.getFields();}else{return false;}};}}else if(i){r._getAccessibleRole=function(){var i=sap.ui.getCore().byId(this.__myParentContainerId);var L=this.__myParentLayout;if(L._mainRFLayout&&!i.getToolbar()&&!i.getTitle()&&!i.getExpandable()&&i.getAriaLabelledBy().length>0){return"form";}};r.getAriaLabelledBy=function(){var i=sap.ui.getCore().byId(this.__myParentContainerId);if(i&&!i.getToolbar()&&!i.getTitle()&&!i.getExpandable()){return i.getAriaLabelledBy();}return[];};}if((E&&!j)||(!E&&!i.getToolbar()&&!i.getTitle()&&!i.getExpandable())){g(r,false);}else{r.setLayoutData(new a({margin:false}));}return r;}function g(r,O){if(O){if(r.__originalGetLayoutData){r.getLayoutData=r.__originalGetLayoutData;delete r.__originalGetLayoutData;}}else if(!r.__originalGetLayoutData){r.__originalGetLayoutData=r.getLayoutData;r.getLayoutData=function(){var L=this.__myParentLayout;var i=sap.ui.getCore().byId(this.__myParentContainerId);var E=sap.ui.getCore().byId(this.__myParentElementId);var j;if(E){j=L.getLayoutDataForElement(E,"sap.ui.layout.ResponsiveFlowLayoutData");}else if(i){j=L.getLayoutDataForElement(i,"sap.ui.layout.ResponsiveFlowLayoutData");}if(j){return j;}else if(E){return L._defaultLayoutData;}};}}function h(r,j){var L;var w=0;for(var i=0;i<j.length;i++){var p=j[i];L=this.getLayoutDataForElement(p,"sap.ui.layout.ResponsiveFlowLayoutData");if(L){w=w+L.getWeight();}else{w++;}}L=r.getLayoutData();if(L){L.setWeight(w);}else{r.setLayoutData(new a({weight:w}));}}function k(r){if(r.__myParentContainerId){r.__myParentContainerId=undefined;}if(r.__myParentElementId){r.__myParentElementId=undefined;}r.__myParentLayout=undefined;r.destroy();}function m(s){var i=this.mContainers[s];var r;var E=i[2];if(E){for(var j in E){if(E[j][1]){k(E[j][1]);}r=E[j][0];k(r);delete E[j];}}r=i[1];if(r){r.removeAllContent();k(r);}var p=i[0];if(p){d(p);}delete this.mContainers[s];}function n(i,E,r,j,I){var s=E.getId();var p=s+"--RFLayout";var t=sap.ui.getCore().byId(p);if(!r[s]&&t){var O=t.__myParentContainerId;r[s]=this.mContainers[O][2][s];j.insertContent(t,I);t.__myParentContainerId=i.getId();if(r[s][1]){r[s][1].__myParentContainerId=i.getId();}delete this.mContainers[O][2][s];}}function o(p){var r=p.getFormContainers();var v=[];var s;var L=0;var t=0;var i=0;var j=0;for(i=0;i<r.length;i++){s=r[i];if(s.isVisible()){L++;v.push(s);}}if(L>1){if(!this._mainRFLayout){this._mainRFLayout=new R(p.getId()+"--RFLayout").setParent(this);}else{var u=this._mainRFLayout.getContent();t=u.length;var E=false;for(i=0;i<t;i++){var w=u[i];s=undefined;if(w.getContainer){s=sap.ui.getCore().byId(w.getContainer());}else{s=sap.ui.getCore().byId(w.__myParentContainerId);}if(s&&s.isVisible()){var V=v[j];if(s!=V){E=true;break;}var x=this.mContainers[s.getId()];if(x[0]&&x[0]!=w){E=true;break;}if(!x[0]&&x[1]&&x[1]!=w){E=true;break;}j++;}else{this._mainRFLayout.removeContent(w);}}if(E){this._mainRFLayout.removeAllContent();t=0;}}if(t<L){var S=0;if(t>0){S=t--;}for(i=S;i<L;i++){s=v[i];var y=s.getId();if(this.mContainers[y]){if(this.mContainers[y][0]){this._mainRFLayout.addContent(this.mContainers[y][0]);}else if(this.mContainers[y][1]){this._mainRFLayout.addContent(this.mContainers[y][1]);}}}}}}return b;});
