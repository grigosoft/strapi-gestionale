'use strict';

const { context } = require('esbuild');

/**
 * lavorazione service
 */

const { createCoreService } = require('@strapi/strapi').factories;
const { inserisci_auth_utente_in_params } = require('../../../utils/parametri');
const statoSettore = require('../../stato-settore/controllers/stato-settore');

module.exports = createCoreService('api::lavorazione.lavorazione',
    // @ts-ignore
    ({strapi}) =>({

        async create(data){
            console.log(data)
            // @ts-ignore

            let avanzamento = await strapi.service('api::lavorazione.lavorazione').create_avanzamento(data);


            data.data["avanzamento"] = [avanzamento];
            console.log(data)


            // @ts-ignore
            // let lavorazione = await strapi.entityService.create("api::lavorazione.lavorazione", {data: { "preventivoLinea": id_preventivo.id, "statoSettore": stato.nome, "settoreCorrente": settore.nome, "avanzamento": avanzamento }});

            return super.create(data);
        },
        async update(id, data)
        {
            let lavorazione = await strapi.entityService.findOne("api::lavorazione.lavorazione", id);
            let new_avanzamento = await strapi.service("api::lavorazione.lavorazione").create_avanzamento(data);
                // @ts-ignore
                lavorazione.avanzamento.unshift(new_avanzamento);

            console.log(lavorazione.avanzamento)
            data.data["avanzamento"] = lavorazione.avanzamento;
            return super.update(id, data);
        },
        async create_avanzamento(data){
            let dati = data.data;
            let json = {"data": new Date()}; ;
            console.log(Object.keys(dati).length)
            for(let i = 0; i < Object.keys(dati).length; i++)
            {
                let temp;
                
                
                switch(Object.keys(dati)[i])
                {
                    case "statoSettore":
                        json["statoSettore"] = (await strapi.entityService.findOne("api::stato-settore.stato-settore", dati[Object.keys(dati)[i]] )).nome;
                        break;
                    
                    case "settoreCorrente":
                        json["settoreCorrente"] = (await strapi.entityService.findOne("api::settore.settore", dati[Object.keys(dati)[i]] )).nome;
                        break;
                    case "dipendente":
                        let dipendente = "sconosciuto"

                        if(data.data.dipendente != null)
                        {
                            let dati_d = (await strapi.entityService.findOne("api::dipendente.dipendente", data.data.dipendente));
                            dipendente = dati_d.nome + " " + dati_d.cognome;
                        }else if(data.data.token != null){
                            dipendente =  "token: "+ data.data.token;
                        }

                        json["dipendente"] = dipendente;
                        break;
                
                    default:
                        json[Object.keys(dati)[i]] = dati[Object.keys(dati)[i]];
                        break;
                }
                

                console.log(json);

            }
            return json;
        }
    })
);
