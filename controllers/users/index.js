const 

/*BASIC MODULES*/
    express = require('express'),
    app = express(),

/*CRYPTOGRAPHY MODULES*/
    crypto = require('crypto'),

/*DATABASE MODULES*/
 
    mysqlConnection = require('../../models/database/SQL/connect.js')[0],
    mongoose = require('mongoose'),
    users = require('../../models/database/MongoDB/Schema/users.js'),

/*HELPERS MODULES*/
 
    helpers = require('../../helpers/function.js'),
    locals = require('../../helpers/locals'),
    message = locals[0]




class usersController 
{


/*AUTHENTICATION*/
/**********************************************************************************************************************************/

async register( request, response, next )
{ try {

    /*MongoDB*/
    const { name, email, password } = request.body, required = Boolean( name  &&  email  &&  password )
        
    if( required )
    {
        if( typeof helpers.EmailValidator( email ) == typeof Boolean() )
        {
            users.findOne( { email : email } ).then( async ( User ) =>
            {
                if( !Boolean( User ) )
                {
                    var user = await new users ( { name, email } )
                    await user.passwordHash( password, user )
                    response.status(200).send( { success : message.RegisterSuccess } )  
                } 
                
                else

                response.send( { errors : message.RegisterError } )
            } ) 
        } 
        
        else

        response.send( { errors : helpers.EmailValidator( email ) } )
    }
    
    else
    
    response.send( { errors : message.RegisterError } )
    

    /*SQL
    const
        { name, email, password } = request.body,   
        salt = crypto.randomBytes(16).toString('hex'),
        required = [ `${name}`, `${email}`, `${helpers.crypto( password, salt )}`, `${salt}` ]

    if( Boolean( required ) )
    {
        mysqlConnection.query( app.locals.sql.registerSelect, email, ( error, user, fields ) =>
        {
            if ( user == '' )
            {   
                mysqlConnection.query( app.locals.sql.registerInsert, required, ( error, user, fields ) =>
                { 
                    mysqlConnection.end()
                    response.send( { success : app.locals.message.registerSuccessMessage } )
                } )
            }
            else
                { errors( response ) }
        } )
    }
    else
        { errors( response ) }

    function errors( response ) { response.send( { errors : app.locals.message.registerErrorMessage } ) }
    */

} catch ( error ) {}  }  




async login( request, response, next )
{ try {
    
    /*MongoDB*/
    const { email, password } = request.body, required = Boolean( email  &&  password )
       
    if( required )

        users.findOne( { email } ).then( async ( User ) => 
        {
            if( Boolean( User ) )
            {
                const 
                    user = new users,
                    verify = user.verify( password, User )

                if( Boolean( verify ) )
                {
                    request.user = User
                    User.sessionStore( request, response )
                }
            
                else    
            
                    response.status(200).send( { errors : message.LoginError } )
            }

            else

            response.send( { errors : message.LoginError } )
        })

    else
        
    response.send( { errors : message.LoginError } )


    /*SQL
    const { email, password } = request.body

    if( email  &&  password )
        { return await validate( app.locals.sql.loginUsers, email, password, false ) }
    else    
        { errors( response ) } 
        
    function validate ( sql, email, password, Continue )
    {
        mysqlConnection.query( sql, email, ( error, objectUser, fields ) =>
        { 
            if( !error  &&  objectUser[0] != undefined )
            {
                let user = objectUser[0]

                if( user.email == email  &&  user.password == helpers.crypto( password, user.salt ) )
                { 
                    request.user = user
                    return next() 
                }
            } 
    
            if( Continue ) 
                { errors( response ) } 
            else 
                { validate( app.locals.sql.loginAdministrators, email, password, true ) }

        } ) 
    } 

    function errors( response ) { response.send( { errors : app.locals.message.loginErrorMessage } ) }
    */

} catch ( error ) {}  }  




/*PASSWORD RECOVERY*/
/**********************************************************************************************************************************/

async recovery( request, response, next )
{ try {

    /*MongoDB*/
    const { email } = request.body, recovery = new Date().getTime() + 1000 * 60 * 60 * 24 * 2

    if( typeof helpers.EmailValidator( email ) == typeof Boolean() )
    {
        users.findOne( { email } ).then( async ( User ) => 
        {
            if( Boolean( User ) )
            {
                await User.recover( User, recovery )
                response.send( { warning : message.RecoveryWarning, recovery } )
            }

            else

            response.send( { errors : message.RecoveryError[0] } )

        } )
    }
    
    else
    
    response.send( { errors : helpers.EmailValidator( email ) } )
    
    /* SQL
    const
        { email } = request.body,
        recovery = new Date().getTime() + 1000 * 60 * 60 * 24 * 2,
        required = [ recovery, `${email}` ]

    mysqlConnection.query( app.locals.sql.recoverSelect, email, ( error, ObjectUser, fields ) =>
    {
        let user = ObjectUser[0]
   
        if( user != undefined)
        {
            mysqlConnection.query( app.locals.sql.recoverUpdate, required, ( error, update, fields) =>
                { response.send( { warning : app.locals.message.recoverWarningMessage, recovery : recovery } ) } )
        }
        else if ( user == undefined )
            { response.send( { errors : app.locals.message.recoverErrorMessage } ) }
    } )
    */

} catch ( error ) {}  } 




async newPassword( request, response, next )
{ try {

    /*MongoDB*/
    const { recovery, email, password } = request.body

    users.findOne( { email, recovery } ).then( async ( User ) =>
    {
        if( Boolean( User ) )
        {
            if( parseInt( User.recovery ) > new Date().getTime() )
            {
                await User.unsetRecover( User, password )
                response.send( { success : message.RecoverySuccess } )
            }

            else

            response.send( { erros :  message.RecoveryError[2] } )
        }

        else
        
        response.send( { erros :  message.RecoveryError[1] } )
    } )


    /*SQL
    const 
        { recovery, email, password } = request.body,
        required = [ `${email}`, recovery ]

    mysqlConnection.query( app.locals.sql.newPasswordSelect, required, ( error, ObjectUser, fields ) =>
    {
        let user = ObjectUser[0]
        
        if( user != undefined )
        {
            if( parseInt( user.recovery ) > new Date().getTime() )
            {
                mysqlConnection.query( app.locals.sql.newPasswordUpdate, [ `${helpers.crypto( password, user.salt )}`, ...required ], ( error, update, fields ) =>
                    { response.send( { success : app.locals.message.newPasswordSuccessMessage } ) } )
            }
            else
                { response.send( { errors : app.locals.message.newPasswordErrorMessage_01 } ) }
        }
        else
            { response.send( { errors : app.locals.message.newPasswordErrorMessage_02 } ) }
    } )
    */

} catch (error) {}  } 




/*ACCOUNT*/
/**********************************************************************************************************************************/

async show( request, response, next )
{ try{

    /*MongoDB*/
    const { body, session } = request, { user } = session, { _id } = user
    
    users.findById( _id ).then( ( User ) =>
    {
        response.render( `account/index.ejs`, { User } ) 
    })
    
} catch ( error ) {} }




async update( request, response, next )
{ try {
    
    /*MongoDB*/
    const { body, session } = request, { user } = session, { _id } = user, update = {}, keys = []

    users.findById( _id ).then( async ( User ) =>
    {
        for( const Key in body ) { Boolean( body[Key] )  ?  update[Key] = body[Key]  :  keys.push(Key) }
        for( const key in update ) { key == 'password'  ?  User[key] = await User.passwordHash( update[key], User )  :  User[key] = body[key] }
        User.save()
        User.sessionUpdate( request, response, User )
    })


    /*SQL
    const 
        { body } = request,
        { user } = request.session,
        { email, salt } = user
    let
        sql = `UPDATE users SET `,
        required = String()

    for( const key in body ) 
    { 
        if( key == 'password' ) 
        {
            sql += `${key}=?,`
            required += `${helpers.crypto( body[key], salt )},`
        }
        if( key != 'password' ) 
        {
            sql += `${key}=?,`
            required += `${body[key]},`
        }   
    }
        
    sql += `updatedAt=NOW() WHERE email=?`
    required = ( required + email ).split(',')

    await mysqlConnection.query( sql, required, ( error, updates, fields) => 
    { 
        mysqlConnection.query( app.locals.sql.accountUpdateSelect, `${body.email}`, ( error, updated, fields ) =>
        {
            request.updated = updated[0]
            next ()
        } )
    } )
    */

} catch( error ) {} } 




async delete( request, response, next )
{ try {

    /*MongoDB*/
    const { session } = request, { user } = session, { _id } = user 

    users.findById( _id ).then( async ( User ) =>
    {
        await User.accountDelete( User )
        User.sessionLogout( request, response )
    } )    
         

    /*SQL
    const 
        { user } = request.session.user,
        { email } = user        

    mysqlConnection.query( accountDeleteDelete, email, ( error, deleted, fields ) =>
    {
        user.destroy( error =>
            { response.redirect( `/login` ) })
    } )
    */

} catch( error ) {} } 




async comments( request, response, next )
{ try {

    const 
    { body, comments } = request,
    { method, ref } = body,
    { user } = request.session
        

    if( comments )
    {
        const { userId, productId, stars, comment } = comments

        if( Boolean( userId, productId, stars, comment ) )
        {
            mysqlConnection.query( accountCommentsCreate, required, ( error, coments, fields ) =>
            {
                response.send( { success : commentsSuccessMessage_01 } )
            } )
        }


        await mysqlConnection.query( accountCommentsSelectAll, required, ( error, allComments, fields ) =>
        {

            if( !Boolean( ref ) )
            {
                allComments  ?  response.render( `account/comments`, { errors:null, warning:null, success:null, allComments } )  :  response.render('account/comments', { errors:commentsErrorMessage, warning:null, success:null, allComments:null } ) 
            }


            if( request.method == `POST` )
            {   
                if( method == `update` )
                {
                    var
                        update = new Object(),
                        keys = new Array()

                    for( const key in body ) { Boolean(body[key])  ?  update[key] = body[key]  :  keys.push(key) }

                    mysqlConnection.query( accountCommentsUpdate, required, ( error, updated, fields ) =>
                    {
                        if( Boolean( updated ) )
                            { response.send( { update : commentsSuccessMessage_01 } ) }
                        else
                            { response.send( { errors : commentsErrorMessage } ) }
                    } )
                }

                
                if( method == `delete` )
                {
                    mysqlConnection.query( accountCommentsDelete, required, ( error, updated, fields ) =>
                    {
                        if( Boolean( updated ) )
                            { response.send( { update : commentsSuccessMessage_02 } ) }
                        else
                            { response.send( { errors : commentsErrorMessage } ) }
                    } )
                }
            }

        } )
    }

} catch (error) {} }


}
 



/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = usersController