const

/*CRYPTOGRAPHY MODULES*/
    crypto = require('crypto'),

/*HELPERS MODULES*/ 
    helpers = require('../../../../helpers/function.js'),
    locals = require('../../../../helpers/locals.js'),
    message = locals[0],
    method = locals[1],

/*DATABASE MODULES*/
    mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    
    
usersSchema = new mongoose.Schema
({ 

    name: 
    { 
        type : String, 
        required : true
    },
    
    email: 
    { 
        type : String, 
        index : true, 
        lowercase : true, 
        unique : true, 
        required : true,
        match : /\S+@\S+\.\S+/
    },

    password:
    {
        type : String
    },

    cpf:
    {
        type : String
        //required : true
    },

    phone:
    {
        type : [ { type : String } ]
    },

    dateOfBirth:
    {
        type : Date
        //required : true
    },

    address:
    {
        city: 
        { 
            type : String,
            default : ''
            //required : true
        },

        state: 
        { 
            type : String,
            default : ''
            //required : true 
        },

        neighborhood: 
        { 
            type : String,
            default : ''
            //required : true 
        },

        cep: 
        { 
            type : String,
            default : ''
            //required : true 
        },
    },

    salt:
    {
        type : String
    },

    recovery:
    {
        type : String,
        default : ''
    },

    hierarchy:
    {
        type : String,
        default : 0
    },

    excluded:
    {
        type : Boolean,
        default : false
    }
    
}, { timestamps : true } )
usersSchema.plugin( mongoosePaginate, uniqueValidator )


/*login-register-recovery*/
usersSchema.methods.passwordHash = async ( password, user, User = false ) =>
{
    if( !User )
    {
        user.salt = crypto.randomBytes(16).toString('hex')
        user.password = helpers.crypto( password, user.salt )
        user.save()
    }
    else
    {
        return helpers.crypto( password, User.salt )
    }   
}   

usersSchema.methods.verify = async ( password, User ) =>
{
    return helpers.crypto( password, User.salt ) === User.password  ?  true  :  false
}

usersSchema.methods.recover = async ( User, recovery ) =>
{
    User.recovery = recovery
    User.save()
}

usersSchema.methods.unsetRecover = async ( User, password ) =>
{
    const
        attributes = [ User.recovery, User.password ],
        values = [ '', usersSchema.methods.passwordHash( password, User ) ]
    
    for( let i = 0; i < attributes.length - 1; i++ )
    {
        attributes[i] = await values[i]
    }
    User.save()
}


/*account*/
usersSchema.methods.accountDelete = async ( User ) =>
{
    const
        attributes = [ User.password, User.salt, User.recovery, User.excluded ],
        values = [ '', '', '', true ]

    for( let i = 0; i < attributes.length - 1; i++ )
    {
        attributes[i] = await values[i]
    }
    User.save()
}  


/*session*/
usersSchema.methods.sessionStore = async ( request, response ) =>
{
    const { session, user } = request

    session.user = user
    response.send( { success : message.LoginSuccess } )
}

usersSchema.methods.sessionUpdate = async ( request, response, User ) =>
{
    let { user } = request.session

    for( const key in User ) { user[key] = User[key] }
    response.send( { success : message.SessionUpdateSuccess } )
}

usersSchema.methods.sessionLogout = async ( request, response ) =>
{
    const { session } = request

    session.destroy( error => { response.redirect(`/login`) } )
}



module.exports = mongoose.model( `users`, usersSchema )