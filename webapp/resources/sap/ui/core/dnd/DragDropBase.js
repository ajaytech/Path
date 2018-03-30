/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../Element",'../library','./DragAndDrop'],function(E,l){"use strict";var D=E.extend("sap.ui.core.dnd.DragDropBase",{metadata:{"abstract":true,library:"sap.ui.core"}});D.prototype.isDraggable=function(c){return false;};D.prototype.isDroppable=function(c){return false;};return D;},true);
