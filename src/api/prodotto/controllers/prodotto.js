'use strict';

/**
 * prodotto controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::prodotto.prodotto',
({ strapi }) => ({
  /**
     * 
     * */
  async anteprimaFiniture(ctx) {
    // @ts-ignore
    const body = ctx.request.body;
    console.log(body);
    const misura = body["misura"]
    const finiture = body["finitura"]
    
    const svg = await strapi
    .service('api::prodotto.prodotto')
    .anteprimaFiniture(misura, finiture);
    
    return svg;
  }
})
);