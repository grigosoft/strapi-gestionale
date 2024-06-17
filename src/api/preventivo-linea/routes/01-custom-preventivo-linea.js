module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/preventivo-linee/inizializza/:prodotto',
        handler: 'preventivo-linea.inizializza',
      },
    ],
  };