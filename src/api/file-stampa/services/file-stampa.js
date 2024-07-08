'use strict';

/**
 * file-stampa service
 */

const { createCoreService } = require('@strapi/strapi').factories;
const { mkdir, rename} = require('fs/promises');
const { errors } = require('@strapi/utils');
const { ApplicationError } = errors;


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
                let resultUtente = await strapi.service('api::utente.utente').find({filters:{id}});
                //diviso in due istruzioni per colpa dell' await(?)
                resultUtente = resultUtente.results;

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
         * @param {*} idFile 
         * @param {*} idPreventivo 
         * 
         * 
         */
        async spostaInArchivioPreventivo(idFile, idPreventivo){
            // prendo il file
            let resultFile = await strapi.service('api::file-stampa.file-stampa').findOne(idFile, {"populate": { "utente": true}});
            
            console.log("File da spostare:");
            console.log(resultFile);
            
            // prendo il preventivo 
            console.log("idPreventivo: " + idPreventivo);
            let resultPreventivo = await strapi.service('api::preventivo.preventivo').findOne(idPreventivo, {"populate": { "dati": true}});
            
            // controllo se esiste il file
            if(!resultFile)
                throw new ApplicationError("il file non esiste");

            console.log("\n\nPreventivo da spostare:");
            console.log(resultPreventivo);

            let anno = resultPreventivo.dati.anno
            
            let src = resultFile.urlFileOriginale;

            /*

                console.log("File da spostare:");
                console.log(resultFile);
            
                console.log("\n\nPreventivo da spostare:");
                console.log(resultPreventivo);
            */

            let dest = "";
            let nome = resultFile.utente.denominazione;

            
            // controllo se è già stato spostato
            if(resultFile.archiviato == 0){
                console.log("il file deve essere spostato")
                // sposto il file
                console.log("Prima: " + src);
                dest = toPathPreventivo(nome, anno, resultPreventivo.id);
                //il path è: private/archivio/S/CLIENT/2024/P_11 , ma non mi crea la cartella, perché?
                console.log("Destinazione: " + dest);
                await mkdir(dest, {recursive:true});
                dest += "/" + src.split("/")[src.split("/").length - 1];
                console.log("Dopo: " + dest);
                // @ts-ignore
                await rename(src, dest, (err) => {
                    if (err) throw err;
                });
                // aggiorno il path nel DB
                // aggiorno il path nel DB e imposto la variabile archiviato a 1, perchè e stato archiviato
                strapi.service('api::file-stampa.file-stampa').update(idFile, {data:{"urlFileOriginale": dest, "archiviato": 1}});
                return null;
            }
            else{
                console.log('il file '+resultFile.urlFileOriginale+' è già archiviato')
                return null;
            }
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
            // prendo il file
            let resultFile = await strapi.service('api::file-stampa.file-stampa').findOne(idFile, {"populate": { "utente": true}});
            
            // prendo il preventivo 
            let resultOrdine = await strapi.service('api::ordine-cliente.ordine-cliente').findOne(idOrdine, {"populate": { "dati": true}});
            
            let anno = resultOrdine.dati.anno
            
            let src = resultFile.urlFileOriginale;

            /*

                console.log("File da spostare:");
                console.log(resultFile);
            
                console.log("\n\nPreventivo da spostare:");
                console.log(resultPreventivo);
            */

            let dest = "";
            let nome = resultFile.utente.denominazione;

            // controllo se esiste il file
            if(!resultFile)
                return "il file non esiste";
            else{
                // controllo se è già stato spostato
                if(resultFile.archiviato == 0){
                    console.log("il file deve essere spostato")
                    dest = toPathOrdine(nome, anno, resultOrdine.id);
                    console.log("Destinazione: " + dest);
                    await mkdir(dest, {recursive:true});
                    dest += "/" + src.split("/")[src.split("/").length - 1];
                    console.log("Dopo: " + dest);
                    // sposto il file
                    await rename(src, dest)

                    // aggiorno il path nel DB
                    // aggiorno il path nel DB e imposto la variabile archiviato a 1, perchè e stato archiviato
                    strapi.service('api::file-stampa.file-stampa').update(idFile, {data:{"urlFileOriginale": dest, "archiviato": 1}});
                    return null;
                }
                else{
                    return "il file è già stato spostato";
                }
            }

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
            // prendo il preventivo
            let resultPreventivo = await strapi.service('api::preventivo.preventivo').findOne(idPreventivo, {"populate": { "dati": true, "utente": true}});

            
            // prendo l'ordine
            let resultOrdine = await strapi.service('api::ordine-cliente.ordine-cliente').findOne(idOrdine, {"populate": { "dati": true, "utente": true}});
            
            console.log("Ordine: ");
            console.log(resultOrdine);

            let scr_preventivo = toPathPreventivo(resultPreventivo.utente.denominazione, resultPreventivo.dati.anno, resultPreventivo.id);
            let dest_ordine = toPathOrdine(resultOrdine.utente.denominazione, resultOrdine.dati.anno, resultOrdine.id);

            console.log("Preventivo: " + scr_preventivo); //Preventivo: /Users/benini/GIT/strapi-gestionale/private/archivio/S/SUPERCLIENTERIC/2024/P_75

            console.log("Ordine: " + dest_ordine);        //Ordine: /Users/benini/GIT/strapi-gestionale/private/archivio/S/SUPERCLIENTERIC/2024/3

            await rename(scr_preventivo, dest_ordine);
            
        }

        //


    })
);

