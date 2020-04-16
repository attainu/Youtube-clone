
const { Router } = require('express')
const controller = require('../controllers/likeController')
const middleware = require('../middlewares/authenticate')

const router = Router()

router.post('/like/getLikes', controller.getLikes )      
// router.post('/like/getDislikes', controller.getDislikes )
router.post('/like/liked', controller.liked )       
// router.post('/like/disliked', controller.disliked )  
// router.post('/like/unLiked', controller.unLiked )        
// router.post('/like/unDisliked', controller.unDisliked )

module.exports = router