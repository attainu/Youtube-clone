
const { Router } = require('express')
const controller = require('../controllers/commentController')
const middleware = require('../middlewares/authenticate')

const router = Router()

router.post('/comment/saveComment',middleware.authentication, controller.saveComment )       
router.post('/comment/getComments',middleware.authentication, controller.getComments )  

module.exports = router