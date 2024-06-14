module.exports = {
    fomattaIndirizzoFatturazione(utente) {
        let indirizzo = utente.indirizzoFatturazione;
        if(indirizzo)
            return `${utente.denominazione}\n${indirizzo.via}\n${indirizzo.cap} ${indirizzo.citta} (${indirizzo.provincia})\n${indirizzo.stato}\np.iva: ${utente.partitaIva}\ncf: ${utente.codiceFiscale}`
        else
            return `${utente.denominazione}\n\nCompleta i dati di Fatturazione`
    },
    fomattaIndirizzoSpedizione(indirizzo) {
        `${indirizzo.denominazione}\n${indirizzo.via}\n${indirizzo.cap} ${indirizzo.citta} (${indirizzo.provincia})\n${indirizzo.stato}`
    }
};