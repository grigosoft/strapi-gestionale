'use strict';

const { SVG, registerWindow } = require('@svgdotjs/svg.js');
// const { createSVGWindow } = require('svgdom');
// FIXME https://github.com/svgdotjs/svgdom/issues/121

/**
 * prodotto service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::prodotto.prodotto', ({ strapi }) =>  ({
    
    /**
     * crea un SVG rappresentante misure e finiture passate
     * @param {string} misura 
     * @param {string} finiture 
     * @returns sequenza selezionata
     */
    async anteprimaFiniture(misura, finiture) {

        // returns a window with a document and an svg root node
        const window = createSVGWindow()
        const document = window.document

        // register window and document
        registerWindow(window, document)

        // create canvas
        const canvas = SVG(document.documentElement)

        // use svg.js as normal
        canvas.rect(100, 100).fill('yellow').move(50,50)

        return canvas.svg();
    },
  
  }));
