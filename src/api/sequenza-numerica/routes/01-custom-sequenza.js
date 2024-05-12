module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/sequenza-numerica/preleva/:nome/:riferimento',
        handler: 'sequenza-numerica.preleva',
      },
      {
        method: 'GET',
        path: '/sequenza-numerica/anteprima/:nome/:riferimento',
        handler: 'sequenza-numerica.anteprima',
      },
    ],
  };