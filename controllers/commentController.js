const Comment = require('../models/Comments')

module.exports = {

    //saving the comment in database
    saveComment(req, res) {
        const comment = new Comment(req.body)
        comment.save((err, comment)=>{
            if(err) return res.json({ success: false, err })
            Comment.find({ '_id': comment._id }).populate('owner').exec((err, result)=>{
                if(err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
            
        })

    },

    //fetching all the comments on the video
    async getComments(req, res) {
        try {       
            const comments = await Comment.find({ "videoId": req.body.videoId }).populate('owner')         
            res.status(200).json({
                success: true,
                statusCode:200,
                comments,
            });          
        } catch (err) {           
            res.json({message: err.message})        
        }
    },

    
}