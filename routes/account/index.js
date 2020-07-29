const

/*BASIC MODULES*/
    router = require('express').Router(),

/*AUTHENTICATION MODULES*/
    usersController = require('../../controllers/users/index.js'),
    sessionController = require('../../controllers/session/index.js'),    
    assessmentsController = require('../../controllers/assessments/index.js'),    
    users = new usersController(),
    session = new sessionController(),
    assessments = new assessmentsController()




router.get( '/', users.show )

router.get( `/logout`, session.logout )

router.get( `/update`, ( request, response ) => { response.render( `account/update` ) } )
router.post( `/update`, users.update )

router.get( `/delete`, users.delete )


router.post( `/assessments/create`, assessments.create )
router.post( `/assessments/update`, assessments.update )
router.get( `/assessments/:id?`, assessments.view )
/*
router.post( `/assessments`, assessments.update )
*/

/*EXPORTS USER ROUTES*/
/**********************************************************************************************************************************/
module.exports = router