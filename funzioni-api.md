# registrazione
`POST /api/auth/local/register`
```
import axios from 'axios';
    axios
      .post('http://localhost:1337/auth/local/register', {
        username: 'Kapman',
        email: 'test@test.com',
        password: 'Password',
      })
      .then(response => {
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      });
```

# login
non effettua il login del super user
`POST /api/auth/local`
```
import axios from 'axios';
    axios
      .post('http://localhost:1337/auth/local', {
        identifier: 'test@test.com',
        password: 'Password',
      })
      .then(response => {
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      });
```

# sequenze numeriche ( in teoria non serve usarle )
con preleva restituisce il valore corrente e avanza il contatore
`GET /api/sequenza-numerica/preleva/:nome/:riferimento`
con anteprima restituisce il valore corrente
`GET /api/sequenza-numerica/anteprima/:nome/:riferimento`

# Azienda
`GET /api/aziende?populate=*`

# Dipendente (anche rappresentanti)
`GET /api/dipendenti?populate=*`

# Utente (cliente-fornitore)
`GET /api/utenti?populate=*`

# Preventivo
`GET /api/preventivi?populate=*`
per precompilare i campi preventivo
`GET /api/preventivi/inizializza/:idUtente`

## Preventivo-Linea
GET /api/preventivo-linee?populate=*
GET /api/preventivo-linee?populate=*&filters[preventivo]=:idPreventivo
GET /api/preventivi?populate[0]=preventivo_linee.dati&populate[1]=preventivo_linee.personalizzazione&populate[2]=preventivo_linee.personalizzazione.soggetti

# Finiture
### Bordature
GET /api/bordature?populate=accessori&filters[tessuti][id][$eq]=:idTessuto
### Accessori
GET /api/accessori?filters[bordature][id][$eq]=:idBordatura
### FinitureDefault
`GET /api/finiture-default?filters[prodotti][id][$eq]=:idTessuto&populate=finitureLato,finitureLato.accessorioAngolo1,finitureLato.accessorioAngolo2,finitureLato.accessoriLato`
prendere la parte finitureLato e copiarlo nel json della personalizzazione

