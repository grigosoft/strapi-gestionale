'use strict';

/**
 * utente controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { rename, mkdir, cp } = require('fs/promises');

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

            let nome_backup = (await strapi.entityService.findOne("api::utente.utente", ctx.params.id)).denominazione;
            let nome_cartella_backup = (await strapi.entityService.findOne("api::utente.utente", ctx.params.id)).nomeCartella;

            let src_path = process.cwd() + "/private/archivio/"+ nome_backup.split("")[0].toUpperCase() + "/"+  nome_cartella_backup;
            let dest_path = process.cwd() + "/private/archivio/"+ nome.split("")[0].toUpperCase() + "/"+  nomec;

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
            
            let response =  await super.update(ctx);

            await Change_path(src_path, dest_path);
            
            // rename delle cartelle


            // @ts-ignore
            let files = await strapi.service("api::preventivo.preventivo").get_files(ctx.state.user.id);


            return response;
        },
    })

);

/*
async function change_path(id, nome)
{
    // trovare tutti i preventivi associati all'utente
    // @ts-ignore
    let response = await strapi.entityService.findMany("api::preventivo.preventivo",{filters: {utente: id}, populate: ["personalizzazione", "personalizzazione.files", "lavorazione", "personalizzazione.soggetti", "personalizzazione.soggetti.files"]});
    let utente = await strapi.entityService.findOne("api::utente.utente", id);
    console.log(response);
    let preventivi = response.results;
    console.log("preventivi:")
    console.log(preventivi);
    
    
    for(let i = 0; i < preventivi.length; i++)
    {
        let preventivo = await strapi.service("api::preventivo.preventivo").findOne(preventivi[i].id, {populate: "*"});
        console.log(preventivo);
        let lista_file = await strapi.service("api::preventivo.preventivo").get_files(preventivo.id);
        console.log(lista_file);
        let old_path = await strapi.service("api::file-stampa.file-stampa").toPathPreventivo(nome, preventivo.dati.anno, preventivo.id);
        console.log(old_path);
        let new_path = await strapi.service("api::file-stampa.file-stampa").toPathPreventivo(utente.denominazione, preventivo.dati.anno, preventivo.id);
        console.log(new_path);

        try{
            await mkdir(new_path, {recursive: true});
        }catch(e)
        {
            console.log(e);
        }


        try {
            await rename(old_path, new_path);
        } catch (error) {
            if(error.code === 'ENOENT')
            {
                console.log("cartella non trovata");
            }
            else if(error.code === 'EACCES')
            {
                await cp(old_path, new_path, {recursive: true});
            }
        }
    }

}*/

async function Change_path(path_s, path_d)
{
    try {
        await mkdir(path_d, { recursive: true });
        await rename(path_s, path_d);
    } catch (err) {
        console.error(`Rename failed: ${err}`);
    }
}