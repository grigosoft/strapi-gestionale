module.exports = {
    inserisci_auth_utente_in_params(ctx, data = ctx.request.body.data) {
            let richiedente;

            if(ctx.state.user != null) {
                richiedente = ctx.state.user.id ;    
                data["dipendente"] = richiedente;
            }else if(ctx.state.auth != null){
                richiedente=ctx.state.auth.credentials.name
                data["token"] = richiedente;
            } 
    }
};