/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/uxap/library"],function(l){"use strict";return{name:{singular:function(){return l.i18nModel.getResourceBundle().getText("LAYOUT_CONTROL_NAME");},plural:function(){return l.i18nModel.getResourceBundle().getText("LAYOUT_CONTROL__PLURAL");}},aggregations:{sections:{domRef:function(e){return e.$("sectionsContainer").get(0);},childNames:{singular:function(){return l.i18nModel.getResourceBundle().getText("SECTION_CONTROL_NAME");},plural:function(){return l.i18nModel.getResourceBundle().getText("SECTION_CONTROL_NAME_PLURAL");}},actions:{move:"moveControls"}},headerContent:{domRef:function(e){return e.$("headerContent").get(0);},actions:{move:function(e){if(!e||e.getMetadata().getName()!=='sap.uxap.ObjectPageSection'){return"moveControls";}}}}},scrollContainers:[{domRef:"> .sapUxAPObjectPageWrapper",aggregations:["sections","headerContent"]},{domRef:function(e){return e.$("vertSB-sb").get(0);}}],cloneDomRef:":sap-domref > header"};},false);
