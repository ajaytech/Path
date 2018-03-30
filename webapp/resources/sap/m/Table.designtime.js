/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/ChangeHandlerMediator"],function(C){"use strict";return{aggregations:{columns:{childNames:{singular:"COLUMN_NAME",plural:"COLUMN_NAME_PLURAL"},domRef:":sap-domref .sapMListTblHeader",actions:{move:"moveTableColumns",addODataProperty:function(t){var c=C.getAddODataFieldSettings(t);if(c){return{changeType:"addTableColumn",changeHandlerSettings:c};}}}}},name:{singular:"TABLE_NAME",plural:"TABLE_NAME_PLURAL"}};},false);
