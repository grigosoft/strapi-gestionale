'use strict';

/**
 * ordine-cliente-linea service
 */

const { createCoreService } = require('@strapi/strapi').factories;
const { get_all_files } = require('../../../utils/files');

module.exports = createCoreService('api::ordine-cliente-linea.ordine-cliente-linea',
    // @ts-ignore
    ({strapi})=>({
        /**
         * 
         * @param {*} params 
         */
        async inizializza(params) {
    
        },
        async delete(ctx) {
            return await get_all_files("api::preventivo.preventivo", 95);
            }
    })
);
