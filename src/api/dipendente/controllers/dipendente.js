'use strict';

/**
 * dipendente controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::dipendente.dipendente',
    ({strapi})=>({
        async find(ctx){
            let res = await strapi.service('api::dipendente.dipendente').isDipendente(2)
            console.log(res)
        }
    })
);
