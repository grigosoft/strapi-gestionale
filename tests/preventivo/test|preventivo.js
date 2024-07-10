const request = require('supertest');
const { creaRuolo } = require("../helpers/ruoli");

// user mock data
const mockUserData = {
    username: "tester",
    email: "tester@strapi.com",
    provider: "local",
    password: "1234abc",
    confirmed: true,
    blocked: null,
  };

it("test login", async () => {
    let idRuolo = await creaRuolo("temp2", ["api::utente.utente.find"])
    
    /** Creates a new user and save it to the database */
    await strapi.plugins["users-permissions"].services.user.add({
      ...mockUserData,
      role:idRuolo
    });
  
    await request(strapi.server.httpServer) // app server is an instance of Class: http.Server
    .post("/api/auth/local")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .send({
      identifier: mockUserData.email,
      password: mockUserData.password,
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .then(async(data) => {
        let jwt = data.body.jwt
        expect(jwt).toBeDefined();
        await request(strapi.server.httpServer) // app server is an instance of Class: http.Server
        .get("/api/utenti")
        .set("accept", "application/json")
        .set("Content-Type", "application/json")
        .set('Authorization', 'Bearer ' + jwt)
        .expect("Content-Type", /json/)
        .expect(200)
        .then((data) => {
            expect(data.body).toBeDefined();
            console.log(data.body)
        });
    });
  });