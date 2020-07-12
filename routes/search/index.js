

/*BASIC MODULES*/
const router = require('express').Router()
const validation = require('express-validation')

/*AUTHENTICATION MODULES*/
const searchsController = require('../../controllers/search/index.js'); const searchController = new searchsController()
const usersController = require('../../controllers/users/index.js'); const userController = new usersController()
const sessionsController = require('../../controllers/session/index.js'); const sessionController = new sessionsController()

 


router.get( '/:PRODUCT', searchController.products, searchController.page404 )
router.post( '/:PRODUCT', searchController.products )

router.get( '/:PRODUCT/:CATEGORY', searchController.products, searchController.page404 )
router.post( '/:PRODUCT/:CATEGORY', searchController.products )

router.get( '/:PRODUCT/:CATEGORY/:REFERENCE', searchController.products, searchController.page404 )
router.post( '/:PRODUCT/:CATEGORY/:REFERENCE', searchController.products, userController.comments )

  


/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = router