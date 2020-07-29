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
    locals = require(`../../helpers/locals`),
    message = locals[0],
    method = locals[1]




 