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
      // console.log(ctx.request);
      console.log(params);
      
      const result = await strapi
      .service('api::preventivo.preventivo')
      .inizializza(params.utente);
      return result;
    },
    
    async create(ctx) {
      // @ts-ignore
      const data = ctx.request.body;
      console.log(data);
      
      let response = await super.create(ctx);
      // spostamento del file ->

      //strapi.service('api::file-stampa.file-stampa').spostaInArchivioPreventivo(75, 11);
      //strapi.service('api::file-stampa.file-stampa').spostaInArchivioOrdine(25, 2);
      strapi.service('api::file-stampa.file-stampa').spostaDaPreventivoAOrdine(7, 4);
      
      return response;
    }
  })
);
