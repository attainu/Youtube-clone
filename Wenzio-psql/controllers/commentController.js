const Comment = require('../models/Comments')

module.exports = {

    async saveComment(req, res) {
        // const comment = new Comment(req.body)
        const data = {
            com_content:req.body.content,
            com_writer:req.body.writer,
            com_videoId:req.body.videoId,
            com_responseTo:req.body.responseTo
        }
        let{com_content, com_writer, com_videoId, com_responseTo} = data

        const savedFile = await Comment.create({
            com_content, com_writer, com_videoId, com_responseTo
        })
        return res.status(200).json({ success: true, savedFile })

    },

    //fetching all the comments on the video
    async getComments(req, res) {
        try {       
            const comments = await Comment.findOne({where:{com_videoId: req.body.videoId }})        
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