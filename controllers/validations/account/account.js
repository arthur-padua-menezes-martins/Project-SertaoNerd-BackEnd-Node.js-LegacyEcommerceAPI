/* HELPERS MODULES */
const verify = require('../../../helpers/function/verify.js')

module.exports =
{
  all: async body => {
    const validator = []
    const validationFunctions =
        {
          name: async info => { validator.push(!!info.match()) },
          email: async info => { validator.push(!!info.match(/\S+@\S+\.\S+/)) },
          password: async info => { validator.push(!!info.match()) },
          cpf: async info => { validator.push(!!info.match()) },
          phone: async info => { validator.push(!!info.match()) },
          dateOfBirth: async info => { validator.push(!!info.match()) },
          street: async info => { validator.push(!!info.match()) },
          number: async info => { validator.push(!!info.match()) },
          district: async info => { validator.push(!!info.match()) },
          city: async info => { validator.push(!!info.match()) },
          state: async info => { validator.push(!!info.match()) },
          cep: async info => { validator.push(!!info.match()) }
        }

    for (const key in body) { if (validationFunctions.hasOwnProperty(key)) { validationFunctions[key](body[key]) } }; console.log(validator)

    return verify.every(validator)
  }
}
