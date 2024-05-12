'use strict';

module.exports = {
    /**
     * cerca a DB se presente un record con campounivoco passato
     * 
     * NON ha gestione degli errori
     * 
     * @param {*} contentType es 'api::utente.utente'
     * @param {*} colonna colonna con vincolo univoco per effettuare la ricerca
     * @param {*} data 
     * @param {*} update se falso non aggiorna eventuali dati presenti a DB, crea nuovi soltanto
     * @param {*} forzaPrimo NON DOVREBBE SERVIRE se la ricerca dovesse trovare più risultati prende il primo 
     * @returns id dell'oggetto creato o aggiornato
     */
    async createOrUpdate(contentType, colonna, data, update = true, forzaPrimo = false){
        if(!(colonna in data))
            throw Error("il valore '"+colonna+"' deve essere fornito per il tipo "+contentType)
        const valore = data[colonna]
        let filters = {}
        let obj;
        filters[colonna] = { $eq: valore }
        // console.log(filters)
        const ricerca = await strapi.entityService.findMany(contentType,{filters:filters})
        let trovato = null
        // console.log("trovati: %d",ricerca.length)
        if(ricerca.length == 1 || (forzaPrimo && ricerca.length>0)) {
        trovato = ricerca[0]
        if(ricerca.length>1)
            console.warn("trovati più di un riscontro: %s", valore)
        }
        if(trovato) { // update
        // console.log(trovato)
        // console.log(data)
        // delete data[colonna] // non eseguo l'update della colonna di ricerca
        // console.log(data)
        if(update) {
            obj = await strapi.entityService.update(contentType, trovato.id, {data:data})
        }
        } else { // create
        obj = await strapi.entityService.create(contentType, {data:data})
        }
        return obj.id
    },
    // loggher(message){
    //     if(message instanceof Error){
    //         console.error(message.message)
    //         console.error(message.stack)
    //     } else if(message instanceof String) {
    //         console.log(message)
    //     }
    // }
}