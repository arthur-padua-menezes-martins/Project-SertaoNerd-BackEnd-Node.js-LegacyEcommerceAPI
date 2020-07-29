/*BASIC MODULES*/
const express = require('express')
const app = express()


app.locals.message =
{
    LoginError : `autenticação inválida`,
    LoginSuccess : `autenticação realizada`,

    RegisterError : `não é possivel gerar uma autenticação válida com as informações fornecidas!`,
    RegisterSuccess : `informações registradas!`,

    RecoveryError : [`esse e-mail não é válido para a redefinição de senha`, `verifique a validade das informações`, `o período para redefinição expirou, solicite um novo` ],
    RecoveryWarning : `você possui 48 horas para definir uma nova senha`,
    RecoverySuccess : `senha alterada!`,

    SessionUpdateSuccess : `informações atualizadas`,

    EmailValidator : `e-mail inválido`
}

app.locals.method =
{
    Error401 : ( error, next ) => { error.httpStatusCode = 401; next( error ) },

    Error404 : ( error, next ) => { error.httpStatusCode = 404; next( error ) },

    Error422 : ( error, next ) => { error.httpStatusCode = 422; next( error ) }
}

app.locals.noSQL =
{
    
}

app.locals.SQL = 
{
    
}




module.exports = [ app.locals.message, app.locals.method, app.locals.noSQL, app.locals.SQL ]