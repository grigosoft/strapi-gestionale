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

module.exports = { creaRuolo };