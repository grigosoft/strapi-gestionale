'use strict';

/**
 * utente controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { rename } = require('fs/promises');

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
            // @ts-ignore
            let richiesta = ctx.request.body.data;


            if(typeof richiesta === "string"){
                console.log("json da convertire")
                richiesta = JSON.parse(richiesta)
            }
            // @ts-ignore
            let nome =ctx.request.body.data.denominazione;

            let nomec = await strapi.service('api::file-stampa.file-stampa').nome_cartella(nome)
            richiesta["nomeCartella"] = nomec;

            
            ctx.request.body.data = richiesta;
            


            return await super.create(ctx);
        
        },
        async update(ctx) {
            let nome =ctx.request.body.data.denominazione;
            let nomec = await strapi.service('api::file-stampa.file-stampa').nome_cartella(nome)

            let nome_backup = ctx.request.body.data.denominazione;

            ctx.request.body.data["nomeCartella"] = nomec;
            
            if(ctx.state.user != null )
                {
                    let id = 3;
                    if(await strapi.service('api::dipendente.dipendente').isRappresentante(ctx.state.user.id))
                        {
                            let clienti = await strapi.service('api::dipendente.dipendente').getClientiRap(ctx.state.user.id);
                            
                            if(!clienti.find(cliente => cliente.id === id)){
                                return ctx.badRequest("richiesto un cliente non associato al rappresentante richiedente");
                            }
                        }
            }
            
            //let response =  await super.update(ctx);
            
            // rename delle cartelle
            change_path(ctx.params.id, ctx.request.body.data.denominazione);


            // @ts-ignore
            let files = await strapi.service("api::preventivo.preventivo").get_files(ctx.state.user.id);


            //return response;
        },
    })

);

async function change_path(id, nome)
{
    let response = await strapi.service("api::preventivo.preventivo").find({filters: {utente: id} }, {populate: "*"});
    console.log(response);
    let preventivi = response.results;
    
    
    for(let i = 0; i < preventivi.length; i++)
    {
        let preventivo = await strapi.service("api::preventivo.preventivo").findOne(preventivi[i].id, {populate: "*"});
        console.log(preventivo);
        let lista_file = await strapi.service("api::preventivo.preventivo").get_files(preventivo.id);
        console.log(lista_file);
        let old_path = await strapi.service("api::file-stampa.file-stampa").toPathPreventivo(nome, preventivo.dati.anno, preventivo.id);
        console.log(old_path);
        let new_path = await strapi.service("api::file-stampa.file-stampa").toPathPreventivo(preventivo.utente.denominazione, preventivo.dati.anno, preventivo.id);
        console.log(new_path);

        await rename(old_path, new_path);
    }

}