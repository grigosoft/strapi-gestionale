const Strapi = require("@strapi/strapi");
const fs = require("fs");

let instance;

async function setupStrapi() {
    if (!instance) {
        // @ts-ignore
        await Strapi().load();
        instance = strapi;
        await instance.server.mount();
    }
    return instance;
}

async function cleanupStrapi() {
    const dbSettings = strapi.config.get("database.connection");

    //close server to release the db-file
    await strapi.server.httpServer.close();

    // close the connection to the database before deletion
    await strapi.db.connection.destroy();

    //delete test database after all tests have completed
    // @ts-ignore
    if (dbSettings && dbSettings.connection && dbSettings.connection.filename) {
        // @ts-ignore
        const tmpDbFile = dbSettings.connection.filename;
        if (fs.existsSync(tmpDbFile)) {
            fs.unlinkSync(tmpDbFile);
        }
    }
}

module.exports = { setupStrapi, cleanupStrapi };