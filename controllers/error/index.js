class errorsController
{


errorHandling( error, request, response, next )
{
    const { httpStatusCode } = error

    if( httpStatusCode == 401 )
    response.send( httpStatusCode, `missing authorization` )

    if( httpStatusCode == 404 )
    response.send( httpStatusCode, `page not found` )
    //response.render( `error/404.ejs` )
    
    if( httpStatusCode == 422 )
    response.send( httpStatusCode, `unworkable` )
}


}


module.exports = errorsController