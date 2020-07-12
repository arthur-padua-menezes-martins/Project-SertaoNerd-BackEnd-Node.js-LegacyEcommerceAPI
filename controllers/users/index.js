

/*BASIC MODULES*/
const express = require('express')
const app = express()

/*CRYPTOGRAPHY MODULES*/
const crypto = require('crypto')

/*DATABASE MODULES*/
const define = require('../../models/database/define/define.js')

//TODO
// reconfigurar a rota delete para quando o cliente desejar remover sua conta remova somente seu login e senha de usuário mantento os demais dados de pedidos




class usersController 
{


/*AUTHENTICATION*/
/**********************************************************************************************************************************/

login( request, response, next )
{
    const { email, password } = request.body

    if( email != ''  &&  password != '' )
    {
        define[1].findOne( { where : { email } } ).then( (user) =>
        {
            if(user == undefined)
            { 
                define[0].findOne( { where : { email } } ).then( (user) =>
                {
                    if(user == undefined) 
                        app.locals.error[0]( response )
                    else 
                    { 
                        if(user.password != crypto.pbkdf2Sync( password, user.salt, 8, 256, 'sha512' ).toString('hex') )
                            app.locals.error[0]( response )
                        else
                        { 
                            request.user = user
                            next() 
                        }
                    }
                })        
            }
            else
            {
                if(user.password != crypto.pbkdf2Sync( password, user.salt, 8, 256, 'sha512' ).toString('hex') )
                    app.locals.error[0]( response )
                else
                { 
                    request.user = user
                    next() 
                }
            }
        })
    }
    else
        app.locals.error[0]( response )
}




async register( request, response, next )
{   
    const { name, email, password } = request.body

    if( name && email && password )
    { 
        define[0].findOne({ where : { email } }).then( (user) => 
        {
            if( user == undefined ) 
            {
                define[0].create({ name, email, password }).then( () => 
                    { app.locals.success[0]( response ) } )
            }
            else
                app.locals.error[1]( response )
        }) 
    }
    else
        app.locals.error[2]( response )
} 




/*PASSWORD RECOVERY*/
/**********************************************************************************************************************************/

async recover( request, response, next )
{
    const { email } = request.body
    
    define[0].findOne({ where: { email } }).then( (user) =>
    {
        if(user != undefined)
        { 
            user.update( new Object ( { recovery : ( new Date().getTime() + 1728 * 100000 ) } ) )
            request.user = user
            next()
        }
        else
            { app.locals.error[3] }
    }).catch( (error) => { app.locals.error[4] } ) 
}




async showNewPassword( request, response, next )
{
    const { user } = request  

    if(!user) 
        { app.locals.error[3] } 

    if( parseInt(user.recovery) > new Date().getTime() )  
        { app.locals.warning[0] }

    else
    {
        await user.update( new Object ( { recovery : null } ) )
        app.locals.error[5]
    }
} 




async newPassword( request, response, next )
{
    const { email, password } = request.body
        
    define[0].findOne({ where : { email } }).then( (user) =>
    {
        if(user == undefined)
            { app.locals.error[6] }

        if(user.recovery && parseInt(user.recovery) > new Date().getTime() )
        {
            user.update( new Object ( { password : crypto.pbkdf2Sync( password, user.salt, 8, 256, 'sha512' ).toString('hex'), recovery : null } ) )
            app.locals.success[1]
        }
        else
        {
            user.update( new Object ( { recovery : null } ) )
            app.locals.error[7]
        }
    }).catch( (error) => { app.locals.error[6] } ) 
}




/*ACCOUNT*/
/**********************************************************************************************************************************/

index( request, response, next )
    { response.render( `account` ) }




update( request, response, next )
{
    const { email } = request.session.user
    var update = new Object()
    var keys = new Array( 'createdAt', 'updatedAt' )

    for( const key in request.body ) { request.body[key]  ?  update[key] = request.body[key]  :  keys.push(key) }

    define[0].findOne( { where: { email }, attributes: { exclude : keys } } ).then( (user) => 
    {
        if(update['password']) 
            { update['password'] = crypto.pbkdf2Sync( update['password'], user.salt, 8, 256, 'sha512' ).toString('hex') }
            
        user.update( update ) 
        request.update = update
        next ()

    }) 
} 




async delete( request, response, next )
{
    const { email } = request.session.user

    define[0].destroy( { where: { email } } ).then( (success) => 
    {
        if(success != undefined) 
        { 
            request.session.destroy( error =>  
                { app.locals.success[2] })
        }
    }) 
}




comments( request, response, next )
{
    if(request.comments != undefined )
    {
        const { userId, productId, stars, comment } = request.comments

        if( userId  &&  productId  &&  stars  &&  comment )
        {
            define[3].create({ userId, productId, stars, comment }).then( (success) => 
            { 
                response.send({ success : app.locals.successMessage[3] } ) 
            }).catch( (error) => { next() } )
        }
        else
            { response.send({ error : app.locals.errorMessage[7] }) }
    }
    else
    {
        response.send('oi')
    }
}


}




/*GLOBAL*/
app.locals.errorMessage = new Array
(
    `dados de autenticação inválidos`,
    `não é possivel gerar uma autenticação válida com os dados fornecidos, por favor tente novamente com outras informações`,
    `não é possivel gerar uma autenticação válida com os dados fornecidos, por favor preencha todos os campos`, 
    `e-mail de recuperação de senha não cadastrado`, 
    `o período para redefinição de senha expirou, requisite um novo`,
    `seu período para redefinição de senha expirou, requisite um novo`,
    `os dados informados não pertencem a nenhuma autenticação válida`, 
    `preencha todos os campos`
)

app.locals.warningMessage = new Array
(
    `você poderá redefinir sua senha em até 48 horas`
)

app.locals.successMessage = new Array
(
    `cadastro realizado com sucesso`,
    `senha alterada com sucesso, realize o login novamente`,
    `usuário deletado com sucesso`,
    `comentário inserido com sucesso`
)


app.locals.error = new Array
(
    ( response ) => { response.render( `login`, { errors : app.locals.errorMessage[0], success : null , token : null } ) },
    ( response ) => { response.render( `register`, { errors : app.locals.errorMessage[1], success : null } ) },
    ( response ) => { response.render( `register`, { errors : app.locals.errorMessage[2], success : null } ) },
    ( response ) => { response.render( `recovery`, { errors : app.locals.errorMessage[3] } ) },
    ( response ) => { response.render( `recovery`, { errors : app.locals.errorMessage[4], success : null } ) },
    ( response ) => { response.render( `recovery`, { errors : app.locals.errorMessage[5], success : null } ) },
    ( response ) => { response.render( `recovery/store`, { errors : app.locals.errorMessage[6], warning : null, success : null } ) },
    ( response ) => { response.render( `recovery/store`, { errors : app.locals.errorMessage[5], warning : null, success : null } ) }
)

app.locals.warning = new Array
(
    ( response ) => { response.render( `recovery/store`, { errors : null, warning : app.locals.warningMessage[0], success : null } ) },
)

app.locals.success = new Array
(
    ( response ) => { response.render( `register`, { errors : null, success : app.locals.successMessage[0] } ) },
    ( response ) => { response.render( `login`, { errors : null, success: app.locals.successMessage[1], token : null } ) },
    ( response ) => { response.render( `login`, { errors : null, success : app.locals.successMessage[2], token : null } ) }
)


 

/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = usersController