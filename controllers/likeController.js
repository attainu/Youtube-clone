const Like = require('../models/Likes')
const Dislike = require('../models/Dislikes')

module.exports = {

    //getting likes for video or comment according to request input
    async getLikes(req, res) {
        try {       
            const videoOrComment = {}
            if(req.body.videoId){
                videoOrComment = { videoId: req.body.videoId }
            } else if(req.body.commentId){
                videoOrComment = { commentId: req.body.commentId }
            } else throw new Error('Bad request')
            const likes = await Like.find(videoOrComment)       
            res.status(200).json({
                success: true,
                statusCode:200,
                likes,
            });          
        } catch (err) {           
            res.json({message: err.message})        
        }
    },

    //getting dislikes for video or comment according to request input
    async getDislikes(req, res) {
        try {       
            const videoOrComment = {}
            if(req.body.videoId){
                videoOrComment = { videoId: req.body.videoId }
            } else if(req.body.commentId){
                videoOrComment = { commentId: req.body.commentId }
            } else throw new Error('Bad request')
            const dislikes = await Dislike.find(videoOrComment)       
            res.status(200).json({
                success: true,
                statusCode:200,
                dislikes,
            });          
        } catch (err) {           
            res.json({message: err.message})        
        }
    },

    //saving likes in the database
    liked(req, res) {
               
        const videoOrComment = {}
        if(req.body.videoId && req.body.commentId === undefined){
            videoOrComment = { videoId: req.body.videoId, userId: req.body.userId }
        } else if(req.body.commentId && req.body.videId === undefined){
            videoOrComment = { commentId: req.body.commentId, userId: req.body.userId }
        } else throw new Error('Bad request')

        const like = new Like(videoOrComment)
        like.save((err, like)=>{
            if(err) res.json({ success: false, err })
            Dislike.findOneAndDelete(videoOrComment).exec((err, dislike)=>{
                res.json({ success: true })
            })
        })       
    },

    //deleting like from the database in case of unlike
    unLiked(req, res) {
               
        const videoOrComment = {}
        if(req.body.videoId && req.body.commentId === undefined){
            videoOrComment = { videoId: req.body.videoId, userId: req.body.userId }
        } else if(req.body.commentId && req.body.videId === undefined){
            videoOrComment = { commentId: req.body.commentId, userId: req.body.userId }
        } else throw new Error('Bad request')

       
        Like.findOneAndDelete(videoOrComment).exec((err, unlike)=>{
            if(err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })  
    },

    //saving dislikes in the database
    disliked(req, res) {
               
        const videoOrComment = {}
        if(req.body.videoId && req.body.commentId === undefined){
            videoOrComment = { videoId: req.body.videoId, userId: req.body.userId }
        } else if(req.body.commentId && req.body.videId === undefined){
            videoOrComment = { commentId: req.body.commentId, userId: req.body.userId }
        } else throw new Error('Bad request')

        const dislike = new Dislike(videoOrComment)
        dislike.save((err, dislike)=>{
            if(err) res.json({ success: false, err })
            Like.findOneAndDelete(videoOrComment).exec((err, like)=>{
                res.json({ success: true })
            })
        })       
    },    

    //deleting dislike from the database in case of undislike
    unDisliked(req, res) {
               
        const videoOrComment = {}
        if(req.body.videoId && req.body.commentId === undefined){
            videoOrComment = { videoId: req.body.videoId, userId: req.body.userId }
        } else if(req.body.commentId && req.body.videId === undefined){
            videoOrComment = { commentId: req.body.commentId, userId: req.body.userId }
        } else throw new Error('Bad request')

       
        Dislike.findOneAndDelete(videoOrComment).exec((err, unlike)=>{
            if(err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })  
    },
}