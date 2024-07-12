const request = require('supertest');
const { creaRuolo , creaUtente, login } = require("../helpers/utility");

// user mock data
const mockUserData = {
    username: "tester",
    email: "tester@strapi.com",
    provider: "local",
    password: "1234abc",
    confirmed: true,
    blocked: null,
  };

it("login ok", async () => {
  let idRuolo = await creaRuolo("temp2", ["api::utente.utente.find"])

  await creaUtente(mockUserData, idRuolo );

  let jwt = await login(mockUserData.email , mockUserData.password);
  expect(jwt).toBeDefined();
  
  console.log(jwt);
});

it ("login fail", async () => {

  let jwt = await login("LUIGI" , mockUserData.password, 400);
  expect(jwt).toBeUndefined();
  console.log(jwt);


})



