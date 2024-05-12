'use strict';

/**
 * preventivo controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

//module.exports = createCoreController('api::preventivo.preventivo');
module.exports = createCoreController("api::preventivo.preventivo",
({strapi})=>({
    /**
     * 
     * */
  async inizializza(ctx) {
    // @ts-ignore
    const params = ctx.request.params;
    console.log(params);
    
    const result = await strapi
    .service('api::preventivo.preventivo')
    .inizializza(params.utente);
    
    return result;
  }
}));