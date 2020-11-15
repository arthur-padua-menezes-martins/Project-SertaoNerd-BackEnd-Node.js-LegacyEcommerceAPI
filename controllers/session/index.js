const

  /* DATABASE MODULES */
  mongoose = require('mongoose')
const users = require('../../models/database/MongoDB/Schema/users.js')

/* HELPERS MODULES */
const setErrorStatus = require('../../helpers/error/setErrorStatus.js')

class sessionsController {
  async check (request, response, next) {
    const { session, baseUrl } = request; const { user } = session; const error = new Error()

    if (user) {
      users.findById(user._id).then(async (User) => {
        if (User) {
          if (baseUrl == '/adm') {
            return await validation(User) ? next() : setErrorStatus.error400(error, next)
          } else {
            next()
          }
        } else {
          setErrorStatus.error400(error, next)
        }
      })
    } else {
      setErrorStatus.error400(error, next)
    }

    function validation (User) { return User.hierarchy == 1 }
  }

  async logout (request, response, next) {
    const { session } = request

    session.destroy(error => { response.redirect('/login') })
  }
}
module.exports = sessionsController
