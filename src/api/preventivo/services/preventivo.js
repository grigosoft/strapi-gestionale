'use strict';

/**
 * preventivo service
 */

const { createCoreService } = require('@strapi/strapi').factories;
const {formattaIndirizzoFatturazione, formattaIndirizzoSpedizione} = require('../../../utils/formattazione');

module.exports = createCoreService('api::preventivo.preventivo',
    // @ts-ignore
    ({strapi})=>({
        async inizializza(utente) {
            // applico anno e sequenza
            // console.log(utente);
            let response = {};
            const data = new Date();
            const anno = data.getFullYear();
            let resultUtente = await strapi.service('api::utente.utente')
                .find({filters:{id:utente},populate:["metodoPagamento","metodoPagamento.scadenze","indirizzoFatturazione","indirizzoSpedizione"]});
            // console.log(resultUtente);
            resultUtente = resultUtente.results;
            console.log(resultUtente);
            // console.log(resultUtente.length);
            if(resultUtente && resultUtente.length == 1){
                resultUtente = resultUtente[0];
                response["utente"] = resultUtente.id;
                response["banca"] = resultUtente.id;
                response["indirizzoFatturazione"] = formattaIndirizzoFatturazione(resultUtente);
                let indirizzo = resultUtente.indirizzoSpedizione;
                if(indirizzo && indirizzo.length>0){
                    indirizzo = indirizzo[0]; // FIXME inserire indirizzo spedizione preferito
                    response["indirizzoSpedizione"] = formattaIndirizzoSpedizione(indirizzo);
                }
                if(resultUtente.metodoPagamento){
                    response["metodoPagamento"] = resultUtente.metodoPagamento.id;
                    response["scadenze"] = resultUtente.metodoPagamento.scadenze;
                }
            }
            response["data"] = data.toISOString().substring(0,10);
            response["anno"] = anno;
            response["numero"] = await strapi
                .service('api::sequenza-numerica.sequenza-numerica')
                .anteprima("preventivi", anno);
            // console.log(response);
            let strutturaCorretta = {}
            strutturaCorretta["data"] = {}
            strutturaCorretta["data"]["dati"] = response
            return strutturaCorretta;
        },
        async create(params) {
            // applico anno e sequenza
            // TODO ancora da implementare, applicare solo se non compilato, prendre dalla data, ecc
            // console.log(params);
            
            // let permissions = await strapi.entityService.findMany("plugin::users-permissions.permission",{populate:"*"});
            // console.log(permissions)
            // let roles = await strapi.entityService.findMany("plugin::users-permissions.role",{populate:"*"});
            // console.log(roles)

            params.numero = await strapi
            .service('api::sequenza-numerica.sequenza-numerica')
            .preleva("preventivi",params.anno)
            .sequenza;
        
            const response = await super.create(params);
            return response;
        },
        async get_files(id)
        {
            const preventivo = await strapi.service("api::preventivo.preventivo").findOne(id, {populate: '*'});
            const files = [];

            
            for (let i = 0; i < preventivo.linee.length; i++) {
                const id = preventivo.linee[i].id;
                let prev_linee = await strapi.entityService.findOne("api::preventivo-linea.preventivo-linea", id, {populate: ["personalizzazione.files"]})

                if(prev_linee.personalizzazione != null )
                {
                    if(prev_linee.personalizzazione.files.length != 0)
                        files.push(prev_linee.personalizzazione.files);
                
                    // @ts-ignore
                    if(prev_linee.personalizzazione.soggetti != null && prev_linee.personalizzazione.soggetti.files.length != 0)
                        files.push(prev_linee.personalizzazione.files);
                }
            }
            
            return files.flat();
        }
    }));
