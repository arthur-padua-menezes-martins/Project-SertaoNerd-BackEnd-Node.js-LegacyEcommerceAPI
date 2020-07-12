

/*BASIC MODULES*/
const server = require('../../../server.js')

/*DATABASE MODULES*/
const Sequelize = require('sequelize')
const mysql = require('mysql')




/*MYSQL*/
/**********************************************************************************************************************************/
var mysqlConnection = new Array
(
    mysqlConnection = mysql.createConnection( 
        {
            host:'localhost', 
            user:'root', 
            password:'', 
            database:'ecommerce_sn_users' 
        }) 
)
mysqlConnection[0].connect( (errors) => { errors && console.error(errors); return })




/*SEQUELIZE*/
/**********************************************************************************************************************************/
var sequelizeConnection  = new Array 
(
    new Sequelize('ecommerce_sn','root','',{ timezone: "-03:00", host:'localhost', dialect:'mysql' })
)




/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = [ mysqlConnection, sequelizeConnection ]
