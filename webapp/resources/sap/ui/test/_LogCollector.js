/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","jquery.sap.global","sap/ui/test/_OpaLogger"],function(U,$,_){"use strict";var s;var m="sap.ui.test._LogCollector";var a=_.getLogger(m);var b=U.extend(m,{constructor:function(){this._aLogs=[];this._oListener={onLogEntry:function(l){if(!$.sap.startsWith(l.component,"sap.ui.test")){return;}var L=l.message+" - "+l.details+" "+l.component;this._aLogs.push(L);if(this._aLogs.length>500){this._aLogs.length=0;a.error("Opa has received 500 logs without a consumer - "+"maybe you loaded Opa.js inside of an IFrame? "+"The logs are now cleared to prevent memory leaking");}}.bind(this)};$.sap.log.addLogListener(this._oListener);},getAndClearLog:function(){var j=this._aLogs.join("\n");this._aLogs.length=0;return j;},destroy:function(){this._aLogs.length=0;$.sap.log.removeLogListener(this._oListener);}});b.getInstance=function(){if(!s){s=new b();}return s;};return b;},true);
