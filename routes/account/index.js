/* BASIC MODULES */
const
  router = require('express').Router()

/* AUTHENTICATION MODULES */
const sessionController = require('../../controllers/session/index.js'); const session = new sessionController()
const accountController = require('../../controllers/account/index.js'); const account = new accountController()
const assessmentsController = require('../../controllers/assessments/index.js'); const assessments = new assessmentsController()
const requestsController = require('../../controllers/requests/index.js'); const requests = new requestsController()
const deliveriesController = require('../../controllers/deliveries/index.js'); const deliveries = new deliveriesController()

/* GET */
router.get('/', account.show)

router.get('/update', account.update)

router.get('/delete', account.delete)

router.get('/logout', session.logout)

router.get('/assessments/:_id?', assessments.view)

router.get('/requests/view/:_id?', requests.view)
router.get('/requests/cart/:_id?', requests.viewCart)

router.get('/deliveries/:_id?', deliveries.view)

/* POST */
router.post('/update', account.update)

router.post('/assessments/create', assessments.create)
router.post('/assessments/update', assessments.update)

router.post('/requests/create', requests.create)
router.post('/requests/remove/:_id', requests.remove)
router.post('/requests/cart/:_id', requests.viewCart)

router.post('/deliveries/calculate', deliveries.calculate)

/* EXPORTS */
module.exports = router
