import type { Schema, Attribute } from '@strapi/strapi';

export interface DocumentoDocumento extends Schema.Component {
  collectionName: 'components_documento_documentos';
  info: {
    displayName: 'Documento';
    description: '';
  };
  attributes: {
    numero: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    anno: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 2000;
          max: 3000;
        },
        number
      > &
      Attribute.DefaultTo<2024>;
    variante: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Attribute.DefaultTo<1>;
    prezzoNettoForzato: Attribute.Decimal &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    note: Attribute.Text;
    data: Attribute.Date & Attribute.Required;
    metodoPagamento: Attribute.Relation<
      'documento.documento',
      'oneToOne',
      'api::metodo-pagamento.metodo-pagamento'
    >;
    banca: Attribute.Relation<
      'documento.documento',
      'oneToOne',
      'api::banca.banca'
    >;
    scadenze: Attribute.Component<'pagamento.scadenza', true> &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    indirizzoFatturazione: Attribute.Text;
    indirizzoSpedizione: Attribute.Text;
    rappresentante: Attribute.Relation<
      'documento.documento',
      'oneToOne',
      'api::dipendente.dipendente'
    >;
  };
}

export interface DocumentoLinea extends Schema.Component {
  collectionName: 'components_documento_lineas';
  info: {
    displayName: 'Linea';
    description: '';
  };
  attributes: {
    numero: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 0;
          max: 10000;
        },
        number
      > &
      Attribute.DefaultTo<1>;
    prezzoNettoCad: Attribute.Decimal;
    prezzoNettoTot: Attribute.Decimal;
    titoloForzato: Attribute.String;
    descrizione: Attribute.Text;
    prezzoNettoTotForzato: Attribute.Decimal;
    descrizioneForzata: Attribute.Text;
    prodotto: Attribute.Relation<
      'documento.linea',
      'oneToOne',
      'api::prodotto.prodotto'
    >;
    taglia: Attribute.Relation<
      'documento.linea',
      'oneToOne',
      'api::taglia.taglia'
    >;
    titolo: Attribute.String;
    iva: Attribute.Relation<'documento.linea', 'oneToOne', 'api::iva.iva'>;
  };
}

export interface PagamentoScadenza extends Schema.Component {
  collectionName: 'comp_pag_scad';
  info: {
    displayName: 'Scadenza';
    description: '';
  };
  attributes: {
    percentuale: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 100;
        },
        number
      > &
      Attribute.DefaultTo<100>;
    giorniPosticipazione: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: -1;
          max: 180;
        },
        number
      > &
      Attribute.DefaultTo<-1>;
    fineMese: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

export interface PersFinituraLato extends Schema.Component {
  collectionName: 'comp_pers_fin';
  info: {
    displayName: 'Finitura';
    description: '';
  };
  attributes: {
    bordatura: Attribute.Relation<
      'pers.finitura-lato',
      'oneToOne',
      'api::bordatura.bordatura'
    >;
    angolo1: Attribute.Relation<
      'pers.finitura-lato',
      'oneToOne',
      'api::accessorio.accessorio'
    >;
    angolo2: Attribute.Relation<
      'pers.finitura-lato',
      'oneToOne',
      'api::accessorio.accessorio'
    >;
    lato: Attribute.Relation<
      'pers.finitura-lato',
      'oneToOne',
      'api::accessorio.accessorio'
    >;
    saltaAccessoriLatoAgliAngoli: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    numeroAccessori: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    misura: Attribute.Decimal &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    posizione: Attribute.Enumeration<['Sinistro', 'Destro', 'Sopra', 'Sotto']>;
  };
}

export interface PersPersonalizzazione extends Schema.Component {
  collectionName: 'comp_pers_p';
  info: {
    displayName: 'P_zione';
    description: '';
  };
  attributes: {
    titoloLavorazione: Attribute.String;
    finitura: Attribute.JSON;
    tessuto_forzato: Attribute.Relation<
      'pers.personalizzazione',
      'oneToOne',
      'api::tessuto.tessuto'
    >;
    richiesteCliente: Attribute.Text;
    soggetti: Attribute.Component<'pers.soggetti', true> &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    noteInterne: Attribute.Text;
    files: Attribute.Relation<
      'pers.personalizzazione',
      'oneToMany',
      'api::file-stampa.file-stampa'
    >;
  };
}

export interface PersSoggetti extends Schema.Component {
  collectionName: 'comp_pers_sogg';
  info: {
    displayName: 'soggetti';
    description: '';
  };
  attributes: {
    numero: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    sottotitolo: Attribute.String;
    files: Attribute.Relation<
      'pers.soggetti',
      'oneToMany',
      'api::file-stampa.file-stampa'
    >;
  };
}

export interface UtenteAzienda extends Schema.Component {
  collectionName: 'components_utente_aziendas';
  info: {
    displayName: 'DatiFatturazioneBase';
    icon: '';
    description: '';
  };
  attributes: {
    partitaIva: Attribute.String;
    codiceFiscale: Attribute.String;
    codiceDestinatario: Attribute.String;
    riferimentoAmministrazione: Attribute.String;
    pec: Attribute.Email;
  };
}

export interface UtenteContatto extends Schema.Component {
  collectionName: 'components_utente_contattos';
  info: {
    displayName: 'contatto';
    icon: 'envelop';
    description: '';
  };
  attributes: {
    denominazione: Attribute.String;
    telefono: Attribute.String;
    email: Attribute.Email;
    tipoContatto: Attribute.Enumeration<
      [
        'Fatturazione',
        'Ordini',
        'Spedizione',
        'Amministrazione',
        'Produzione',
        'Magazzino',
        'Generico'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'Generico'>;
    cellulare: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 5;
        maxLength: 20;
      }>;
  };
}

export interface UtenteIndirizzo extends Schema.Component {
  collectionName: 'components_utente_indirizzos';
  info: {
    displayName: 'Indirizzo';
    description: '';
    icon: 'car';
  };
  attributes: {
    denominazione: Attribute.String;
    via: Attribute.String;
    cap: Attribute.String;
    citta: Attribute.String;
    provincia: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 2;
        maxLength: 2;
      }>;
    contatto: Attribute.Component<'utente.contatto'>;
    stato: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Italia'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'documento.documento': DocumentoDocumento;
      'documento.linea': DocumentoLinea;
      'pagamento.scadenza': PagamentoScadenza;
      'pers.finitura-lato': PersFinituraLato;
      'pers.personalizzazione': PersPersonalizzazione;
      'pers.soggetti': PersSoggetti;
      'utente.azienda': UtenteAzienda;
      'utente.contatto': UtenteContatto;
      'utente.indirizzo': UtenteIndirizzo;
    }
  }
}
