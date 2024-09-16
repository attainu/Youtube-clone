const Subscribe = require('../models/Subscribers')
const Video = require('../models/Videos')

module.exports = {

    //Counting number of subs the video owner have
    async subsCount(req, res) {
        try { 
            const toUser = req.body.toUser      
            const toUserSubs = await Subscribe.find({"toUser": toUser })        
            const subsCount = toUserSubs.length
            
            res.status(200).json({
                success: true,
                statusCode:200,
                subsCount,
            });          
        } catch (err) {           
            res.status(400).json({message: err.message})        
        }
    },

    //Checking if the user is subbed to the video owner or not
    async subscribed(req, res) {
        try { 
            const toUser = req.body.toUser      
            const fromUser = req.body.fromUser      
            const subscribed = await Subscribe.find({"toUser": toUser, "fromUser": fromUser })
            let isSubbed = false;        
            if(subscribed.length !== 0) isSubbed = true
            
            res.status(200).json({
                success: true,
                statusCode:200,
                isSubbed,
            });          
        } catch (err) {           
            res.status(400).json({message: err.message})        
        }
    },

    //Subscribe to 
    subscribe(req, res){
        const subscribe = new Subscribe(req.body)
        subscribe.save((err, subscribe)=>{
            if(err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true })
        })
    },

    //Unsubscribe
    async unsubscribe(req, res){
        try {
            await Subscribe.findOneAndDelete({ toUser: req.body.toUser, fromUser: req.body.fromUser })
            return res.status(200).json({ success: true })
        } catch(err) {
            return res.status(400).json({ success: false, err })
        }
       
    },

    //all subscribed to Videos
    async allSubscribedVideos(req, res){
        try {
            const all = await Subscribe.find({ fromUser: req.body.fromUser })
            let allSubscribedUsers = []
            //console.log("all==== ", all)
            all.map((subscriber, i)=>{
                allSubscribedUsers.push(subscriber.toUser)
            })
            console.log("allSubscribedUsers==== ", allSubscribedUsers)
            const allSubscribedVideos = await Video.find({ owner: { $in: allSubscribedUsers }}).populate('owner')

            return res.status(200).json({ success: true, allSubscribedVideos })
        } catch(err) {
            return res.status(400).json({ success: false, err })
        }
       
    },

    //all subscribers
    async allSubscribers(req, res){
        try {
            const allSubscribers = await Subscribe.find({ toUser: req.body.toUser })
            return res.status(200).json({ success: true, allSubscribers })
        } catch(err) {
            return res.status(400).json({ success: false, err })
        }
       
    }

    
}