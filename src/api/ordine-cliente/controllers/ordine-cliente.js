'use strict';

/**
 * ordine-cliente controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ordine-cliente.ordine-cliente',
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
            .service('api::ordine-cliente.ordine-cliente')
            .inizializza(params.utente);
        }, 

        async create(ctx) {
            // @ts-ignore
            const data = ctx.request.body;
            console.log(data);
            
            let response = await super.create(ctx);
    
            // chiamo il servizio per spostare il file
            strapi.service('api::file-stampa.file-stampa').spostaInArchivioOrdine(27, 3);
    
            return response;
        }
    }),
    
);

