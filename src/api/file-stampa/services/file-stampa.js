'use strict';

/**
 * file-stampa service
 */

const { createCoreService } = require('@strapi/strapi').factories;
const { mkdir,copyFile, unlink, readdir , cp} = require('fs/promises');

const {cpSync} = require('fs');

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
        
            // console.log("INIZIO DELLA FUNZIONE");
            // console.log(data);
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

                // console.log(resultUtente);

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
         * sposto dalla cartella temporanea: private/upload/idUtente/
         * all'archivio: private/archivio/(1°lettera)/nomeCartella(dell'utente)/anno/P+numero
         * 
         * aggiorno a DB il path del file
         * 
         * @param {*} idFile // id del file da spostare
         * @param {*} idPreventivo //
         */
        async spostaInArchivioPreventivo(idFile, idPreventivo){
        // vado nella cartella temporanea
        let resultUtente = await strapi.service('api::file-stampa.file-stampa').findOne(idFile);
        let src = resultUtente.path;

        // console.log(src);
            
        // controllo se esiste il file
        if(!resultUtente)
            return "il file non esiste";
        else{
            // controllo se è già stato spostato
            if(resultUtente.archiviato == 0){
                // console.log("il file deve essere spostato")
                // sposto il file

                await cpSync(src, dest, {recursive: true});

                // aggiorno il path nel DB
            }
            else{
                // console.log("il file è già stato spostato")
            }
        }
        // sposto i files
        // aggiorno il path nel DB
            

        },
        
        
        
        
        
        
        /**
         * sposto dalla cartella temporanea: private/upload/idUtente/
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



