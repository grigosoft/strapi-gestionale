const request = require( 'supertest');

const { creaRuolo , creaUtente, login } = require("../helpers/utility");

it("Utente non loggato: Errore", async() => {
    await request(strapi.server.httpServer)
    .get("/api/utenti")
    .expect(403)
});

// Cliente
const User_Cliente = 
{
    username: "T_Cliente",
    email: "tester_cliente@strapi.com",
    password: "1234abc",
    confirmed: true,
    blocked: null,
}

// Dipendente 
const User_Dipendente ={
    username: "T_Dipendente",
    email: "tester_dipendente@strapi.com",
    password: "1234abc",
    confirmed: true,
    blocked: null,
}

let dipendente = creaRuolo("dip", ["api::utente.utente.find", "api::utente.utente.findOne", "api::utente.utente.create", "api::utente.utente.update", "api::utente.utente.delete"]);

// Rappresentante
const User_Rappresentante ={
    username: "T_Rappresentante",
    email: "tester_rappresentante@strapi.com",
    password: "1234abc",
    confirmed: true,
    blocked: null,
}


// dipendente per relazione
const Dipendente_1 = { data: {
    nome: "Dipendente_1",
    cognome: "Dipendente_1",
    rappresentante: false
}}

// rappresentante per relazione
const Rappresentante_1 = { data: {
    nome: "Rappresentante_1",
    cognome: "Rappresentante_1",
    rappresentante: true
}}

it("Un utente non dipendente vede la lista degli utenti", async() => {


})
