'use strict';

/**
 * sequenza-numerica service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sequenza-numerica.sequenza-numerica', ({ strapi }) =>  ({
    /**
     * preleva il valore dalla sequenza e aumenta di uno il valore
     * SELEZIONE: la sequenza viene selezionata in base al nome e al riferiemnto (solitamente l'anno)
     * se non esiste la sequaneza ne crea una e parte da 1
     * 
     * @param {string} nome nome sequenza
     * @param {string} riferimento per esempio l'anno
     * @returns sequenza selezionata
     */
    async preleva(nome, riferimento, aggiornaDb=true) {
        const params = {"filters":{"nome":nome}};
        if (riferimento) {
            params["filters"]["riferimento"]=riferimento;
        }
        const results = await strapi.entityService.findMany('api::sequenza-numerica.sequenza-numerica', this.getFetchParams(params));
        // console.log("params:", params);
        // console.log("results:", results);
        let result;
        if(results && results.length==1){
            result = results[0];
            if (aggiornaDb) {
                // incremento il contatore a database
                let numero = result.sequenza + 1;
                await strapi.entityService.update('api::sequenza-numerica.sequenza-numerica', result.id, {
                    data: {
                    sequenza: numero,
                    },
                });
            }
            result = result.sequenza
        } else if(results && results.length==0){ // sequenza non presente, ne creo una nuova che parte da 1
            if (aggiornaDb) {
                await strapi.entityService.create('api::sequenza-numerica.sequenza-numerica', {
                    data: {
                    nome: nome,
                    sequenza: 2, 
                    riferimento: riferimento
                    },
                });
            }
            result = 1;
        } else // errore
            result = results

        
        return result;
    },
    /**
     * anteprima del valore dalla sequenza
     * SELEZIONE: la sequenza viene selezionata in base al nome e al riferiemnto (solitamente l'anno)
     * se non esiste la sequaneza ne ipotizza nuova una e parte da 1
     * 
     * @param {string} nome nome sequenza
     * @param {string} riferimento per esempio l'anno
     * @returns sequenza selezionata
     */
    async anteprima(nome, riferimento) {
        return this.preleva(nome, riferimento, false);
    },

  }));