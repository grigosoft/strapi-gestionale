
// GENERICI
interface Tabella<T>{
    id: number
    attributes:T
}
interface DataList<T>{
    data:Tabella<T>[]
}
interface Data<T>{
    data:Tabella<T>
}
interface Media{

}
interface SequenzaNumerica {
    createdAt: Date
    updatedAt: Date
    nome: string
    sequenza: number
    riferimento: string
    azienda: Data<Azienda>
}
interface scadenzaPagamento { // components
    id:number
    percentuale: number
    giorniPosticipazione: number
    fineMese: boolean
}
interface MetodoPagamento{
    createdAt: Date
    updatedAt: Date
    nome: string
    tipoPagamento: "Bonifico"|"RiBa"|"Contante"|"Assegno"|"PayPal"|"Amazon"
    scadenze: scadenzaPagamento[]
    spostaScadenzeFerie: true
    giorniPosticipoFineMese: number
    banche: DataList<Banca>
}
interface Banca {
    createdAt: Date
    updatedAt: Date
    nome: string
    iban: string,
    metodiPagamento: DataList<MetodoPagamento>
    azienda: Data<Azienda>
}
interface Settore{
    createdAt: Date
    updatedAt: Date
    nome: string
    dipendenti: Data<Dipendente>
    settoreSuccessivo: Data<Settore>
    settorePrecedente: Data<Settore>
    lavorazioni: DataList<Lavorazione>
    stati: DataList<StatoSettore>
}
interface StatoSettore {
    createdAt: Date
    updatedAt: Date
    nome: string
    descrizione: string
    settore: Data<Settore>
}
interface Indirizzo{ // components
    id: number
    denominazione: string
    via: string
    cap: string
    citta: string
    provincia: string
    contatto: Contatto
}
interface Contatto { // components
    id: number
    denominazione: string
    telefono: string
    email: string
    tipoContatto: string
    cellulare: string
}
interface Iva {
    createdAt: Date
    updatedAt: Date
    nome: string
    descrizione: string
    valore: number
}
interface Listino {
    createdAt: Date
    updatedAt: Date
    Nome: string
    descrizione: string
    ricarico: number
    utenti: DataList<Utente>
}
// UTENTI
interface Azienda {
    createdAt: Date
    updatedAt: Date
    indirizzoFatturazione: Indirizzo
    commissioni: number
    logo: Data<Media>
    ico: Data<Media>
    metodoPagamentoPreferito: Data<MetodoPagamento>
    dipendenti: DataList<Dipendente>
    denominazione: string
    utenti:DataList<Utente>
    nome: string
    partitaIva: string
    codiceFiscale: string
    codiceDestinatario: string
    pec: string
    bancaPreferita: Data<Banca>
    sequenzeNumeriche: DataList<SequenzaNumerica>
    banche: DataList<Banca>
}
interface Role {
    name: string
    description: string
}
interface User {
    username: string
    email: string
    provider: string
    // password: string
    resetPasswordToken: string
    confirmationToken: string
    confirmed: boolean
    blocked: boolean
    role: DataList<Role>
    avatar: Data<Media>
    dipendente: Data<Dipendente>
    utente: Data<Utente>
}
interface Utente {
    createdAt: Date
    updatedAt: Date
    cliente: boolean
    fornitore: boolean
    note: string
    iban: string
    sconto: number
    denominazione: string
    partitaIva: string
    codiceFiscale: string
    codiceDestinatario: string
    riferimentoAmministrazione: string
    pec: string
    login: Data<User>
    rappresentante: Data<Dipendente>
    indirizziSpedizione: DataList<Indirizzo>
    indirizzoFatturazione: Data<Indirizzo>
    ivaDefault: Data<Iva>
    listino: Data<Listino>
    metodoPagamento: Data<MetodoPagamento>
    contatti: Contatto[]
    preventivi:DataList<Preventivo>
    banca: Data<Banca>
    azienda: Data<Azienda>
    ordini_cliente: DataList<OrdineCliente>
    documenti_trasporto: DataList<DocumentoTrasporto>
    idIndirizzoSpedizioneDefault: number
    splitPayment: boolean
    tipoUtente: "Privato"|"Azienda"|"Agenzia"|"Pubblica Amministrazione"
}
interface Dipendente {
    createdAt: Date
    updatedAt: Date
    nome: string
    cognome: string,
    login: Data<User>
    azienda: Data<Azienda>
    rappresentante: boolean
    clienti: DataList<Utente>
    settori: DataList<Settore>
    codiceFiscale: string
}
// FINITURE
interface Tessuto {
    createdAt: Date
    updatedAt: Date
    nome: string
    grammatura: Number
    altezzaMassima: Number,
    descrizione: string
    foto: Data<Media>
    prodotti: DataList<Prodotto>
    bordature: DataList<Tessuto>
}
interface Bordatura{
    createdAt: Date
    updatedAt: Date
    nome: string
    foto: Media
    tessuti: DataList<Tessuto>
    accessori: DataList<Accessorio>
}
interface Accessorio {
      nome: string
      createdAt: Date
      updatedAt: Date
      foto: Media
      bordature: DataList<Bordatura>
}
interface finitureLato{ // component
    bordatura: Data<Bordatura>
    angolo1: Data<Accessorio> // accessorio agli angolo, esempio cappio e cordino
    angolo2: Data<Accessorio>
    lato:Data<Accessorio> // accessori sulla bordatura ( esempio moschettoni lungo il palo)
    saltaAccessoriLatoAgliAngoli:boolean
    numeroAccessori: number
    misura: number
    posizione: "sopra" | "sotto" | "sinista" | "destra"
}
interface FinituraDefault{
    createdAt: Date
    updatedAt: Date
    nome: string
    prodotti:DataList<Prodotto>
    finitureLato:finitureLato[]
}
// DOCUMENTI
interface DatiDocumento{ // components
    numero: string
    anno:number
    variante: number
    prezzoNettoForzato: number
    note: string
    data: Date
    metodoPagamento: Data<MetodoPagamento>
    banca: Data<Banca>
    scadenze: scadenzaPagamento[]
    indirizzoFatturazione: string
    indirizzoSpedizione: string
}
interface DocumentoTrasporto {
    createdAt: Date
    updatedAt: Date
    utente: Data<Utente>
    dati: DatiDocumento
    dataTrasporto: string
    causale: string
    porto: string
    vettore: string
    ordineCliente:Data<OrdineCliente>
    linee: Data<DocumentoTrasportoLinea>
    preventivo: Data<Preventivo>
}
interface Preventivo {
    createdAt: Date
    updatedAt: Date
    giorniProduzioneForzato: number
    dati: DatiDocumento
    linee: DataList<PreventivoLinea>
    dataSpedizione: Date
    dataLimiteConferma: Date
    preventivoSuccessivo: Data<Preventivo>
    preventivoPrecedente:Data<Preventivo>
    utente:Data<Utente>
    documentiTrasporto:DataList<DocumentoTrasporto>
    ordineCliente: Data<OrdineCliente>
}
interface OrdineCliente{
    createdAt: Date
    updatedAt: Date
    dati: DatiDocumento
    dataSpedizione: Date
    utente: Data<Utente>
    documentiTrasporto: DataList<DocumentoTrasporto>
    linee: DataList<OrdineClienteLinea>
    preventivo: Data<Preventivo>
}

