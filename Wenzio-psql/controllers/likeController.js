const Like = require('../models/Likes');
const Dislike = require('../models/Dislikes');

const controller = {};

controller.getLikes=async(req, res)=>{
    try { 
        // console.log(req.body.videoId)      
        var videoOrComment = {}
        if(req.body.videoId){
            videoOrComment = { videoId: req.body.videoId }
        } else if(req.body.commentId){
            videoOrComment = { commentId: req.body.commentId }
        } else throw new Error('Bad request')

        console.log(videoOrComment)
        const likes = await Like.findOne({
            where:{
                lk_videoId:3
            }
        })       
        res.status(200).json({
            success: true,
            statusCode:200,
            likes,
        });          
    } catch (err) {           
        console.log(err.message)       
    }       
}

controller.liked= async(req, res)=>{
    const videoOrComment = {}
    if(req.body.videoId && req.body.commentId !== undefined){
        videoOrComment = { videoId: req.body.videoId, userId: req.body.userId }
    } else if(req.body.commentId && req.body.videoId !== undefined){
        videoOrComment = { commentId: req.body.commentId, userId: req.body.userId }
    } else throw new Error('Bad request')
        const like = new Like(videoOrComment)
        like.save((err, like)=>{
        if(err) res.json({ success: false, err })
            Dislike.findOneAndDelete(videoOrComment).exec((err, dislike)=>{
            res.json({ success: true })
        })
    })
}

module.exports = controller;