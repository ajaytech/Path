/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global"],function($){"use strict";var l=[];var L={onLogEntry:function(o){if(o.component.match(/^sap.ui.test.autowaiter.*#hasPending$/)){l.push(o.message);}}};return{start:function(){$.sap.log.addLogListener(L);},getAndClearLog:function(){var s=l.join("\n");l.length=0;return s;},stop:function(){l.length=0;$.sap.log.removeLogListener(L);}};},true);
