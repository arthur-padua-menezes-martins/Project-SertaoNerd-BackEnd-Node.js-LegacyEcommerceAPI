const
/*CRYPTOGRAPHY MODULES*/
    crypto = require(`crypto`),

/*HELPERS MODULES*/
    helpers = require(`../../../../helpers/function.js`),
    locals = require(`../../../../helpers/locals.js`),
    message = locals[0],
    method = locals[1],

/*DATABASE MODULES*/
    mongoose = require(`mongoose`),
    uniqueValidator = require(`mongoose-unique-validator`),
    mongoosePaginate = require(`mongoose-paginate`),
    Schema = mongoose.Schema,
    products = require(`./products.js`),

    
categoriesSchema = new Schema
({

    name: 
    { 
        type : String 
    },

    code: 
    { 
        type : String 
    },

    availability: 
    {
        type : Boolean, default : true 
    },

    products: 
    [ 
        { 
            type: Schema.Types.ObjectId, 
            ref: `products` 
        } 
    ],


}, { timestamps : true } )




module.exports = mongoose.model( `categories`, categoriesSchema )