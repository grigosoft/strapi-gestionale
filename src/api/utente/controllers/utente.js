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
            return await super.find(ctx);
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
                }   
            }
            //richiamo la findOne di default se
            // a richiedere non è un utente ( autenticato tramite token)
            // a richiedere è un dipendente NON RAPPRESENTANTE
            return await super.findOne(ctx, id);
        },
        async create(ctx) {


            console.log(ctx.request.body.data)
            
            // @ts-ignore
            let richiesta = ctx.request.body.data;


            if(typeof richiesta === "string"){
                console.log("json da convertire")
                richiesta = JSON.parse(richiesta)
            }
            // @ts-ignore
            let nome =ctx.request.body.data.denominazione;

            console.log(nome)

            let nomec = await strapi.service('api::file-stampa.file-stampa').nome_cartella(nome)

            console.log(nomec)

            richiesta["nomeCartella"] = nomec;

            //richiesta = JSON.stringify(richiesta);

            
            ctx.request.body.data = richiesta;
            console.log(ctx.request.body)
            //console.log(ctx.request.body.data)
            
            return await super.create(ctx);
        
        },
        async update(ctx) {
            console.log(ctx)

            if(ctx.state.user != null )
            {
                let id = 3;
                if(await strapi.service('api::dipendente.dipendente').isRappresentante(ctx.state.user.id))
                {
                    let clienti = await strapi.service('api::dipendente.dipendente').getClientiRap(ctx.state.user.id);
                    
                    console.log(clienti);

                    if(!clienti.find(cliente => cliente.id === id)){
                        return ctx.badRequest("richiesto un cliente non associato al rappresentante richiedente");
                    }
                }
            }
            


            // @ts-ignore
            let files = await strapi.service("api::preventivo.preventivo").get_files(ctx.state.user.id);

            return await super.update(ctx);
        },
    })

);