// Metodo che restituisce il path in cui verrà salvato il file, dando come parametri il nome del cliente, l'anno e il numero del preventivo 
function toPathPreventivo(nome, anno, preventivo)
{
    let path = "private/archivio/";
    
    if(typeof(nome) == "string"){
        // ^ all'interno della parentesi quadra indica, insieme al resto, che voglio cercare tutto ciò che non è una lettera o un numero
        nome = nome.replace(/[^a-zA-Z0-9àèìòùÀÈÌÒÙ]/g, "");
        
        if(nome.length > 15)
        {
            nome = nome.substring(0, 15);
        }
    }
    else{
        return "il nome deve essere una stringa";
    }

    let lettera = nome.charAt(0).toUpperCase();

    path += lettera + "/" + nome + "/";

    if(typeof(anno) == "number"){
        anno = anno.toString();
    }
    else{
        return "l'anno deve essere un numero o una stringa";
    }

    path += anno + "/";

    if(typeof(preventivo) == "number" || typeof(preventivo) == "string"){
        preventivo = preventivo.toString();
    }
    else{
        return "l'ordine deve essere un numero o una stringa";
    }

    path += "P_" + preventivo ;
    
    path = process.cwd() + "/" +  path;

    return path;
}

// Metodo che restituisce il path in cui verrà salvato il file, dando come parametri il nome del cliente, l'anno e il numero dell'ordine
function toPathOrdine(nome, anno, ordine)
{
    let path = "private/archivio/";
    
    if(typeof(nome) == "string"){
        // ^ all'interno della parentesi quadra indica, insieme al resto, che voglio cercare tutto ciò che non è una lettera o un numero
        nome = nome.replace(/[^a-zA-Z0-9àèìòùÀÈÌÒÙ]/g, "");
        
        if(nome.length > 15)
        {
            nome = nome.substring(0, 15);
        }
    }
    else{
        return "il nome deve essere una stringa";
    }

    let lettera = nome.charAt(0).toUpperCase();

    path += lettera + "/" + nome + "/";

    if(typeof(anno) == "number"){
        anno = anno.toString();
    }
    else{
        return "l'anno deve essere un numero o una stringa";
    }

    path += anno + "/";

    if(typeof(ordine) == "number" || typeof(ordine) == "string"){
        ordine = ordine.toString();
    }
    else{
        return "l'ordine deve essere un numero o una stringa";
    }

    path += ordine ;
    
    path = process.cwd() + "/" +  path;

    return path;
}