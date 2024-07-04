'use strict';

/**
 * dipendente service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dipendente.dipendente',
    ({strapi})=>({
    /**
     * 
     */
    async getDipendente(userId) {
        // @ts-ignore 
        let resultUtente = await strapi.entityService.findOne('plugin::users-permissions.user', userId, {populate: ["dipendente"],});
        if (resultUtente != null)
            return resultUtente.dipendente
        else 
            return null
    },
    /**
     * 
     * @param {*} userId id dell'user da controllare se è un dipendente
     */
    async isDipendente(userId) {
        let resultUtente = await this.getDipendente(userId);
        
        if (resultUtente != null)
            return true
        else
            return false
    },
    async isRappresentante(userId) {
        let resultUtente = await this.getDipendente(userId);
        if (resultUtente != null)
            return resultUtente.rappresentante
        else
            return false
    },


    //METODO DA CHIAMARE QUANDO SI SA GIA' CHE L'UTENTE E' UN RAPPRESENTANTE, ALTRIMENTI NON FUNZIONA COME DOVUTO
    async getClientiRap(userId)
    {
        let resultUtente = await strapi.entityService.findOne('plugin::users-permissions.user', userId, {populate: ["dipendente", "dipendente.clienti"],});
        
        // x errore importa const {ApplicationError} = error 
        // throw new ApplicationError("Errore")
        // @ts-ignore
        if(resultUtente.dipendente != null){
            // @ts-ignore
            return resultUtente.dipendente.clienti
        }else
            return null
    }
}));
