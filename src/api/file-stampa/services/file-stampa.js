'use strict';

/**
 * file-stampa service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::file-stampa.file-stampa', 
    ({strapi}) =>({


        //preventivo-strapi.service('api::utente.utente').find({filters:{id:utente}
        // controllo se l'utente non è null e copio altro -> guardare nel database se esiste quell'utente (ID)
        /**
         * 
         * @param {*} data 
         * @param {*} files 
         * @returns 
         */
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
        },
        /**
         * sposto dalla cartella temporanea: private/idUtente/
         * all'archivio: private/archivio/(1°lettera)/nomeCartella(dell'utente)/anno/P+numero
         * 
         * aggiorno a DB il path del file
         * 
         * @param {*} idFile 
         * @param {*} idPreventivo 
         */
        async spostaInArchivioPreventivo(idFile, idPreventivo){

        },
        /**
         * sposto dalla cartella temporanea: private/idUtente/
         * all'archivio: private/archivio/(1°lettera)/nomeCartella(dell'utente)/anno/numero
         * 
         * aggiorno a DB il path del file
         * 
         * @param {*} idFile 
         * @param {*} idOrdine 
         */
        async spostaInArchivioOrdine(idFile, idOrdine){

        }
        ,
        /**
         * rinomino la cartella con P davanti a solo numero: 
         * private/archivio/(1°lettera)/nomeCartella(dell'utente)/anno/numero
         * 
         * aggiornando a DB tutti i path dei file collegati
         * 
         * @param {*} idPreventivo 
         * @param {*} idOrdine 
         */
        async spostaDaPreventivoAOrdine(idPreventivo, idOrdine){

        }

        //


    })
);



