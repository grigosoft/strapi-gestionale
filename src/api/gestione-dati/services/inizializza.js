'use strict';


/**
 * gestione-dati service
 */

const {createOrUpdate} = require('./utils');

function creaRelazioniDaVettore(vettore, sorgente) {
    // let relazioni = []
    // for(let i in vettore){
    //     // let relazione = {  }
    //     // relazione[vettore[i]] = sorgente[vettore[i]]
    //     relazioni.push( sorgente[vettore[i]] )
    // }
    // // console.log(relazioni)
    return vettore.map((a)=>{return sorgente[a]})
}


async function createOrUpdateTessuto(data){
    return await createOrUpdate("api::tessuto.tessuto", "nome",data)
  }
async function createOrUpdateAccessorio(data){
    return await createOrUpdate("api::accessorio.accessorio", "nome",data)
  }
  async function createOrUpdateBordatura(data){
    console.log(data)
    return await createOrUpdate("api::bordatura.bordatura", "nome",data)
  }
async function createOrUpdateIva(data){
  return await createOrUpdate("api::iva.iva", "nome",data)
}
async function createOrUpdateListino(data){
  return await createOrUpdate("api::listino.listino", "nome",data)
}
async function createOrUpdateDipendente(data){
  return await createOrUpdate("api::dipendente.dipendente","codiceFiscale",data)
}
async function createOrUpdateMetodoPagamento(data){
  return await createOrUpdate("api::metodo-pagamento.metodo-pagamento","nome",data)
}
async function createOrUpdateBanca(data){
  return await createOrUpdate("api::banca.banca","iban",data)
}
async function createOrUpdateAzienda(data){
  return await createOrUpdate("api::azienda.azienda","denominazione",data)
}
const AZIENDA_GRIGOPRINT = "Grigoprint"
const AZIENDA_OMBRELLIFICIO = "Ombrellificio"
async function inizializzaDB(){
    // parte di finiture
    let tessuti = {};
    tessuti["Carta"] = await createOrUpdateTessuto({nome:"Carta", grammatura:90, altezzaMassima:160})
    tessuti["Nautico 110g"] = await createOrUpdateTessuto({nome:"Nautico 110g", grammatura:110, altezzaMassima:160})
    tessuti["Nautico 110g Super"] = await createOrUpdateTessuto({nome:"Nautico 110g Super", grammatura:110, altezzaMassima:160})
    tessuti["Nautico 160g Super"] = await createOrUpdateTessuto({nome:"Nautico 160g Super", grammatura:160, altezzaMassima:150})

    tessuti["Pongee"] = await createOrUpdateTessuto({nome:"Pongee", grammatura:85, altezzaMassima:160})
    tessuti["Nautico Ogive"] = await createOrUpdateTessuto({nome:"Nautico Ogive", grammatura:110, altezzaMassima:160})
    tessuti["Voile"] = await createOrUpdateTessuto({nome:"Voile", grammatura:85, altezzaMassima:160})
    tessuti["Ducato"] = await createOrUpdateTessuto({nome:"Ducato", grammatura:220, altezzaMassima:160})
    tessuti["Canvas Pesante"] = await createOrUpdateTessuto({nome:"Canvas Pesante", grammatura:320, altezzaMassima:160})
    tessuti["Canvas Leggero"] = await createOrUpdateTessuto({nome:"Canvas Leggero", grammatura:210, altezzaMassima:160})
    tessuti["Raso Leggero"] = await createOrUpdateTessuto({nome:"Raso Leggero", grammatura:120, altezzaMassima:160})
    tessuti["Raso Pesante"] = await createOrUpdateTessuto({nome:"Raso Pesante", grammatura:200, altezzaMassima:160})
    tessuti["Microfibra"] = await createOrUpdateTessuto({nome:"Microfibra", grammatura:230, altezzaMassima:160})
    tessuti["Pile"] = await createOrUpdateTessuto({nome:"Pile", grammatura:350, altezzaMassima:160})
    tessuti["Ombrelli"] = await createOrUpdateTessuto({nome:"Ombrelli", grammatura:100, altezzaMassima:160})
    tessuti["Ombrelloni"] = await createOrUpdateTessuto({nome:"Ombrelloni", grammatura:160, altezzaMassima:160})
    tessuti["Lycra"] = await createOrUpdateTessuto({nome:"Lycra", grammatura:150, altezzaMassima:160})
    tessuti["TNT"] = await createOrUpdateTessuto({nome:"TNT", grammatura:180, altezzaMassima:160})
    tessuti["Acrilico 350g"] = await createOrUpdateTessuto({nome:"Acrilico 350g", grammatura:350, altezzaMassima:180})
    console.log("Tessuti settati")
    let accessori = {};
    accessori["Moschettone snodato"] = await createOrUpdateAccessorio({nome:"Moschettone snodato"})
    accessori["Moschettone piano"] = await createOrUpdateAccessorio({nome:"Moschettone piano"})
    accessori["Moschettone in metallo"] = await createOrUpdateAccessorio({nome:"Moschettone in metallo"})
    accessori["Cappio"] = await createOrUpdateAccessorio({nome:"Cappio"})
    accessori["Cordino"] = await createOrUpdateAccessorio({nome:"Cordino"})
    accessori["Laccetto"] = await createOrUpdateAccessorio({nome:"Laccetto"})
    accessori["Anello 40"] = await createOrUpdateAccessorio({nome:"Anello 40"})
    accessori["Anello 60"] = await createOrUpdateAccessorio({nome:"Anello 60"})
    accessori["Chiusura"] = await createOrUpdateAccessorio({nome:"Chiusura"})
    accessori["Rinforzo angolare con colla"] = await createOrUpdateAccessorio({nome:"Rinforzo angolare con colla"})
    accessori["Rinforzo angolare tessuto"] = await createOrUpdateAccessorio({nome:"Rinforzo angolare tessuto"})
    console.log("accessori settati")
    let bordature = {};
    bordature["Taglio Antisfilo"] = await createOrUpdateBordatura({nome:"Taglio Antisfilo", tessuti:
        creaRelazioniDaVettore(
            ["Nautico 110g", "Nautico 110g Super", "Nautico 160g Super", "Pongee", "Nautico Ogive","Voile",
            "Ducato","Canvas Pesante", "Canvas Leggero", "Raso Leggero", "Raso Pesante", "Ombrelli", "Ombrelloni", "TNT"],
            tessuti)
    , accessori:
        creaRelazioniDaVettore(
            ["Laccetto","Anello 40","Anello 60"],
            accessori
        )
    })
    bordature["orlo 2 aghi"] = await createOrUpdateBordatura({nome:"orlo 2 aghi", tessuti:
        creaRelazioniDaVettore(
            ["Nautico 110g", "Nautico 110g Super", "Nautico 160g Super", "Pongee", "Nautico Ogive","Voile",
            "Ducato","Canvas Pesante", "Canvas Leggero", "Raso Leggero", "Raso Pesante", "Ombrelli", "Ombrelloni", "TNT"],
            tessuti)
    , accessori:
        creaRelazioniDaVettore(
            ["Laccetto"],
            accessori
        )
    })
    bordature["orlo 1 ago"] = await createOrUpdateBordatura({nome:"orlo 1 ago", tessuti:
        creaRelazioniDaVettore(
            ["Nautico 110g", "Nautico 110g Super", "Nautico 160g Super", "Pongee", "Nautico Ogive","Voile",
            "Ducato","Canvas Pesante", "Canvas Leggero", "Raso Leggero", "Raso Pesante", "Ombrelli", "Ombrelloni", "TNT"],
            tessuti)
    , accessori:
        creaRelazioniDaVettore(
            ["Laccetto"],
            accessori
        )
    })
    bordature["orlo foulard"] = await createOrUpdateBordatura({nome:"orlo foulard", tessuti:
        creaRelazioniDaVettore(
            ["Pongee", "Voile", "Ombrelli"],
            tessuti)
    , accessori:
        creaRelazioniDaVettore(
            ["Laccetto"],
            accessori
        )
    })
    bordature["fettuccia a vista"] = await createOrUpdateBordatura({nome:"fettuccia a vista", tessuti:
        creaRelazioniDaVettore(
            ["Nautico 110g", "Nautico 110g Super", "Nautico 160g Super", "Pongee", "Nautico Ogive","Voile",
            "Ducato","Canvas Pesante", "Canvas Leggero", "Raso Leggero", "Raso Pesante", "Ombrelli", "Ombrelloni", "TNT"],
            tessuti)
    , accessori:
        creaRelazioniDaVettore(
            ["Laccetto","Anello 40","Anello 60","Cordino","Anello 40","Anello 60","Moschettone snodato","Moschettone piano","Moschettone in metallo"],
            accessori
        )
    })
    console.log("bordature settate")
    let ive = {}
    ive["22"] = await createOrUpdateIva({nome:"22", descrizione: "Imponibile 22%", valore:0.22})
    ive["22sp"] = await createOrUpdateIva({nome:"22sp", descrizione: "Imponibile 22% con split payment", valore:0})
    ive["N3.1"] = await createOrUpdateIva({nome:"N3.1", descrizione: "Rapporti svizzera", valore:0})
    ive["N72"] = await createOrUpdateIva({nome:"N72", descrizione: "QGI VERONA?", valore:0})
    console.log("Ive minime settate")
    let metodiPagamento = {}
    metodiPagamento["Bonifico Anticipato"] = await createOrUpdateMetodoPagamento({nome:"Bonifico anticipato", tipoPagamento:"Bonifico",spostaScadenzeFerie:false,giorniPosticipoFineMese:0,scadenze:[
        {percentuale:100, giorniPosticipazione:0, fineMese:false}
    ]})
    metodiPagamento["R.D. 30gg"] = await createOrUpdateMetodoPagamento({nome:"R.D. 30gg", tipoPagamento:"Bonifico",spostaScadenzeFerie:false,giorniPosticipoFineMese:0,scadenze:[
        {percentuale:100, giorniPosticipazione:30, fineMese:false}
    ]})
    metodiPagamento["R.D. 30gg fm"] = await createOrUpdateMetodoPagamento({nome:"R.D. 30gg fm", tipoPagamento:"Bonifico",spostaScadenzeFerie:false,giorniPosticipoFineMese:0,scadenze:[
        {percentuale:100, giorniPosticipazione:30, fineMese:true}
    ]})
    metodiPagamento["R.D. 60gg"] = await createOrUpdateMetodoPagamento({nome:"R.D. 60gg", tipoPagamento:"Bonifico",spostaScadenzeFerie:false,giorniPosticipoFineMese:0,scadenze:[
        {percentuale:100, giorniPosticipazione:60, fineMese:false}
    ]})
    metodiPagamento["R.D. 60gg fm"] = await createOrUpdateMetodoPagamento({nome:"R.D. 60gg fm", tipoPagamento:"Bonifico",spostaScadenzeFerie:false,giorniPosticipoFineMese:0,scadenze:[
        {percentuale:100, giorniPosticipazione:60, fineMese:true}
    ]})
    metodiPagamento["R.D. 90gg fm"] = await createOrUpdateMetodoPagamento({nome:"R.D. 90gg fm", tipoPagamento:"Bonifico",spostaScadenzeFerie:false,giorniPosticipoFineMese:0,scadenze:[
        {percentuale:100, giorniPosticipazione:90, fineMese:true}
    ]})
    metodiPagamento["R.D. 0-30gg fm"] = await createOrUpdateMetodoPagamento({nome:"R.D. 0-30gg fm", tipoPagamento:"Bonifico",spostaScadenzeFerie:false,giorniPosticipoFineMese:0,scadenze:[
        {percentuale:50, giorniPosticipazione:0, fineMese:false},
        {percentuale:50, giorniPosticipazione:30, fineMese:true}
    ]})
    metodiPagamento["R.D. 30-60gg fm"] = await createOrUpdateMetodoPagamento({nome:"R.D. 30-60gg fm", tipoPagamento:"Bonifico",spostaScadenzeFerie:false,giorniPosticipoFineMese:0,scadenze:[
        {percentuale:50, giorniPosticipazione:30, fineMese:true},
        {percentuale:50, giorniPosticipazione:60, fineMese:true}
    ]})
    metodiPagamento["R.D. 60-90gg fm"] = await createOrUpdateMetodoPagamento({nome:"R.D. 60-90gg fm", tipoPagamento:"Bonifico",spostaScadenzeFerie:false,giorniPosticipoFineMese:0,scadenze:[
        {percentuale:50, giorniPosticipazione:60, fineMese:true},
        {percentuale:50, giorniPosticipazione:90, fineMese:true}
    ]})
    metodiPagamento["RiBa 30gg fm"] = await createOrUpdateMetodoPagamento({nome:"RiBa 30gg fm", tipoPagamento:"RiBa",spostaScadenzeFerie:true,giorniPosticipoFineMese:0,scadenze:[
        {percentuale:100, giorniPosticipazione:30, fineMese:true}
    ]})
    metodiPagamento["RiBa 60gg fm"] = await createOrUpdateMetodoPagamento({nome:"RiBa 60gg fm", tipoPagamento:"RiBa",spostaScadenzeFerie:true,giorniPosticipoFineMese:0,scadenze:[
        {percentuale:100, giorniPosticipazione:60, fineMese:true}
    ]})
    metodiPagamento["RiBa 90gg fm"] = await createOrUpdateMetodoPagamento({nome:"RiBa 90gg fm", tipoPagamento:"RiBa",spostaScadenzeFerie:true,giorniPosticipoFineMese:0,scadenze:[
        {percentuale:100, giorniPosticipazione:90, fineMese:true}
    ]})
    console.log("Metodi pagamento settati")
    let aziende = {}
    aziende[AZIENDA_GRIGOPRINT] = await createOrUpdateAzienda({denominazione:"Grigoprint", indirizzoFatturazione:{
        via:"Viale del commercio 3", cap:"37030", citta:"Colognola ai colli", provincia:"VR"
    }})
    aziende[AZIENDA_OMBRELLIFICIO] = await createOrUpdateAzienda({denominazione:"Ombrellificio Grigolini di Grigolini Marcello", partitaIva:"01628380238", codiceFiscale:"GRGMCL60C27M172I",indirizzoFatturazione:{
        via:"Loc.S.Antonio 2", cap:"37031", citta:"Illasi", provincia:"VR"
    }})
    console.log("Aziende minime settate")
    let banche = {}
    banche["BVR Grigoprint"] = await createOrUpdateBanca({nome:"BVR Banca", iban:"IT14G0866959490030000978215", azienda:aziende[AZIENDA_GRIGOPRINT]})
    // banche["BVR Ombrellificio"] = await createOrUpdateBanca({nome:"BVR Banca", azienda:aziende[AZIENDA_OMBRELLIFICIO]})
    banche["Unicredit"] = await createOrUpdateBanca({nome:"Unicredit", iban:"IT14Y0200859490000003923071", azienda:aziende[AZIENDA_OMBRELLIFICIO]})
    // banche["BPM Banca"] = await createOrUpdateBanca({nome:"BPM", azienda:aziende[AZIENDA_OMBRELLIFICIO]})
    console.log("Banche minime settate")
    let rappresentanti = {}
    rappresentanti["Corbella Raffaele"] = await createOrUpdateDipendente({nome:"Raffaele", cognome:"Corbella", codiceFiscale:"crbrfl38a27l781e", rappresentante:true})
    rappresentanti["Amazon"] = null
    rappresentanti["Molise"] = null
    rappresentanti["Liberatore"] = null
    rappresentanti["Boscaro"] = null
    console.log("Rappresentanti minimi settati")

    // dipendenti
    await createOrUpdateDipendente({nome:"Antonio", cognome:"Grigolini", codiceFiscale:"GRGNTN91M28F382R", rappresentante:false})
    await createOrUpdateDipendente({nome:"Marcello", cognome:"Grigolini", codiceFiscale:"GRGMCL60C27M172I", rappresentante:false})
    await createOrUpdateDipendente({nome:"Andrea", cognome:"Olivo", codiceFiscale:"LVONDR82R12B107W", rappresentante:false})
    await createOrUpdateDipendente({nome:"Giovanna", cognome:"Lupatini", codiceFiscale:"LPTGNN70C49H783C", rappresentante:false})
    await createOrUpdateDipendente({nome:"Dorothy", cognome:"Rampondi", codiceFiscale:"RMPDTH70T53Z110N", rappresentante:false})
    await createOrUpdateDipendente({nome:"Luciana", cognome:"Viviani", codiceFiscale:"VVNLCN71T56I775V", rappresentante:false})
    console.log("Dipendenti settati")

    let listini = {}
    listini["Agenzie"] = await createOrUpdateListino({nome:"Agenzie", descrizione: "Listino riservato ai rivenditori", ricarico:10})
    listini["-40%"] = await createOrUpdateListino({nome:"-40%", descrizione: "Listino pubblico", ricarico:30})
    listini["-40% -10%"] = listini["-40%"]
    listini["agenzie super"] = listini["Agenzie"]
    listini["/"] = null
    console.log("Listini minimi settati")

    return {ive:ive, listini:listini, rappresentanti:rappresentanti, aziende:aziende}
  }

module.exports = {
    async inizializza(...args) {
      return inizializzaDB()
    },
};