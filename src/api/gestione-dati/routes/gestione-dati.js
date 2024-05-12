const { inizializza, importaDanea, esportaRubricaCsv } = require('../controllers/gestione-dati');


module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/gestione-dati/inizializza',
        handler: inizializza
      },
      {
        method: 'GET',
        path: '/gestione-dati/importa-danea',
        handler: importaDanea
      },
      {
        method: 'GET',
        path: '/gestione-dati/esporta-rubrica-csv',
        handler: esportaRubricaCsv
      }
    ],
  };