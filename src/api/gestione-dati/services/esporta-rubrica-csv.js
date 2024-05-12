const fs = require('fs');
const opzioni = {
    mode: 0o600,
  }
const NOME_ESPORTAZIONE = "public/rubrica.csv"
const SEPARATORE = ","
const FINE_LINEA = "\n"
const INTESTAZIONE_CENTRALINO_YEASTAR = "First Name,Last Name,Company Name,Email,Business Number,Business Number 2,Business Fax,Mobile,Mobile 2,Home,Home 2,Home Fax,Other,ZIP Code,Street,City,State,Country,Remark"
const COLONNE = INTESTAZIONE_CENTRALINO_YEASTAR.split(SEPARATORE)
const NUM_COLONNE = COLONNE.length
const ID_NOME = 0
const ID_AZIENDA = 2
const ID_NUMERO_TELEFONO = 4 // Busines number
const ID_MOBILE = 7 // mobile
const MAX_LUNGHEZZA_NOMI = 30

function aggiustaNomi(nome){
    if (nome)
        return nome.substring(0, MAX_LUNGHEZZA_NOMI)
    else
        return ""
}
// TODO aggiungere anche gli altri contatti
function aziendaToString(azienda) {
    let contatto = new Array(NUM_COLONNE)
    contatto[ID_NOME] = aggiustaNomi(azienda.denominazione)
    // contatto[ID_AZIENDA] = aggiustaNomi(azienda.denominazione)
    contatto[ID_NUMERO_TELEFONO] = aggiustaNomi(azienda.indirizzoFatturazione.contatto.telefono)
    contatto[ID_MOBILE] = aggiustaNomi(azienda.indirizzoFatturazione.contatto.cellulare)
    if(contatto[ID_NUMERO_TELEFONO].length > 0 || contatto[ID_MOBILE].length > 0)
        return contatto.join(SEPARATORE)
    else
        return ""
}

module.exports = {
    async esportaRubricaCsv(...args) {
        const ricerca = await strapi.entityService.findMany("api::utente.utente",{populate:[
            "contatti","indirizzoFatturazione.contatto","indirizziSpedizione.contatto"
          ]});
        console.log("contatti: "+ricerca.length)
        console.log("num colonne "+NUM_COLONNE)
        let testo = INTESTAZIONE_CENTRALINO_YEASTAR+FINE_LINEA
        let azienda = ""
        for(let i=0; i<ricerca.length; i++){
            azienda = aziendaToString(ricerca[i])
            if(azienda.length > 0){
                testo += azienda
                if(!(i == ricerca.length-1))
                testo += FINE_LINEA
            }
        }

        fs.writeFile(NOME_ESPORTAZIONE, testo,  opzioni, (errore) => {
            if ( errore ) {
                console.error(errore)
            } else
                console.log('Funzione writeFile() eseguita correttamente!');
          })
        return "Esportata la rubrica: "+ricerca.length+" aziende"
    }
}