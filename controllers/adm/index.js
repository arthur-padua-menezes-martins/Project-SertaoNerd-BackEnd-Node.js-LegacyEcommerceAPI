const

/*CRYPTOGRAPHY MODULES*/
    crypto = require(`crypto`),

/*DATABASE MODULES*/
    mysqlConnection = require(`../../models/database/SQL/connect.js`)[0],
    mongoose = require(`mongoose`),
    users = require(`../../models/database/MongoDB/Schema/users.js`),
    categories = require(`../../models/database/MongoDB/Schema/categories.js`),
    products = require(`../../models/database/MongoDB/Schema/products.js`),
    assessments = require(`../../models/database/MongoDB/Schema/assessments.js`),
    variations = require(`../../models/database/MongoDB/Schema/variations.js`),

/*HELPERS MODULES*/
    helpers = require(`../../helpers/function.js`),
    locals = require(`../../helpers/locals`), message = locals[0], method = locals[1]




class admController 
{


/*SEARCH*/
/**********************************************************************************************************************************/

search( request, response, next ) { response.render( `administrator/search/users` ) }




async searchUsers( request, response, next )
{ try {

    /*MongoDB*/
    const { params } = request, { _id } = params, offset = 0, limit = 30
        
    
    if( Boolean( _id ) )
    {
        users.findById( _id ).then( async ( User ) =>
        {
            if( Boolean( User ) )
            {
                search( response, User )
            }
        })
    }
    else
    {  
        users.paginate( {}, { offset, limit } ).then( ( User ) => 
        {   
            search( response, User.docs )    
        })
    }


    function search ( response, User ) { response.render(`adm/search/users/users.ejs`, { User } ) }


    /*SQL
    const { id } = request.params

    if( id )
    {
        mysqlConnection.query( administratorsSearchUsersSelect, required, ( error, user, fields ) =>
        { searchUsers( response, user ) } )
    }
    else
    {
        mysqlConnection.query( administratorsSearchUsersSelectAll, required, ( error, users, fields ) =>
            { searchUsers( response, users ) } )
    }

    function searchUsers( response, info )
        { return response.render( `administrator/search/users/users.js`, { info } ) }
    */

} catch ( error ) {} }


async searchComments (  request, response, next  )
{

    const { params } = request, { _id } = params, offset = 0, limit = 30

    
    if( Boolean( _id ) )
    {
        assessments.findById( _id ).then( async ( Assessments ) =>
        {
            if( Boolean( Assessments ) )
            {
                search( response, Assessments )
            }
        })
    }
    else
    {
        assessments.paginate( {}, { offset, limit } ).then( ( Assessments ) => 
        {   
            search( response, Assessments.docs )    
        })
    }


    function search ( response, Assessments ) { response.render(`adm/search/assessments/assessments.ejs`, { Assessments } ) }

}


async searchEmail ()
{
    response.render( `adm/search/email/email.js` ) 
}


async searchCategories ()
{
    response.render( `adm/search/categories/categories.js` )
}


async searchProducts ()
{
    response.render( `adm/search/products/products.js` )
}


async searchVariations ()
{
    
    variations



}


/*CONTROL*/
/**********************************************************************************************************************************/

control( request, response, next ) 
{ 
    function newUsersToday ()
    {

    }

    function newUsersInTheMonth ()
    {

    }
}


async controlUsers( request, response, next )
{

    const { body } = request, { page, sort } = body, offset = page == 1  ?  0  :  30 * parseInt( page - 1 )  

    users.paginate( {}, { offset, limit : 30 } ).then( ( User ) => 
    {   
        response.send( User.docs  )  
    })

}


async controlComments( request, response, next ) 
{ 
    
    const { body } = request, { page, sort } = body, offset = page == 1  ?  0  :  30 * parseInt( page - 1 )  

    assessments.paginate( {}, { offset, limit : 30 } ).then( ( Assessments ) => 
    {   
        response.send( Assessments.docs  )    
    })

}


async controlEmail( request, response, next ) 
{ 
    
}


async controlCategories ( request, response, next )
{ try {

    const { body } = request, { _id, reference, name, code, availability, create, view, update, remove } = body
    let keys = []

    if( Boolean( create ) )
        createCategories( response )
    if( Boolean( view ) )
        viewCategories( response )
    if( Boolean( update ) )
        updateCategories( response )
    if( Boolean( remove ) )
        removeCategories( response )

    async function createCategories ( response )
    { try { 

        const Categories = await new categories ( { name, code, availability } )
        await Categories.save()
        response.send( Categories )

    } catch ( error ) { console.error( error ) } }

    
    
    async function viewCategories ( response )
    { try { 

        if( Boolean( _id ) )
        await categories.findById( _id ).populate(`products`).then( ( Categories ) =>
        {
            response.send( Categories )
        } )

        else
        {
            let search = await helpers.viewSearch( body, [ `view` ] )

            await categories.find( { ...search } ).populate(`products`).then( ( Categories ) =>
            {
                response.send( Categories )
            } )
        }

    } catch ( error ) { console.error( error ) } }


    
    async function updateCategories( response )
    { try { 

        categories.findById( _id ).then( async ( Categories ) =>
        {
            if( Boolean( Categories ) )
            {
                for( const key in body ) { Boolean( body[key] )  ?  Categories[key] = await body[key]  :  keys.push(key) }
                await Categories.save()
                response.send( Categories )
            }
        } )

    } catch ( error ) { console.error( error ) } }

    

    async function removeCategories( response )
    { try { 

        const Categories = await categories.findById( _id )
        
        if( Boolean( Categories) )
        {
            await Categories.remove()
            response.send( { removed : true } )
        }

    } catch ( error ) { console.error( error ) } }

    /*
    function verifyQuantityOfProducts ( quantity ) 
    {
        categories.find( {}, { products.length : { $lte : quantity } } } ).then( ( Categories ) =>
        {
            response.send( { Categories } )
        } ) 
    }

    function verifyCode ( response, code ) 
    {
        categories.find( {}, { $eq : { code } } ).then( ( Categories ) =>
        {
            response.send( { Categories } )
        } )   
    }

    function verifyAvailability ( response )
    {
        categories.find( {}, { $eq : { availability : 1 } } ).then( ( Categories ) =>
        {
            response.send( { Categories } )
        } )
    }
    */
} catch ( error ) { console.error( error ) } }




async controlProducts ( request, response, next )
{ try {

    const { body, files } = request, { _id, reference, create, view, update, remove } = body
    let created = {}, updated = {}, exclude = [], product = {}
    
    if( Boolean( create ) )
        createProduct( response )
    if( Boolean( view ) )
        viewProduct( response )
    if( Boolean( update ) )
        updateProduct( response )
    if( Boolean( remove ) )
        removeProduct( response )

    async function createProduct( response )
    { try {

        for( const Key in body ) { Boolean( body[Key] )  ?  created[Key] = body[Key]  :  exclude.push(Key) } 
        for( const key in created ) { key != `create`  ?  product[key] = created[key]  :  `` }

        const Product = new products( product )
        await Product.save()
        response.send( Product )
    
    } catch ( error ) { console.error ( error ) } }



    async function viewProduct( response )
    { try {
    
        if( Boolean( _id ) )
        await products.findById( _id ).populate(`categories`).then( ( Product ) => 
        {
           response.send( Product )
        } )

        if( !Boolean( _id ) )
        {
            let search = await helpers.viewSearch( body, [ `view` ] )
            
            await products.find( { ...search } ).populate(`categories`).then( ( Product ) => 
            {
                response.send( Product )
            } )
        }

    } catch ( error ) { console.error ( error ) } }



    async function updateProduct( response )
    { try {

        if( Boolean( _id ) )
            products.findById( _id ).then( Product => update( Product ) )
        if( Boolean( reference ) )
            products.find( { reference } ).then( Product => update( Product ) )

        async function update ( Product )
        {
            if( Boolean( Product ) )
            {
                for( const Key in body ) { Boolean( body[Key] )  ?  updated[Key] = body[Key]  :  exclude.push(Key) } 
                for( const key in updated ) { key != `update`  &&  key != `categories`  ?  Product[key] = updated[key]  :  `` }   

                if( Boolean( files ) )
                {
                    if( await helpers.ImageValidator( files ) )
                    {
                        let { images } = Product
                    
                        Product.images = images.filter( iterator => iterator ).concat( files.map( iterator => iterator.path ) )
                    }
                }

                await Product.save()
                response.send( Product )
            }
        }

    } catch ( error ) { console.error ( error ) } }



    async function removeProduct( response )
    { try {

        await products.findByIdAndDelete( _id ).then( ( success ) =>
        {
            Boolean( success )  ?  response.send( { removed : true } )  :  response.send( { removed : false } )
        } )

    } catch ( error ) { console.error ( error ) } }

} catch ( error ) { console.error( error ) } 

}


async controlVariations( request, response, next ) 
{ 

    const { body, params, files } = request, { _id } = params, { name, code, value, defaultValue, images, ticket, amount, delivery, availability, products, create, view, update, remove } = body
    let created = {}, updated = {}, exclude = [], variation = {}
    
    if( Boolean( create ) )
        createVariations( response )
    if( Boolean( view ) )
        viewVariations( response )
    if( Boolean( update ) )
        updateVariations( response )
    if( Boolean( remove ) )
        removeVariations( response )


    async function createVariations( response )
    { try {

        for( const Key in body ) { Boolean( body[Key] )  ?  created[Key] = body[Key]  :  exclude.push(Key) } 
        for( const key in created ) { key != `create`  ?  variation[key] = created[key]  :  `` }

        const Variations = new variations( variation )
        await Variations.save()
        response.send( Variations )

    } catch ( error ) { console.error ( error ) } }


    async function viewVariations( response )
    { try {
        
        if( _id )
        {
            await variations.find( { _id } ).then( ( Variations ) =>
            {
                response.send( Variations )
            })
        }
        
        if( !Boolean( _id ) )
        {
            await variations.find().then( ( Variations ) =>
            {
                response.send( Variations )
            })
        }

    } catch ( error ) { console.error ( error ) } }


    async function updateVariations( response )
    { try {

        if( Boolean( _id ) )
            variations.findById( _id ).then( Variations => update( Variations ) )
        else
            method.Error422( error, next )

        async function update( Variations )
        {
            for( const Key in body ) { Boolean( body[Key] )  ?  updated[Key] = body[Key]  :  exclude.push(Key) }   

            if( Boolean( files ) )
            {
                if( await helpers.ImageValidator( files ) )
                {
                    let { images } = Variations
                
                    Variations.images = images.filter( iterator => iterator ).concat( files.map( iterator => iterator.path ) )
                }
            }

            await Variations.save()
            response.send( Variations ) 
        }

    } catch ( error ) { console.error ( error ) } }


    async function removeVariations( response )
    { try {

    } catch ( error ) { console.error ( error ) } }

}
 
/*
async controlProducts( request, response, next )
{
    const { method, body } = request
    body.reference = body.insert

    if( method == `POST` )
    {
        const { select, insert, update, product, categories, name, value } = body
        var
            { files } = request,
            files = ( Boolean(files)  &&  Boolean(files[0]) )  ?  files  :  [{}],
            images = String()
            
            body.images = setImages( images )
            
        if( select )
        {
            mysqlConnection.query( app.locals.sql.controlProductsSelect, select, ( error, p, fields ) =>
            {
                mysqlConnection.query( app.locals.sql.controlVariationsSelect, p[0].id, ( errors, v, fields ) =>
                {
                    if( p && v ) 
                        { response.send( [p, v] ) }
                } )
            } )
        }


        if( insert )
        {
            

            let 
                [ productsSql, productsRequired, productsRequiredValues, variationsSql, variationsRequired, variationsRequiredValues ] = helpers.ControlProductsSqlConstructor( body, true ),
                Psql = `INSERT INTO products ( ${ productsSql } ) VALUES ( ${ productsRequired } )`,
                Vsql = `INSERT INTO variations ( productId,${ variationsSql } ) VALUES ( LAST_INSERT_ID(), ${ variationsRequired } )`

            
            mysqlConnection.query( Psql, productsRequiredValues, ( errors, success, fields ) =>
            {
                if( !errors )
                {
                    mysqlConnection.query( Vsql, variationsRequiredValues, ( error, success, fields ) =>
                    { 

                        response.redirect(`/administrator/control/products`) 
                    } )
                }
            } )   
        }


        if( update )
        {
            let 
                [ productsSql, productsRequiredValues, variationsSql, variationsRequiredValues ] = helpers.ControlProductsSqlConstructor( body, false, true ),
                pSql = `UPDATE products SET ${ productsSql } WHERE reference = ?`,
                vSql = `UPDATE variations SET ${ variationsSql } WHERE productId = ?`

            mysqlConnection.query( pSql, [ ...productsRequiredValues, update ], ( erro, success, fields ) =>
            { 
                mysqlConnection.query( app.locals.sql.controlProductsSelect, update, ( error, product, fields ) =>
                {
                    mysqlConnection.query( vSql, [ ...variationsRequiredValues, product[0].id ], ( errors, success, fields ) =>
                    { 
                        if( !erro  &&  !error  &&  !errors ) 
                                { response.redirect(`/administrator/control/products`) } 
                    } )
                 } )
            } )
        }
    }
    else 
        {  }

    function setImages( images )
    {
        for( let i = 0; i <= files.length - 1; i++ ) 
        {
            Boolean( files[i] )  ?  images += `${files[i].path}─`  :  undefined
            if( i == files.length - 1) { return images }
        }
    }
}
*/






}




/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = admController