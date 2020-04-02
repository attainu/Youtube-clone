const { Router } = require('express')
const { getLikes, getDislikes, liked, unLiked, disliked, unDisliked } = require('../controllers/likeController')
const authenticate = require('../middlewares/authenticate')

const router = Router()

router.post('/like/getLikes', getLikes )        //This request gets the likes for a video or comment from database.
                                        //Expects json object as input, either id of the video or the comment.
                                        // { "videoId": "sfdfsdcdf"} or { "commentId": "sfdfsdcdf"}

router.post('/like/getDislikes', getDislikes )        //This request gets the dislikes for a video or comment from database.
                                            //Expects json object as input, either id of the video or the comment.
                                            // { "videoId": "sfdfsdcdf"} or { "commentId": "sfdfsdcdf"}

router.post('/like/liked', liked )        //saving likes for a video or comment in database.
                                            //Expects json object as input, either id of the video or the comment along with the userId.
                                            // { "userId": "sdsfdsfdf", "videoId": "sfdfsdcdf"} or { "userId": "sdsfdsfdf", "commentId": "sfdfsdcdf"}

router.post('/like/disliked', disliked )        //saving dislikes for a video or comment in database.
                                            //Expects json object as input, either id of the video or the comment along with the userId.
                                            // { "userId": "sdsfdsfdf", "videoId": "sfdfsdcdf"} or { "userId": "sdsfdsfdf", "commentId": "sfdfsdcdf"}

router.post('/like/unLiked', unLiked )        //deleting like for a video or comment from database.
                                            //Expects json object as input, either id of the video or the comment along with the userId.
                                            // { "userId": "sdsfdsfdf", "videoId": "sfdfsdcdf"} or { "userId": "sdsfdsfdf", "commentId": "sfdfsdcdf"}

router.post('/like/unDisliked', unDisliked )        //deleting dislike for a video or comment from database.
                                            //Expects json object as input, either id of the video or the comment along with the userId.
                                            // { "userId": "sdsfdsfdf", "videoId": "sfdfsdcdf"} or { "userId": "sdsfdsfdf", "commentId": "sfdfsdcdf"}

module.exports = router