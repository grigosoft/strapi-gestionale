'use strict';

/**
 * utente controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::utente.utente', 
    // @ts-ignore
    ({strapi}) => ({
        //ctx.badRequest('This is my custom error message');
        async find(ctx) {
            
            if(ctx.state.user != null)
            {
                if(await strapi.service('api::dipendente.dipendente').isRappresentante(ctx.state.user.id))
                {
                    let clienti = await strapi.service('api::dipendente.dipendente').getClientiRap(ctx.state.user.id);
                    return clienti;
                }
            }
            return await super.find();
        },
        async findOne(ctx, id) {
            if(ctx.state.user != null)
            {
                if(await strapi.service('api::dipendente.dipendente').isRappresentante(ctx.state.user.id))
                {
                    let clienti = await strapi.service('api::dipendente.dipendente').getClientiRap(ctx.state.user.id);
                    
                    console.log(clienti);

                    if(!clienti.find(cliente => cliente.id === id)){
                        return ctx.badRequest("richiesto un cliente non associato al rappresentante richiedente");
                    }
                return await super.findOne(ctx, id);
                }   
            }
        }
    })

);
