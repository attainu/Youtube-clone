const { Router } = require('express')
const { subsCount, subscribed, subscribe, unsubscribe, allSubscribedVideos, allSubscribers } = require('../controllers/subscribeController')
const authenticate = require('../middlewares/authenticate')

const router = Router()

router.post('/subscribe/allSubscribedVideos/:token', authenticate, allSubscribedVideos )     //This request returns all the owners the user is subscribed to.
                                                            //Expects json object as input, of curretn User id.
                                                            // { "fromUser": "dfscvsdfsdff"}

router.post('/subscribe/allSubscribers/:token', authenticate, allSubscribers )   //This request returns all the subscribers the user have.
                                                            //Expects json object as input, of video owner's id.
                                                            // { "toUser": "dfscvsdfsdff"}

router.post('/subscribe/subsCount/:token', authenticate, subsCount )             //This request returns number of subs the video owner have
                                                            //Expects json object as input, of toUser and fromUser id
                                                            // { "toUser": "fedffggvdfsg" }

router.post('/subscribe/subscribed/:token', authenticate, subscribed )           //Checks if the user watching the video subbed to video owner or not
                                                            //Expects json object as input, of toUser and fromUser id
                                                            // { "toUser": "fedffggvdfsg", "fromUser": "dfscvsdfsdff"}
                                            
router.post('/subscribe/subscribe/:token', authenticate, subscribe )             //Request for subscribing
                                                            //Expects json object as input, of toUser and fromUser id
                                                            // { "toUser": "fedffggvdfsg", "fromUser": "dfscvsdfsdff"}

router.post('/subscribe/unsubscribe/:token', authenticate, unsubscribe )         //Request for unsubscribing
                                                            //Expects json object as input, of toUser and fromUser id
                                                            // { "toUser": "fedffggvdfsg", "fromUser": "dfscvsdfsdff"}



module.exports = router