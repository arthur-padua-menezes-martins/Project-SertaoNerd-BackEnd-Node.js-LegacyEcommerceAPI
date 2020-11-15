/* DATABASE MODULES */
const products = require('../../models/database/MongoDB/Schema/products.js')
const variations = require('../../models/database/MongoDB/Schema/variations.js')
const deliveries = require('../../models/database/MongoDB/Schema/deliveries.js')
const recordsRequests = require('../../models/database/MongoDB/Schema/recordsRequests.js')

/* HELPERS MODULES */
const constructors = require('../../helpers/function/constructors.js')
const setErrorStatus = require('../../helpers/error/setErrorStatus.js')

/* INTEGRATIONS MODULES */
const { calculateShipping } = require('../integrations/correios/correios.js')

class deliveriesController {
  async view (request, response, next) {
    try {
      const { params, session } = request; const { _id } = params; const { user } = session; const error = new Error()
      var [Deliveries] = await deliveries.find(await constructors.objectConstructor({ requests: _id })).populate('requests')

      if (Deliveries.requests.users == user._id) {
        response.send({ Deliveries, RecordsRequests: await recordsRequests.find({ requests: Deliveries.requests || null }) })
      } else {
        setErrorStatus.Error401(error, next)
      }
    } catch (error) { console.error(error) }
  }

  async calculate (request, response, next) {
    try {
      const { body } = request; const { Cep, Cart } = body

      response.send(await calculateShipping(Cep, await Promise.all(Cart.map(async iterator => {
        iterator.products = await products.findById(iterator.products)
        iterator.variations = await variations.findById(iterator.variations)
        return iterator
      }))))
    } catch (error) { console.error(error) }
  }
}

module.exports = deliveriesController
