/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./ListItemBaseRenderer','sap/ui/core/Renderer','sap/ui/core/library'],function(L,R,c){"use strict";var T=c.TextDirection;var I=R.extend(L);I.renderLIAttributes=function(r,l){r.addClass("sapMILI");};I.renderLIContent=function(r,l){var s=l.getLabel();if(s){var a=l.getId()+"-label",b=l.getLabelTextDirection();r.write('<span id="'+a+'" class="sapMILILabel"');if(b!==T.Inherit){r.writeAttribute("dir",b.toLowerCase());}r.write('>');r.writeEscaped(s);r.write('</span>');}r.write('<div class="sapMILIDiv sapMILI-CTX">');l.getContent().forEach(function(C){if(a&&C.addAriaLabelledBy&&C.getAriaLabelledBy().indexOf(a)==-1){C.addAssociation("ariaLabelledBy",a,true);}r.renderControl(C);});r.write('</div>');};return I;},true);
