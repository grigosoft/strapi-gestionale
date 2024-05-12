'use strict';
/**
 * gestione-dati service
 */

const {inizializza} = require('./inizializza');


async function controllaSeAnagraficaGiaPresente(utente){
  const filtroDenominazione = {
    denominazione: {
      $eq : utente["Nome"]
    }
  }
  let filtroOr = [filtroDenominazione]
  if (utente["PartitaIva"]){
    // @ts-ignore
    filtroOr.push({
      partitaIva: {
        $eq : utente["PartitaIva"]
      }
    })
  }
  if (utente["CodiceFiscale"]){
    // @ts-ignore
    filtroOr.push({
      codiceFiscale: {
        $eq : utente["CodiceFiscale"]
      }
    })
  }
  const ricerca = await strapi.entityService.findMany("api::utente.utente",{filters:{
    $or:filtroOr
  }});
  return ricerca;
}
function pulisciTelefono(numero){
  return numero ? numero.replace("/","").replace(".","").replace("-","") : null
}
function pulisciemail(email){
  // controlla email multiple (se c'è una virgola ci sono più email)
  return email ? email.replace(";",",").split(",")[0].trim() : null
}
function datiRichiestaAggiornaAnagrafica(utente, linkEsterni) {
  const nazione = utente["Nazione"] ? utente["Nazione"] : "Italia"
  const vettore = utente["VettoreDefault"]
  const porto = utente["PortoDefault"]
  const iva = utente["CodIvaDefault"] ? linkEsterni.ive[utente["CodIvaDefault"]] : linkEsterni.ive["22"]
  // console.log("|%s| -> %s", utente["CodIvaDefault"], iva)
  const listino = utente["Extra2"] ? linkEsterni.listini[utente["Extra2"]] : null
  const sconto = utente["Extra2"] == "-40% -10%" ? 10 : 0
  // console.log("%s = %s",utente["Extra2"], "-40% -10%")
  const rappresentante = utente["Extra1"] ? linkEsterni.rappresentanti[utente["Extra1"]] : null
  return {
    ultimaImportazione: Date.now(),
    idEsterno: utente["CodAnagr"],
    // denominazione: utente["Nome"],
    // partitaIva: utente["PartitaIva"],
    // codiceFiscale: utente["CodiceFiscale"],
    cliente: utente["Cliente"],
    fornitore: utente["Fornitore"],
    pec: utente["Pec"],
    codiceDestinatario: utente["FE_CodUfficio"],
    riferimentoAmministrazione: utente["FE_RifAmmin"],
    indirizzoFatturazione:{
      // denominazione: null,
      via: utente["Indirizzo"],
      cap: utente["Cap"],
      citta: utente["Citta"],
      provincia: utente["Prov"],
      stato: nazione,
      contatto:{
        tipoContatto:"Generico",
        denominazione: utente["Referente"],
        email: pulisciemail(utente["Email"]),
        telefono: pulisciTelefono(utente["Tel"]),
        cellulare: pulisciTelefono(utente["Cel"])
      }
    },
    vettoreDefault: vettore,
    portoDefault: porto,
    ivaDefault: iva,
    listino: listino,
    rappresentante: rappresentante,
    sconto: sconto
    // metodoPagamento: utente["PagamentoDefault"],
    // // banca: utente["NsBancaDefault"]
  }
}
function datiRichiestaCreaAnagrafica(utente, linkEsterni) {
  let dati = datiRichiestaAggiornaAnagrafica(utente, linkEsterni)
  dati.denominazione = utente["Nome"].trim()
  dati.partitaIva = utente["PartitaIva"]
  dati.codiceFiscale = utente["CodiceFiscale"]
  return dati
}
async function creaAnagrafeDaDanea(utente, linkEsterni){
  // const ivaID = await ricercaIva(utente)
  await strapi.entityService.create('api::utente.utente', {
    // @ts-ignore
    data: datiRichiestaCreaAnagrafica(utente, linkEsterni),
  });
}
async function aggiornaAnagrafeDaDanea(anagraficaPresente, utente, linkEsterni){
  // const ivaID = await ricercaIva(utente)
  await strapi.entityService.update('api::utente.utente', anagraficaPresente.id, {
    // @ts-ignore
    data: datiRichiestaAggiornaAnagrafica(utente, linkEsterni),
  });
}


