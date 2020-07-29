const

/*BASIC MODULES*/
    router = require('express').Router(),

/*AUTHENTICATION MODULES*/
    usersController = require('../../controllers/users/index.js'),
    searchController = require('../../controllers/search/index.js') ,
    users = new usersController(),
    search = new searchController()

 


router.get( `/:categories/:name?/:reference?`, search.showProducts )
router.post( `/:categories/:name?/:reference?`, search.showProducts )

/*
router.get( '/:product', search.products, search.page404 )
router.post( '/:product', search.products )

router.get( '/:product/:category', search.products, search.page404 )
router.post( '/:product/:category', search.products )

router.get( '/:product/:category/:reference', search.products, search.page404 )
router.post( '/:product/:category/:reference', search.products, users.comments )
*/
  


/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = router