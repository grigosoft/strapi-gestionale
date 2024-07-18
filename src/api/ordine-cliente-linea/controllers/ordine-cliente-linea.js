'use strict';


/**
 * ordine-cliente-linea controller
*/

const { createCoreController } = require('@strapi/strapi').factories;
const { inserisci_auth_utente_in_params } = require('../../../utils/parametri');

module.exports = createCoreController('api::ordine-cliente-linea.ordine-cliente-linea',
    ({strapi})=>({
        /**
         * 
         * 
         * @param {*} ctx 
         * @returns 
         */
        async create(ctx) {
            // @ts-ignore
            const data = ctx.request.body.data;
            //console.log(data);
            
            let response = await super.create(ctx);
            console.log(response)
            let id_ordine = data.ordine

            let files_personalizzazione = data.personalizzazione.files;
            
            let soggetti = data.personalizzazione.soggetti;
            
            let file_soggetti = soggetti.map(soggetto => soggetto.files).flat();

            //array da scorrere
            let lista_file;
            
            if(files_personalizzazione != null && file_soggetti != null)
            {
                lista_file = files_personalizzazione.concat(file_soggetti);
            
            }else if(files_personalizzazione != null)
            {
                lista_file = files_personalizzazione;
            }else if (file_soggetti != null)
                {
                lista_file = file_soggetti;
                }else{
                lista_file = [];
                }
                

            try {
                console.log(lista_file.length)
                for(let i = 0; i < lista_file.length; i++){
                    // Ensure each file is processed in order
                    //TODO: controlla se è linkato ad un preventivo, in modo da chiamare l'altra funzione
                    await strapi.service('api::file-stampa.file-stampa').spostaInArchivioOrdine(lista_file[i], id_ordine);
                }
            } catch (error) {
                console.error("Error processing files: ", error);
            }
    
            let json_input  = {'data': { 'ordineClienteLinea': response.data.id, 'statoSettore': 3, 'settoreCorrente': 2 }};
            
            inserisci_auth_utente_in_params(ctx, json_input.data);
            console.log("ctx:")
            console.log(ctx.state.auth)
            console.log("\n\n\n")
            
            //token: ctx.state.auth
            //  id settore corrente, id stato settore + ctx.state.user.id + controllo  
            console.log(json_input);

            let lavorazione = await strapi.service("api::lavorazione.lavorazione").create(json_input);

            console.log(lavorazione)

            return response;
        }
    
    })
);
