module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/preventivi/inizializza/:utente',
        handler: 'preventivo.inizializza',
      },
    ],
  };