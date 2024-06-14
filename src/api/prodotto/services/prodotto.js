'use strict';

// const { SVG, registerWindow } = require('@svgdotjs/svg.js');
// const { createSVGWindow } = require('svgdom');
// import { createSVGWindow } from 'svgdom'
// FIXME https://github.com/svgdotjs/svgdom/issues/121
// import Snap from 'snapsvg';
// const {} = require('snapsvg')
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

        var s = Snap("#svg")
        var bigCircle = s.circle(150, 150, 100);
        // By default its black, lets change its attributes
        bigCircle.attr({
            fill: "#bada55",
            stroke: "#000",
            strokeWidth: 5
        });
        // Now lets create another small circle:
        var smallCircle = s.circle(100, 150, 70);
        return s.svg

        // // returns a window with a document and an svg root node
        // const window = createSVGWindow()
        // const document = window.document

        // // register window and document
        // registerWindow(window, document)

        // // create canvas
        // const canvas = SVG(document.documentElement)

        // // use svg.js as normal
        // canvas.rect(100, 100).fill('yellow').move(50,50)

        // return canvas.svg();
    },
  
  }));
