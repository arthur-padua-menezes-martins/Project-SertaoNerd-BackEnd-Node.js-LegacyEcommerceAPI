const
  router = require('express').Router()
const searchController = require('../../controllers/search/index.js'); const search = new searchController()

router.get('/term/:searchTerm?', search.searchTerm)
router.get('/products/:reference?', search.searchReference)
router.get('/:category/:type?', search.searchProducts)
module.exports = router
