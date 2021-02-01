const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const categoriesSchema = new Schema({

  name: {
    type: String
  },

  code: {
    type: String
  },

  type: {
    type: String
  },

  availability: {
    type: Boolean,
    default: true
  },

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products'
    }
  ]

}, { timestamps: true })
categoriesSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('categories', categoriesSchema)
