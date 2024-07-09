'use strict';

/**
 * lavorazione service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::lavorazione.lavorazione',
    // @ts-ignore
    ({strapi}) =>({

        async create(data, ctx){
            console.log(data);

            let dipendente = "sconosciuto"

            if(ctx != null)
            {
                if(ctx.state.user == null){
                    dipendente=ctx.state.auth
                    console.log(dipendente)
                    dipendente = "Token: " + dipendente;
                }else {
                dipendente = ctx.state.user.id ;    
                // @ts-ignore
                dipendente = await strapi.entityService.findOne("api::dipendente.dipendente", dipendente);
                }

                console.log(dipendente);
            }
            let id_preventivo = data.data.preventivoLinea;
            let stato = data.data.stato;
            let settore = data.data.settore;


            console.log("ID Preventivo:" + id_preventivo);
            id_preventivo = await strapi.entityService.findOne("api::preventivo-linea.preventivo-linea", id_preventivo, {populate: ["preventivo", "lavorazione"],});
            console.log("Preventivo:")  
            console.log(id_preventivo);

            stato = await strapi.entityService.findOne("api::stato-settore.stato-settore", stato, {populate: ["settore"],});
            console.log("Stato:")
            console.log(stato);

            settore = await strapi.entityService.findOne("api::settore.settore" , settore);
            console.log("Settore:")
            console.log(settore);

            // @ts-ignore
            let avanzamento = [{ "PreventivoLinea": id_preventivo.id, "StatoSettore": stato.nome, "Settore": settore.nome, "Dipendente": dipendente.nome, "Data": new Date() }]
            console.log("Avanzamento:")
            console.log(avanzamento);

            // @ts-ignore
            //TODO: CHIEDE AD ANTONIO SE VA BENE CON DATA, o se devo mettere in base ai valori trovati sopra |=> in teoria va bene cosi però
            let lavorazione = await strapi.entityService.create("api::lavorazione.lavorazione", {data: { "preventivoLinea": id_preventivo.id, "statoSettore": data.data.stato, "settoreCorrente": data.data.settore, "avanzamento": avanzamento }});
        
            return lavorazione;
        }
    })
);
