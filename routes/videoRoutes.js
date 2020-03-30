const { Router } = require('express')
const { uploadVideo, allVideos, watchVideo, uploadFile } = require('../controllers/videoController')
const authenticate = require('../middlewares/authenticate')

const router = Router()

router.get('/video/allVideos', allVideos)               //Home page showing all the videos
router.get('/video/watchVideo/:videoId', watchVideo)    //watch a particular video
router.post('/video/uploadFile', uploadFile)            //uploading video on server
router.post('/video/uploadVideo', uploadVideo)          //saving video in mongoose database


module.exports = router