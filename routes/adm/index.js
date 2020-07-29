const

/*BASIC MODULES*/
    router = require('express').Router(),

/*FILES MODULES*/
    multer = require('multer'),
    multerConfig = require('../../helpers/multerConfig.js'),
    upload = multer( multerConfig ),

/*AUTHENTICATION MODULES*/ 
    admController = require('../../controllers/adm/index.js'),
    adm = new admController()




/*SEARCH*/
/**********************************************************************************************************************************/
router.get( '/search', adm.search )

router.get( '/search/users/:_id?', adm.searchUsers ) 

router.get( '/search/comments/:_id?', adm.searchComments )

router.get( '/search/email', adm.searchEmail )

router.get( '/search/categories', adm.searchCategories )

router.get( '/search/products', adm.searchProducts )

router.get( '/search/variations/:_id?', adm.searchVariations )


 
/*CONTROL*/
/**********************************************************************************************************************************/
router.get( '/control', adm.control )

router.post( '/control/users', adm.controlUsers )

router.post( '/control/comments', adm.controlComments )

router.post( '/control/email', adm.controlEmail )

router.post( '/control/categories', adm.controlCategories )

router.post( '/control/products', upload.array('file'), adm.controlProducts )

router.post( '/control/variations', upload.array('file'), adm.controlVariations )




/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = router

