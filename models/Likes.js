const mongoose = require('mongoose')
const Schema = mongoose.Schema

likeSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        videoId: {
            type: Schema.Types.ObjectId,
            ref: 'video'
        },
        commentId: {
            type: Schema.Types.ObjectId,
            ref: 'comment'
        },
        
    },
    { timestamps: true }
)

const Like = mongoose.model("like", likeSchema);
  
module.exports = Like;
