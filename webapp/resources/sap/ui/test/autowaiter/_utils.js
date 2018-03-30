/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global"],function($){"use strict";function r(){var e=new Error();var s;if(e.stack){s=e.stack;}try{throw e;}catch(b){s=b.stack;}return s.replace(/^Error\s/,"");}function f(b){return b.toString().replace(/\"/g,'\'');}function a(A){try{return Array.prototype.map.call(A,b).join("; ");}catch(e){return"'"+A+"'";}function b(c){if($.isFunction(c)){return"'"+f(c)+"'";}if($.isArray(c)){var v=Array.prototype.map.call(c,b);return"["+v.join(", ")+"]";}if($.isPlainObject(c)){return JSON.stringify(c);}return"'"+c.toString()+"'";}}return{resolveStackTrace:r,functionToString:f,argumentsToString:a};},true);
