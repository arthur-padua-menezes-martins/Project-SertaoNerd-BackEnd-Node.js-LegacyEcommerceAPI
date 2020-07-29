const
/*CRYPTOGRAPHY MODULES*/
    crypto = require(`crypto`),

/*HELPERS MODULES*/
    helpers = require(`../../../../helpers/function.js`),
    locals = require(`../../../../helpers/locals.js`),

/*DATABASE MODULES*/
    mongoose = require(`mongoose`),
    uniqueValidator = require(`mongoose-unique-validator`),
    mongoosePaginate = require(`mongoose-paginate`),
    Schema = mongoose.Schema,



    
variationsSchema = new Schema
({

    name: 
    { 
        type : String 
    },

    code: 
    { 
        type : String 
    },

    value: 
    { 
        type : Number 
    },

    defaultValue: 
    { 
        type : Number 
    },

    images:
    {
        type : Array,
        default : []
    },

    ticket:
    {
        type : Array,
        default : []
    },

    amount:
    {
        type : Number 
    },

    delivery:
    {
        dimensions:
        {
            width:
            {
                type : Number
            },
            height:
            {
                type : Number 
            },
            depth:
            {
                type : Number 
            }
        },
        weight:
        {
            type : Number 
        },
        freeShipping:
        {
            type : Boolean,
            default : false
        }
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




module.exports = mongoose.model( `variations`, variationsSchema )