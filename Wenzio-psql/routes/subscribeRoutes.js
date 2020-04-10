
const { Router } = require('express')
const controller = require('../controllers/subscribeController')
const middleware = require('../middlewares/authenticate')

const router = Router()

router.post('/subscribe/allSubscribedVideos', controller.allSubscribedVideos)

router.post('/subscribe/allSubscribers', controller.allSubscribers )

router.post('/subscribe/subsCount', controller.subsCount ) 

router.post('/subscribe/subscribed', controller.subscribed )
router.post('/subscribe/subscribe', controller.subscribe )   
router.post('/subscribe/unsubscribe', controller.unsubscribe )



module.exports = router