'use strict';

/**
 * preventivo service
 */

const { createCoreService } = require('@strapi/strapi').factories;
// const {fomattaIndirizzoFatturazione} = require('..../utils/formattazione');

function formattaIndirizzoFatturazione(utente) {
    let indirizzo = utente.indirizzoFatturazione;
    if(indirizzo)
        return `${utente.denominazione}\n${indirizzo.via}\n${indirizzo.cap} ${indirizzo.citta} (${indirizzo.provincia})\n${indirizzo.stato}\np.iva: ${utente.partitaIva}\ncf: ${utente.codiceFiscale}`
    else
        return `${utente.denominazione}\n\nCompleta i dati di Fatturazione`
}
function formattaIndirizzoSpedizione(indirizzo) {
    `${indirizzo.denominazione}\n${indirizzo.via}\n${indirizzo.cap} ${indirizzo.citta} (${indirizzo.provincia})\n${indirizzo.stato}`
}
module.exports = createCoreService('api::preventivo.preventivo',
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
            response["data"] = data.getDate();
            response["anno"] = anno;
            response["numero"] = await strapi
                .service('api::sequenza-numerica.sequenza-numerica')
                .anteprima("preventivi", anno);
            // console.log(response);
            return response;
        },
        async create(params) {
            // applico anno e sequenza
            // TODO ancora da implementare, applicare solo se non compilato, prendre dalla data, ecc
            console.log(params);

            params.numero = await strapi
            .service('api::sequenza-numerica.sequenza-numerica')
            .preleva("preventivi",params.anno)
            .sequenza;
        
            const response = await super.create(params);
            return response;
        },
        
    }));
