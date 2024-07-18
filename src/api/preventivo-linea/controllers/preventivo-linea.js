'use strict';

/**
 * preventivo-linea controller
 */
const { sanitize, validate } = require("@strapi/utils");

const { createCoreController } = require('@strapi/strapi').factories;
const {inserisci_auth_utente_in_params } = require('../../../utils/parametri');

module.exports = createCoreController('api::preventivo-linea.preventivo-linea',
({strapi})=>({
    /**
     * 
     * */
  async inizializza(ctx) {
    // @ts-ignore
    const params = ctx.request.params;
    console.log(params);
    
    // TODO controllo parametri
    /*
    devono essercene 2:
    preventivo ??
    prodotto
    */

    const result = await strapi
    .service('api::preventivo-linea.preventivo-linea')
    .inizializza(params.preventivo);
    
    return result;
  },
    
  async create(ctx) {

    // @ts-ignore
    const data = ctx.request.body.data;
    //console.log(data);
    
    let response = await super.create(ctx);
    let id_preventivo = data.preventivo

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
      for(let i = 0; i < lista_file.length; i++) {
        console.log(lista_file[i])
        // Ensure each file is processed in order
        await strapi.service('api::file-stampa.file-stampa').spostaInArchivioPreventivo(lista_file[i], id_preventivo);
        console.log("OK => " + i)
      }
    } catch (error) {
      console.error("Error processing files: ", error);
      // Handle the error appropriately
      // Maybe rollback the operation or log the error for further investigation
    }
    //strapi.service('api::file-stampa.file-stampa').spostaInArchivioOrdine(25, 2);
    //strapi.service('api::file-stampa.file-stampa').spostaDaPreventivoAOrdine(7, 4);
    let json_input  = {'data': { 'preventivoLinea': response.data.id, 'statoSettore': 1, 'settoreCorrente': 1 }};
    
    inserisci_auth_utente_in_params(ctx, json_input.data);

    
    //token: ctx.state.auth
    //  id settore corrente, id stato settore + ctx.state.user.id + controllo  
    console.log(json_input);

    let lavorazione = await strapi.service("api::lavorazione.lavorazione").create(json_input);

    console.log(lavorazione)


    return response;
  }
  
}));
