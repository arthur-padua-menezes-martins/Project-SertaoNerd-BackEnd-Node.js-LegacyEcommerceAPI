

/*BASIC MODULES*/
const express = require('express')
const app = express()

/*AUTHENTICATION MODULES*/
const expressSession = require('express-session')




class sessionsController
{


check ( request, response, next )
{
    const { user } = request.session
    
    if( !user  &&  !validation() )  
        app.locals.errorMessage[0]( response )
    else    
        next ()

    function validation() { return  request.session.user  &&  request.session.user.hierarchy  ?  true  :  false  }
}




store( request, response, next )
{
    const { user } = request
    
    request.session.user = user
    request.session.save()
    app.locals.success[0]( response )
}




update ( request, response, next )
{
    const { update } = request
    const { user } = request.session
    
    if(user)
    {
        for (const key in update) { user[key] = update[key] }
        app.locals.success[1]( response )
    }
    else
        app.locals.error[0]( response )
}




logout( request, response, next )
{
    request.session.destroy( error => 
    {
        if(!error)
            { app.locals.success[2]( response ) } 
        else
            { app.locals.error[1]( response ) } 
    })
}


}




/*GLOBAL*/
app.locals.errorMessage = new Array
(
    `falha na autenticação`,
    `falha na atualização`,
    `falha ao finalizar a sessão, tente novamente`
)

app.locals.warningMessage = new Array
(
    
)

app.locals.successMessage = new Array
(
    `login realizado com sucesso`,
    `atualização bem sucedida`,
    `sessão finalizada com sucesso`
)


app.locals.error = new Array
(
    ( response ) => { response.render( `account/update`, { errors : app.locals.errorMessage[1], success : null, token : null } ) },
    ( response ) => { response.render( `login`, { errors : errorMessage[2], success: null, token : null } ) }
)

app.locals.success = new Array
(
    ( response ) => { response.render( `login`, { errors : null, success : app.locals.successMessage[0], token : null } ) },
    ( response ) => { response.render( `account/update`, { errors : null, success : app.locals.successMessage[1], token : null } ) },
    ( response ) => { response.render( `login`, { errors : null, success: app.locals.successMessage[2], token : null } ) }
)




/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = sessionsController