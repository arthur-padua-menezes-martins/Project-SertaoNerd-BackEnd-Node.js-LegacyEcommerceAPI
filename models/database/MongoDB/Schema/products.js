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
    categories = require(`./categories.js`),

    
productsSchema = new mongoose.Schema
({

    reference:
    {
        type : String 
    },

    name:
    {
        type : String 
    },

    title: 
    { 
        type : String 
    },

    value:
    {
        type : Number
    },

    description:
    {
        type : String
    },

    images:
    {
        type : Array,
        default : []
    },

    availability:
    {
        type : Boolean, 
        default : true 
    },

    categories:
    {
        type : Schema.Types.ObjectId, 
        ref : `categories` 
    },

    assessments:
    [ 
        { 
            type: Schema.Types.ObjectId, 
            ref: `assessments` 
        } 
    ],

    variations:
    [ 
        { 
            type: Schema.Types.ObjectId, 
            ref: `variations` 
        } 
    ],

}, { timestamps : true } )
productsSchema.plugin( mongoosePaginate )






module.exports = mongoose.model( `products`, productsSchema )