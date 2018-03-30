/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global"],function($){"use strict";var l=[];var L=$.sap.log.Level.DEBUG;return{setLevel:function(n){var s=n&&n.toUpperCase();var N=s&&$.sap.log.Level[s];L=N||L;l.forEach(function(c){$.sap.log.setLevel(L,c);});},getLogger:function(c){l.push(c);return $.sap.log.getLogger(c,L);}};},true);
