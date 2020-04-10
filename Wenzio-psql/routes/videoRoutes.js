const express = require('express');
const controller = require('../controllers/videoController');
const middleware = require('../middlewares/authenticate');

const router = express.Router();

//get all the videos
router.get('/video/allVideos', controller.allVideos);
//watch video
router.get('/video/watchVideo/:videoId', controller.watchVideo);
//upload video to db
router.post('/video/uploadVideo',middleware.authentication, controller.uploadVideo);

module.exports = router;