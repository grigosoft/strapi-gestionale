'use strict';

/**
 * preventivo-linea controller
 */
const { sanitize, validate } = require("@strapi/utils");

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::preventivo-linea.preventivo-linea',
({strapi})=>({
    /**
     * 
     * */
  async inizializza(ctx) {
    // @ts-ignore
    const params = ctx.request.params;
    console.log(params);
    
    // TODO controllo parametri
    /*
    devono essercene 2:
    preventivo ??
    prodotto
    */

    const result = await strapi
    .service('api::preventivo-linea.preventivo-linea')
    .inizializza(params.preventivo);
    
    return result;
  }
}));
