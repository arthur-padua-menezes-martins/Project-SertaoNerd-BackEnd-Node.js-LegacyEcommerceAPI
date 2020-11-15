const

  /* DATABASE MODULES */
  mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const requestsSchema = new Schema
({

  users:
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },

  cart:
    [{
      staticProducts:
        {
          type: String
        },

      products:
        {
          type: Schema.Types.ObjectId,
          ref: 'products'
        },

      variations:
        {
          type: Schema.Types.ObjectId,
          ref: 'variations'
        },

      quantity:
        {
          type: Number,
          default: 1
        },

      unitaryValue:
        {
          type: Number
        }
    }],

  payments:
    {
      type: Schema.Types.ObjectId,
      ref: 'payments'
    },

  deliveries:
    {
      type: Schema.Types.ObjectId,
      ref: 'deliveries'
    },

  canceled:
    {
      type: Boolean,
      default: false
    }

}, { timestamps: true })
requestsSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('requests', requestsSchema)
