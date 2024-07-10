// @ts-ignore
const fs = require('fs');
const { setupStrapi, cleanupStrapi } = require("./helpers/strapi");

// @ts-ignore
beforeAll(async () => {
  await setupStrapi();
});

// @ts-ignore
afterAll(async () => {
  await cleanupStrapi();
});

// @ts-ignore
it("strapi is defined", () => {
  // @ts-ignore
  expect(strapi).toBeDefined();
});