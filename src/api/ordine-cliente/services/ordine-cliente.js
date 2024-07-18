'use strict';

/**
 * ordine-cliente service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ordine-cliente.ordine-cliente',
({strapi})=>({
    /**
     * 
     * @param {*} params 
     */
    async inizializza(params) {

    }
})
);
