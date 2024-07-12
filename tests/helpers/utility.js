const request = require("supertest");

/**
 * 
 * @param {*} nome 
 * @param {*} listaPermessi es: ["plugin::users-permissions.auth.changePassword"]
 */
async function creaRuolo(nome, listaPermessi) {
    let role = await strapi.entityService.create("plugin::users-permissions.role",
            {data:{
                name:nome,
                type:nome.toLowerCase()
            }});
    // console.log(role)

    for(let indicePermesso in listaPermessi){
        await strapi.entityService.create("plugin::users-permissions.permission",
            {data:{
                action:listaPermessi[indicePermesso],
                role:role
            }});
    }
    console.log(await strapi.entityService.findMany("plugin::users-permissions.role",{populate:"*",filters:{role:{"eq$":role.id}}}));
  // console.log(roles)
    return role.id
}

async function getRuolo(nome){
    let roles = await strapi.entityService.findMany("plugin::users-permissions.role",{populate:"*",filters:{role:{"eq$":nome}}});
    return roles[0].id
}

async function creaUtente(userdata, idRuolo)
{
  /** Creates a new user and save it to the database */
  return await strapi.plugins["users-permissions"].services.user.add({
    ...userdata,
    role: idRuolo
  });
}


async function login(mail, password, expectedStatus = 200) 
{
  let response = await request(strapi.server.httpServer) // app server is an instance of Class: http.Server
  .post("/api/auth/local")
  .set("accept", "application/json")
  .set("Content-Type", "application/json")
  .send({
    identifier: mail,
    password: password,
  })
  .expect("Content-Type", /json/)
  .expect(expectedStatus)
  .then(async(data) => {
      let jwt = data.body.jwt
      return jwt;
    });
    
    return response;
}


module.exports = { creaRuolo , getRuolo, creaUtente, login};