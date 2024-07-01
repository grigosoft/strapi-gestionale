'use strict';

/**
 * dipendente service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dipendente.dipendente',
({strapi})=>({
    /**
     * 
     * @param {*} userId id dell'user da controllare se è un dipendente
     */
    async getDipendente(userId) {
        let resultUtente = await strapi.service('api::user.user')
                .findOne(userId,{populate:["dipendente"]});
        console.log(resultUtente)
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
    
}));
