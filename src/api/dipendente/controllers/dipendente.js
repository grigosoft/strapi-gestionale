'use strict';

/**
 * dipendente controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::dipendente.dipendente',
    ({strapi}) => ({

        
        /*
            Metodo che devo implementare per trovare la tabella dei clienti??
        
        */
        async find(ctx)
        {
            // @ts-ignore
            let dipendente = await strapi.service('api::dipendente.dipendente').getDipendente(1);
            return dipendente;
        }

    })
);