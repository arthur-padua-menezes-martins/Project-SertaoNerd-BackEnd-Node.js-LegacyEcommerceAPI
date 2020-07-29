const

/*BASIC MODULES*/
    express = require(`express`),
    app = express(),

/*DATABASE MODULES*/ 
    mysqlConnection = require(`../../models/database/SQL/connect.js`)[0],
    mongoose = require(`mongoose`),
    users = require(`../../models/database/MongoDB/Schema/users.js`),

/*HELPERS MODULES*/
    helpers = require(`../../helpers/function.js`),
    locals = require(`../../helpers/locals.js`),
    method = locals[1]




class sessionsController
{


async check ( request, response, next )
{
    let { user } = request.session, { baseUrl } = request, error = new Error() 

    if( Boolean( user ) )
    {
        users.findById( user._id ).then( ( User ) =>
        {
            if( Boolean( User ) )
            {
                if( baseUrl == `/adm` )

                    return validation( User )  ?  next()  :  method.Error401( error, next )
                
                else
                
                    next() 
            }
            
            else
            
                method.Error401( error, next )
            
        })
    }
    
    else
    
        method.Error401( error, next )
    
    function validation( User ) { return User.hierarchy == 1  ?  true  :  false }
}




async logout( request, response, next )
{
    const { session } = request

    session.destroy( error => { response.redirect( `/login` ) } )
}


}




/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = sessionsController