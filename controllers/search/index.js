

/*CRYPTOGRAPHY MODULES*/
const crypto = require('crypto')

/*DATABASE MODULES*/
const define = require('../../models/database/define/define.js')
const { Op } = require('sequelize')
const { ESTALE } = require('constants')




class searchsController 
{


/*404*/
async page404( request, response, next ) { return response.render( `search/404.ejs` ) }


/*show products*/
async products( request, response, next )
{ try {
    

    if( request.method != 'POST' )
    {
        const { PRODUCT, CATEGORY, REFERENCE } = request.params         

        if( PRODUCT  &&  CATEGORY == undefined  &&  REFERENCE == undefined )   
        {
            const SEACRH = { product : PRODUCT }
            render( SEACRH, PRODUCT, CATEGORY, REFERENCE, 0, 3 ) 
        }



        if( PRODUCT  &&  CATEGORY  &&  REFERENCE == undefined )
        {
            const SEACRH = { product : PRODUCT, category : CATEGORY }
            render( SEACRH, PRODUCT, CATEGORY, REFERENCE, 0, 3 ) 
        }

        

        if( PRODUCT  &&  CATEGORY  &&  REFERENCE )
        {
            const SEACRH = { product : PRODUCT, category : CATEGORY, reference : REFERENCE }
            render( SEACRH, PRODUCT, CATEGORY, REFERENCE, 0, 3 ) 
        }
    


        function render( SEARCH, PRODUCT, CATEGORY, REFERENCE, offset = 0, limit = 1 )
        {
            define[2].findAndCountAll( { offset, limit, where : { [Op.and] : [ { ...SEARCH, ammout : { [Op.gte] : 1 } } ] } } ).then( (RESULT) =>
            {
                if(  RESULT.rows != '' ) 
                    response.render( 'search/search.ejs', { RESULT, PRODUCT, CATEGORY, REFERENCE, PAGES : Math.ceil( RESULT.count / 3 ), SESSION : request.session.user } )
                else 
                    next()
            }).catch( (error) => { next() } )
        } 
    }


    if( request.method == 'POST' )
    {
        const 
            { PRODUCT, CATEGORY, REFERENCE, PAGE, FILTER, productId, userId, stars, comment } = request.body,
            MIN  =  PAGE != 1  ?  3 * parseInt( PAGE - 1 )  :  0,
            orders  =  FILTER  ?  FILTER.split(' ')  :  null
   
        if( productId  &&  userId  &&  stars  &&  comment )
        { 
            request.comments = { productId, userId, stars, comment }
            next() 
        }
        if( PAGE == ''  &&  FILTER == '' )
        { 
            request.comments = {}
            next() 
        }
        

        if( PRODUCT  &&  CATEGORY == ''  &&  REFERENCE == ''  &&  FILTER == '' ) 
        {
            const SEACRH = { product : PRODUCT }
            pagination( SEACRH, MIN, 3 ) 
        }
        if( PRODUCT  &&  CATEGORY == ''  &&  REFERENCE == ''  &&  FILTER ) 
        {
            const SEACRH = { product : PRODUCT }
            const ORDER = { order : [ [ orders[0], orders[1] ] ] }
            pagination( SEACRH, MIN, 3, ORDER ) 
        }



        if( PRODUCT  &&  CATEGORY  &&  REFERENCE == ''  &&  FILTER == '' ) 
        {
            const SEACRH = { product : PRODUCT, category : CATEGORY }
            pagination( SEACRH, MIN, 3 ) 
        }



        function pagination( SEARCH, offset, limit, ORDER = [] )
        {
            define[2].findAndCountAll( { offset, limit, where : { [Op.and] : [ { ...SEARCH, ammout : { [Op.gte] : 1 } } ] }, ...ORDER } ).then( (RESULT) => 
            { 
                return response.send( RESULT ) 
            }).catch( (error) => { response.json({error:error}) } )
        }
    }
  
    
} catch ( error ) { next() } }


}




/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = searchsController