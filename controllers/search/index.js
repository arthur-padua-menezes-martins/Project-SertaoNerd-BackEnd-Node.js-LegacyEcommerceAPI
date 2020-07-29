const { populate } = require("../../models/database/MongoDB/Schema/users.js")
const { reference } = require("../../helpers/function.js")

const

/*BASIC MODULES*/
    express = require(`express`),
    app = express(),

/*CRYPTOGRAPHY MODULES*/
    crypto = require(`crypto`),

/*DATABASE MODULES*/
    mysqlConnection = require(`../../models/database/SQL/connect.js`)[0],
    mongoose = require(`mongoose`),
    users = require(`../../models/database/MongoDB/Schema/users.js`),
    categories = require(`../../models/database/MongoDB/Schema/categories.js`),
    products = require(`../../models/database/MongoDB/Schema/products.js`),

/*HELPERS MODULES*/
    helpers = require(`../../helpers/function.js`),
    locals = require(`../../helpers/locals.js`),
    method = locals[1]




class searchController 
{


async search( request, response, next )
{ try {

    const { body, params, session } = request
    let 
        search = new RegExp( params.search, `i` ),
        query = { $or : [ { 'title' : { $regex : search } }, { 'description' : { $regex : search } } ] },
        error = new Error()

    products.paginate( query, { populate : `categories` } ).then( ( Products ) =>
    {
        if( Boolean( Products ) )
        {
            response.send( { Products } )
        }
     })

} catch ( error ) { console.error( error ) } }





async showProducts( request, response, next )   
{ try {

    const  { body, params, session } = request
    let error = new Error()


    if( request.method == `GET` )
    {

        let 
            Categories = await getCategories( { name : params.categories } ),
            destructing = await helpers.queryConstructor( params.name, params.reference ),
            { name, reference } = destructing
        const 
            query = name && reference  ?  { categories : Categories._id, name : name, reference : reference }  :  { categories : Categories._id, name : name },
            populate = { populate : ( { path : `categories`, select : `name code availability` } ) }

        
        products.paginate( query, { ...populate } ).then( ( Products ) => 
        {
           response.send( Products ) 
        })
        
    }

    if( request.method == `POST` )
    {

        let 
            query = { product, categories, availability : true }, { page, sortType } = body,
            offset = Boolean( page )  ?  page == 1  ?  0  :  30 * parseInt( page - 1 )  :  0, limit = 30
            
        if( Boolean( sortType ) )
        sortType = await getSort( sortType )

        
        products.paginate( query, { offset, limit, sort : sortType, populate : `categories` } ).then( ( Products ) => 
        {                                                                           //[ `categories`, `assessments`, `variations` ]
            if( Boolean( Products ) )
            {
                response.send( { Products } )
            }
        })  

    }

    async function getCategories ( search )
    {
        return categories.find( search ).then( ( Categories ) => { return Categories[0] } )
    }

    async function getSort( sortType )
    {
        switch( sortType )
        {
            case `a-z` :
                return { titulo : 1 }
            break

            case `z-a` :
                return { titulo : 0 }
            break

            case `biggest-value` :
                return { value : 1 }
            break

            case `lowest-value` :
                return { value : 0 }
            break

            default:
                return {}
        }
    }

} catch ( error ) { console.error( error ) } }


/*

let error = new Error()
method.Error404( error, next )





async page404( request, response, next ) { response.render( `search/404.ejs` ) }
*/

/*
async products( request, response, next )
{ try {

    if( request.method == `GET` )
    {
        const 
            { params } = request,
            { product, categories, reference } = params

        if( product  &&  !categories  &&  !reference )   
            { select( params, 3, 0 ) }


        if( product  &&  categories  &&  !reference )
            { select( params, 3, 0 ) } 


        if( product  &&  categories  &&  reference )
            { select( params, 1, 0 ) } 

            
        function select( iterator, limit, offset )
        {
            let [ sql, required ] = helpers.searchSqlConstructor( iterator ),
            count = `SELECT COUNT(*) AS `count` FROM products WHERE ${sql}`                
            sql = `SELECT * FROM products INNER JOIN variations ON products.id = variations.productId AND ${sql} LIMIT ? OFFSET ?`

            mysqlConnection.query( count, required, ( error, pages, fields ) =>
            {
                mysqlConnection.query( sql, [ ...required, limit, offset ], ( error, products, fields ) =>
                    { !error  ?  response.render( `search/search.ejs`, { products, product, categories, reference, pages : Math.ceil( pages[0][`count`] / 3 ), session : request.session.user } )  :  next() } )
            })
        }     
    }


    if( request.method == `POST` )
    {
        const 
            { body } = request,
            { product, categories, reference, pages, filter, productId, userId, stars, comment } = body,
            offset  =  pages != 1  ?  3 * parseInt( pages - 1 )  :  0,
            order = filter  ?  `variations.${ filter.split(`-`)[0] } ${ filter.split(`-`)[1] }`  :  null

        if( productId  &&  userId  &&  stars  &&  comment )
        { 
            request.comments = { productId, userId, stars, comment }
            next()  
        }
        if( empty(pages)  &&  empty(filter) )
        { 
            request.comments = {}
            next() 
        }
        

        if( product  &&  empty(categories)  &&  empty(reference)  &&  empty(filter) ) 
            { pagination( body, 3, offset ) }
        if( product  &&  empty(categories)  &&  empty(reference)  &&  filter ) 
            { pagination( body, 3, offset, order ) }


        if( product  &&  categories  &&  empty(reference)  &&  empty(filter) ) 
            { pagination( body, 3, offset ) }
        if( product  &&  categories  &&  empty(reference)  &&  filter ) 
            { pagination( body, 3, offset, order ) }


        function pagination( iterator, limit, offset, order = ` )
        {
            let [ sql, required ] = helpers.searchSqlConstructor( iterator )
                
            if( empty(order) )
                sql = `SELECT * FROM products INNER JOIN variations ON products.id = variations.productId AND ${sql} LIMIT ? OFFSET ?` 
            else
                sql = `SELECT * FROM products INNER JOIN variations ON products.id = variations.productId AND ${sql} ORDER BY ${order} LIMIT ? OFFSET ?` 
            
            mysqlConnection.query( sql, [ ...required, limit, offset ], ( error, products, fields ) =>
                { !error  ?  response.send( products )  :  response.status(204) } )
        }
    }
  
    function empty( reference ) 
        { return reference == `  ?  true  :  false }

} catch ( error ) { console.error( error ) } }
*/

}




/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = searchController