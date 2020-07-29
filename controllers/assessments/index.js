const

/*CRYPTOGRAPHY MODULES*/
    crypto = require(`crypto`),

/*DATABASE MODULES*/
    mongoose = require(`mongoose`),
    products = require(`../../models/database/MongoDB/Schema/products.js`),
    assessments = require(`../../models/database/MongoDB/Schema/assessments.js`),

/*HELPERS MODULES*/
    helpers = require(`../../helpers/function.js`),
    locals = require(`../../helpers/locals`), message = locals[0], method = locals[1]




class Assessments
{

async view( request, response, next )
{

    const { body, params, session } = request, { user } = session
    let error = new Error()

    if( request.method == `GET` )
    {
        const { _id } = params

        if( Boolean( _id ) )
        {
            await assessments.find( { $and : [ { users : user._id }, { _id } ] } ).then( ( Assessments ) =>
            {
                response.send( Assessments )
            }).catch( ( error ) => { method.Error404( error, next ) })
        }
        else
        {
            await assessments.find( { users : user._id } ).then( ( Assessments ) =>
            {
                response.send( Assessments )  
            })
        }
    }
    if( request.method == `POST` )
    {
       
    }
    
    function view ( response, Assessments ) { response.render(`account/assessments/index.ejs`, { Assessments } ) }

}




async create( request, response, next )
{

    const { body, session } = request, { reference, stars, message } = body, { user } = session
    let error = new Error()

    await products.find( { reference } ).then( async ( Product ) =>
    {
        if( helpers.notNull( Product ) )
        {
            let Assessments = await new assessments ( { name : user.name, stars : stars, message : message, users : user._id, products : Product[0]._id } )
            Assessments.save()
            response.send( Assessments )
        }
        else
        {
            method.Error422( error, next )   
        }
    }) 

}




async update( request, response, next )
{

    const { body, session } = request, { _id, stars, message } = body, { user } = session
    let error = new Error()

    if(  helpers.allTrue( [ _id, stars, message ] ) )

        await assessments.find( { $and : [ { users : user._id }, { _id } ] } ).then( ( Assessments ) =>
        {
            if( helpers.notNull( Assessments ) )
            {
                for( const key in body ) { if( key != '_id' ) Assessments[0][key] = body[key] }
                Assessments[0].save()
                response.send( Assessments )
            }
            else
            {
                method.Error422( error, next )   
            }
        }) 
    
    else
        
        method.Error422( error, next ) 

}

}




module.exports = Assessments