// LINEE
interface DatiLinea { // component
    id: number
    numero: number
    prezzoNettoCad: number
    prezzoNettoTot: number
    titoloForzato: string
    descrizione: string
    prezzoNettoTotForzato: number
    descrizioneForzata: string
    prodotto: Data<Prodotto>
    taglia: Data<Taglia>
    titolo: string
    iva: Data<Iva>
}
interface Personalizzazione{ // component
    id: number
    titoloLavorazione: string
    finitura: string
    tessutoForzato: Data<Tessuto>
    richiesteCliente: string
    soggetti:Soggetti[]
    files: DataList<Media>
    noteInterne: string
}
interface Soggetti { // component
    id: number
    files: DataList<Media>
    sottotitolo: string
}
interface DocumentoTrasportoLinea{
    createdAt: Date
    updatedAt: Date
    documentoTrasporto: Data<DocumentoTrasporto>
    dati: DatiLinea
    personalizzazione: Personalizzazione
    lavorazione: Data<Lavorazione>
}
interface PreventivoLinea {
    createdAt: Date
    updatedAt: Date
    dati: DatiLinea
    personalizzazione: Personalizzazione
    lavorazione: Data<Lavorazione>
    preventivo: Data<Preventivo>
}
interface OrdineClienteLinea{
    createdAt: Date
    updatedAt: Date
    ordineCliente: Data<OrdineCliente>
    dati: DatiLinea
    personalizzazione: Personalizzazione
    lavorazione: Data<Lavorazione>
    preventivo: Data<Preventivo>
}

// PRODOTTI
interface Taglia {
    createdAt: Date
    pdatedAt: Date
    nome: string
    descrizione: string
    prodotti: DataList<Prodotto>
}
interface Prodotto {
    createdAt: Date
    pdatedAt: Date
    nome: string
    descrizione: string
    personalizzabile: boolean
    media: Data<Media>
    tessuti: DataList<Tessuto>
    codice: string
    taglie: DataList<Taglia>
    calcoloPrezzo: "Calcolatore"|"Listino"
    prodottiDipendenti: DataList<Prodotto>
    prodottiServiti: DataList<Prodotto>
    finiture: DataList<FinituraDefault>
}

// LAVORAZIONE | flusso lavoro
interface AvanzamentoLavorazione{
    settore: string
    completato: boolean
    autore: string
}
interface Lavorazione {
    createdAt: Date
    updatedAt: Date
    preventivoLinea: Data<PreventivoLinea>
    settoreCorrente: Data<Settore>
    avanzamento: DataList<AvanzamentoLavorazione>
    ordineClienteLinea: Data<OrdineClienteLinea>
    documentoTrasportoLinea: Data<DocumentoTrasportoLinea>
    statoSettore: Data<StatoSettore>
}