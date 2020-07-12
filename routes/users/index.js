

/*BASIC MODULES*/
const router = require('express').Router()

/*AUTHENTICATION MODULES*/
const usersController = require('../../controllers/users/index.js'); const userController = new usersController()
const sessionsController = require('../../controllers/session/index.js'); const sessionController = new sessionsController()
router.get('/view', (request, response) => { response.json({ session:request.session.user }) })




router.get( '/register', ( request, response ) => 
    { response.render( 'register', { errors : null, success : null } ) } )
router.post( '/register', userController.register)


router.get( '/login', ( request, response ) => 
    { response.render( 'login', { errors : null, success : null, token : null } ) } )
router.post( '/login', userController.login, sessionController.store )


router.get( '/recover-password', ( request, response) => 
    { response.render( `recovery`, { errors : null, success : null } ) } )

router.post( '/recover-password', userController.recover, userController.showNewPassword ) 

router.get( '/new-password', ( request, response ) => { response.render( 'recovery/store', { errors : null, warning : null, success : null } ) } )

router.post( '/new-password', userController.newPassword )




/*EXPORTS USER ROUTES*/
/**********************************************************************************************************************************/
module.exports = router