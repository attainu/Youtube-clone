const { Router } = require('express')
const { saveComment, getComments } = require('../controllers/commentController')
const authenticate = require('../middlewares/authenticate')

const router = Router()

router.post('/comment/saveComment', saveComment )       //This request saves the comment in database.
                                                        //Expects json object as input, with writer's id, video id, comment content and reponse to commentId if it's a reply comment.
                                                        // { "content": "Comment body", "writer": "sjnifnsdjn", "videoId": "sfdfsdcdf"}

router.post('/comment/getComments', getComments )       //This request fetches all the comments on the video.
                                                        //Expects json object as input, with video id.
                                                        // { "videoId": "sfdfsdcdf" }

module.exports = router