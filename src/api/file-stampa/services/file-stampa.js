'use strict';

/**
 * file-stampa service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::file-stampa.file-stampa', 
    ({strapi}) =>({


        //preventivo-strapi.service('api::utente.utente').find({filters:{id:utente}
        // controllo se l'utente non è null e copio altro -> guardare nel database se esiste quell'utente (ID)
        async check_create(data, files)
        {
            if(!data){
                // errore generico
                return "assicurarsi di passare i parametri correttamente";
            }

            let props = Object.keys(files)

            // assicurarsi che sia un file solo
            if( props && props.length!=1){
                // errore, 
                return "assicurarsi di caricare 1 file"
            }
        
            console.log("INIZIO DELLA FUNZIONE");
            console.log(data);
            if(!("utente" in data)){
                // errore dell'id utente 
                return "assicurarsi di assegnare un utente";
                }
            else
            {
                let id = data.utente;
                let resultUtente = await strapi.service('api::utente.utente').find({filters:{"ID":id}});
                //diviso in due istruzioni per colpa dell' await(?)
                resultUtente = resultUtente.results;

                console.log(resultUtente);

                if(resultUtente && resultUtente.length == 1){
                    //console.log(resultUtente);
                    return null;
                }
                else
                {
                    return "l'utente non esiste";
                }
            }
        }

        

        //


    })
);



