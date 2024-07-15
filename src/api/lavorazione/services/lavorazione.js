'use strict';

const { context } = require('esbuild');

/**
 * lavorazione service
 */

const { createCoreService } = require('@strapi/strapi').factories;
const { inserisci_auth_utente_in_params } = require('../../../utils/parametri');

module.exports = createCoreService('api::lavorazione.lavorazione',
    // @ts-ignore
    ({strapi}) =>({

        async create(data){
            console.log(data)
            // @ts-ignore
            let avanzamento = await strapi.service('api::lavorazione.lavorazione').create_avanzamento(data);


            data.data["avanzamento"] = [avanzamento];


            // @ts-ignore
            // let lavorazione = await strapi.entityService.create("api::lavorazione.lavorazione", {data: { "preventivoLinea": id_preventivo.id, "statoSettore": stato.nome, "settoreCorrente": settore.nome, "avanzamento": avanzamento }});

            return super.create(data);
        },
        async update(data)
        {
            console.log(data);

            let id_preventivo = data.data.preventivoLinea;
            let stato = data.data.stato;
            let settore = data.data.settore;

            let new_avanzamento = await strapi.service("api::lavorazione.lavorazione").create_avanzamento(data);

        },
        async create_avanzamento(data){

            let id_preventivo = data.data.preventivoLinea;
            let stato = data.data.statoSettore
            let settore = data.data.settoreCorrente

            stato = await strapi.entityService.findOne("api::stato-settore.stato-settore", stato, {populate: ["settore"],});
            console.log("Stato:")
            console.log(stato);

            settore = stato.settore
            console.log("Settore:")
            console.log(settore);

            let dipendente = "sconosciuto"

            if(data.data.dipendente != null)
            {
                let dati_d = (await strapi.entityService.findOne("api::dipendente.dipendente", data.data.dipendente));
                dipendente = dati_d.nome + " " + dati_d.cognome;
            }else if(data.data.token != null){
                dipendente =  "token: "+ data.data.token;
            }
            
            let avanzamento = { "PreventivoLinea": id_preventivo, "statoSettore": stato.nome, "settoreCorrente": settore.nome, "Dipendente": dipendente, "Data": new Date() }

            console.log("Avanzamento:")
            console.log(avanzamento);
            return avanzamento;
        }
    })
);
