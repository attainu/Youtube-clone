
const Subscribe = require('../models/Subscribers')
const Video = require('../models/Videos')

module.exports = {

    //Counting number of subs the video owner have
    async subsCount(req, res) {
        try { 
            const toUser = req.body.toUser      
            const toUserSubs = await Subscribe.findOne({
                where:{
                    sub_toUser: toUser 
                }
            })        
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
            const subscribed = await Subscribe.findOne({where:{sub_toUser: toUser, sub_fromUser: fromUser }})
            if(subscribed !== null){
                let isSubbed = false;        
                if(subscribed.length !== 0) isSubbed = true
            
                 return res.status(200).json({
                    success: true,
                    statusCode:200,
                    isSubbed,
                });     
            }
            else{
                let isSubbed = false;
                return res.status(200).json({
                    success: false,
                    statusCode:200,
                    isSubbed    
            })
        }
                 
        } catch (err) {           
            res.status(400).json({message: err.message})        
        }
    },

    //Subscribe to 
    async subscribe(req, res){
        const data = {
            sub_toUser:req.body.subTo,
            sub_fromUser:req.body.subFrom
        }
        let{ sub_toUser,  sub_fromUser} = data

        const savedFile = await Subscribe.create({
            sub_toUser,  sub_fromUser
        })
            // if(err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, message:savedFile})
    },
    //Unsubscribe
    async unsubscribe(req, res){
        try {
            await Subscribe.destroy({where:{ toUser: req.body.toUser, fromUser: req.body.fromUser }})
            return res.status(200).json({ success: true })
        } catch(err) {
            return res.status(400).json({ success: false, err })
        }
       
    },

    //all subscribed to Videos
    async allSubscribedVideos(req, res){
        try {
            const all = await Subscribe.findAll({where:{ fromUser: req.body.fromUser }})
            let allSubscribedUsers = []
            all.map((subscriber, i)=>{
                allSubscribedUsers.push(subscriber.userTo)
            })

            const allSubscribedVideos = await Video.findOne({where:{ owner: { $in: allSubscribedUsers }}})

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


