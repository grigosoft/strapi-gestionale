// @ts-ignore
const fs = require('fs');
const { setupStrapi, cleanupStrapi } = require("./helpers/strapi");


// @ts-ignore
beforeAll(async () => {
  await setupStrapi();
  // let permissions = await strapi.entityService.findMany("plugin::users-permissions.permission",{populate:"*"});
  // console.log(permissions)
  // let roles = await strapi.entityService.findMany("plugin::users-permissions.role",{populate:"*"});
  // console.log(roles)
  // creaRuolo("temp","authenticated", ["api::utente.utente.find"])
});

// @ts-ignore
afterAll(async () => {
  await cleanupStrapi();
});

// @ts-ignore
it("strapi is defined", async() => {
  // @ts-ignore
  expect(strapi).toBeDefined();
});

require("./preventivo/test|preventivo")