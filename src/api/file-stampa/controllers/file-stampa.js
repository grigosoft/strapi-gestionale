'use strict';

/**
 * file-stampa controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { mkdir,copyFile, unlink, readdir } = require('fs/promises');
const { join } = require('path');
const DESTINAZIONE_UPLOAD = join(process.cwd(), "private","upload")
const APPENA_ARRIVATI = join(process.cwd(), "private","appena-arrivati")
const DESTINAZIONE_ARCHIVIO = "private/archivio/{cliente}/{anno}/{ordine}"


// module.exports = createCoreController('api::file-stampa.file-stampa');
module.exports = createCoreController('api::file-stampa.file-stampa',
({strapi})=>({
    /**
     * 
     * */
  async create(ctx) {
    let files = ctx.request.files;
    let props = Object.keys(files)
    // decodifico parametri
    // console.log(ctx.request.body)
    let data = ctx.request.body.data
    // console.log(data)
    if(typeof data === "string")
        data = JSON.parse(data)
    // assicurarsi che sia un file solo
    if( props && props.length!=1){
        // errore, 
        ctx.body = "assicurarsi di caricare 1 file"
        return
    }
    // assicurarsi che sia assegnato ad un utente
    if(!("utente" in data)){
        // errore, 
        ctx.body = "assicurarsi di assegnare un utente"
        return
    }
        
    let file = files[props[0]]
     // verificare se è nella cartella appena arrivati e spostarlo e basta ( mettere un parmetro da passare? )
     // in quel caso non deve essere caricato nessun file
    // console.log(ctx.request.query)
    // console.log(ctx.request.body)
    
    // console.log(ctx.request.files)
    // console.log(file)
    
    

    try {
        let destinazione_cartella = join(DESTINAZIONE_UPLOAD, data.utente.toString())
        let destinazione_file = join(destinazione_cartella, file.name)
        // creo le cartelle 
        console.log("creo le cartelle")
        await mkdir(destinazione_cartella,{recursive:true})
        // sposto il file 
        console.log("sposto il file")
        await copyFile(file.path, destinazione_file)
        console.log("elimino il file temporaneo")
        // await unlink(file.path)
        // file written successfully
        // aggiorno parametro "urlFileOriginale"
        
        data["urlFileOriginale"] = destinazione_file
        console.log(ctx.request.body)
        ctx.request.body.data = JSON.stringify(data)
        console.log(ctx.request.body)
        console.log(ctx.request.body.data)
        // creare l'anteprima
        //
        console.log("salvo a DB")
        let response = await super.create(ctx);
        await unlink(file.path)
        // console.log(response)
        return response
      } catch (err) {
        console.error(err);
        ctx.body = err
      }
    },
    // FIXME non passa da route: sembra non trovare il path "/api/file-stampa/appena-arrivati/"
    async elencoAppenaArrivati (ctx){
        console.log(APPENA_ARRIVATI)
        try {
            return await readdir(APPENA_ARRIVATI)
        } catch (err) {
            console.error(err);
            return  err
        }
    }
}));