// module.exports = createCoreService('api::gestione-dati.gestione-dati');
module.exports = {
    // Method 1: Creating an entirely new custom service
    async importaDanea(...args) {
      const FORZA_AGGIORNAMENTO_ANAGRAFICHE_PRESENTI = true;
      const FORZA_AGGIORNAMENTO_ANAGRAFICHE_PRESENTI_ANCHE_SE_MODIFICATE = false;
      let response = 'importa';
      let options = {};
      options.host = '192.168.50.150';
      options.port = 31976;
      options.database = "C:\\Users\\Ombrellificio\\Documents\\easyfat\\Archivi\\Ombrellificio.eft";
      options.user = 'SYSDBA';
      options.password = 'masterkey';
      options.lowercase_keys = false; // set to true to lowercase keys
      options.role = null;            // default
      options.pageSize = 4096;        // default when creating database
      options.pageSize = 4096;        // default when creating database
      options.retryConnectionInterval = 1000; // reconnect interval in case of connection drop
      options.blobAsText = false; // set to true to get blob as text, only affects blob subtype 1
      options.encoding = 'UTF-8'; // default encoding for connection is UTF-8
      
      const HOST = "192.168.50.150";
      const PORT = 31976;
      const FILE = "C:\\Users\\Ombrellificio\\Documents\\easyfat\\Archivi\\Ombrellificio.eft";

      const TABELLA_ANAGRAFICA = '"TAnagrafica"';
      

      console.log("Inizializzo il DB con valori di base")
      const linkEsterni = await inizializza(); // inizializza DB dal servizio 
      console.log("Inizializzazione completata: ")
      console.log(linkEsterni)
      response = "inizializzazione DB completata\nAvviata importazione asincrona...\nRisultato nei log del server"

      let Firebird = require('node-firebird');
      console.log("connessione a DB... avvio")
      // FIXME riuscire a far aspettare alla funzione 'inizializza', la callback del DataBase
      // @ts-ignore
      await Firebird.attach(options,  async function(err, db) {
          console.log("connessione a DB... stabilita")
          if (err)
              throw err;
      
          console.log("query utenti")
          db.query('SELECT * FROM '+TABELLA_ANAGRAFICA, async function(err, result) {
            console.log(result.length)
            console.log("query utenti... ultimata")
            let conteggioInseriti = 0;
            let conteggioGiaPresenti = 0;
            let conteggioErrori = 0;
            let ditteErrore = [];
            let ditteGiaPresenti = [];
            let ditteSaltatePerModifiche = [];
            console.log("avvio analisi e salvataggio dati")
            console.log("\tFORZA_AGGIORNAMENTO_ANAGRAFICHE_PRESENTI="+FORZA_AGGIORNAMENTO_ANAGRAFICHE_PRESENTI)
            console.log("\tANCHE_SE_MODIFICATE="+FORZA_AGGIORNAMENTO_ANAGRAFICHE_PRESENTI_ANCHE_SE_MODIFICATE)
            // elaboro
            let utente, i
            for (i in result) {
              utente = result[i]
              if((conteggioInseriti + conteggioGiaPresenti + conteggioErrori) > 50){
                // console.log(utente)
                break
              }
              // controllo se gia presente
              const ricerca = await controllaSeAnagraficaGiaPresente(utente);
              if (ricerca.length == 0) {
                // sistemo valori default
                try {
                  await creaAnagrafeDaDanea(utente, linkEsterni)
                  conteggioInseriti ++;

                } catch ( err){
                  console.error(err)
                  console.error(err.stak)
                  ditteErrore.push({ditta:utente["Nome"],err:err.message})
                  // console.log(utente)
                  conteggioErrori ++;
                }
              } else {
                // console.log("utente già presente a DB: " + utente["Nome"])
                conteggioGiaPresenti++
                ditteGiaPresenti.push(ricerca.length)
                ditteGiaPresenti.push(ricerca.map((u)=>[utente["Nome"],utente["PartitaIva"],utente["CodiceFiscale"]].join("¿")+"->"+u.denominazione).join("|"))
                if(FORZA_AGGIORNAMENTO_ANAGRAFICHE_PRESENTI){
                  if(ricerca.length == 1){
                    const anagraficaPresente = ricerca[0]
                    if(FORZA_AGGIORNAMENTO_ANAGRAFICHE_PRESENTI ||
                        anagraficaPresente.ultimaImportazione > anagraficaPresente.updatedAt) {
                      try {
                        await aggiornaAnagrafeDaDanea(anagraficaPresente, utente, linkEsterni)
                      } catch ( err){
                        console.error(err)
                        console.error(err.stak)
                        ditteErrore.push({ditta:utente["Nome"],err:err.message})
                        // console.log(utente)
                        conteggioErrori ++;
                      }
                    } else {
                      ditteSaltatePerModifiche.push(utente["Nome"])
                    }
                  }
                }
              }
            } // for
            console.log("inseriti: "+conteggioInseriti)
            console.log("già presenti in DB: "+conteggioGiaPresenti)
            // console.log(ditteGiaPresenti)
            console.log("errori: "+conteggioErrori)
            console.table(ditteErrore)
            console.log("Saltato aggiornamento perchè anagrafiche modificate: ")
            console.table(ditteSaltatePerModifiche)
            // IMPORTANT: close the connection
            db.detach();
            if (err)
              throw err;  
          });
      });

      

  
      return response
    },
  };