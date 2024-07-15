'use strict';

/**
 * lavorazione controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const {inserisci_auth_utente_in_params } = require('../../../utils/parametri');

module.exports = createCoreController('api::lavorazione.lavorazione',
    ({strapi})=>({
        async update(ctx)
        {
            inserisci_auth_utente_in_params(ctx);
            console.log(ctx);
            return super.update(ctx);
        }


    })
);
