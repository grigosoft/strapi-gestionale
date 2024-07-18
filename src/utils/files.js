module.exports = {
    /**
     * 
     * @param {*} string_request |=> dove vado a prendere questi files, ex: "api::preventivo.preventivo"
     * @param {*} id |=> id del record
     */
    //TODO: clean up this code !!!!!
    async get_all_files(string_request, id) {
        if(typeof(string_request) == "string" && typeof(id) == "number") {
            // @ts-ignore
            const result = await strapi.service("api::preventivo.preventivo").findOne(id, {populate: 'linee'});
            console.log(result);
            let files = [];

            
            for (let i = 0; i < result.linee.length; i++) {
                const id = result.linee[i].id;
                let prev_linee = await strapi.entityService.findOne("api::preventivo-linea.preventivo-linea", id, {populate: ["personalizzazione.files", "personalizzazione.soggetti", "personalizzazione.soggetti.files"]})

                if(prev_linee.personalizzazione != null )
                {
                    if(prev_linee.personalizzazione.files.length != 0 )
                    {
                        for(let j = 0; j < prev_linee.personalizzazione.files.length; j++)
                        {
                            let found ;
                            for (let k = 0; k < prev_linee.personalizzazione.files.length; k++) {
                                if(prev_linee.personalizzazione.files[k].id === prev_linee.personalizzazione.files[k].id)
                                {
                                    let found = true;
                                }
                            }
                            
                            if(!found)
                            {
                                files.push(prev_linee.personalizzazione.files[j]);
                            }
                        }
                    }
                    if(prev_linee.personalizzazione.soggetti != null)
                    {
                        for(let i = 0; i < prev_linee.personalizzazione.soggetti.length; i++)
                        {
                            if(prev_linee.personalizzazione.soggetti[i].files.length != 0)
                            {
                                console.log(id)
                                if(prev_linee.personalizzazione.soggetti[i].files.length != 0)
                                {
                                    /*
                                    for(let j = 0; j < prev_linee.personalizzazione.soggetti[i].files.length; j++)
                                    {
                                        const found = prev_linee.personalizzazione.soggetti[i].files.find(element => element.id === prev_linee.personalizzazione.soggetti[i].files[j].id);
                                        console.log(found);
                                        if(found === undefined)
                                        {
                                            files.push(prev_linee.personalizzazione.soggetti[i].files[j]);
                                        }
                                        else
                                        {
                                            console.log("elemento già presente");
                                        }
                                    }*/
                                    let found;
                                    for(let j = 0; j < prev_linee.personalizzazione.soggetti[i].files.length; j++)
                                    {
                                        for(let k = 0; k < files.length; k++)
                                        {
                                            if(files[k].id === prev_linee.personalizzazione.soggetti[i].files[j].id)
                                            {
                                                found = true;
                                            }
                                        }
                                        if(!found)
                                        {
                                            files.push(prev_linee.personalizzazione.soggetti[i].files[j]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                //find((var) => var.id === elemento.id))
                console.log(files);
            }
            return files;
        }
    }
}
