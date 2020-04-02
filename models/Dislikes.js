const mongoose = require('mongoose')
const Schema = mongoose.Schema

dislikeSchema = new Schema(
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

const Dislike = mongoose.model("dislike", dislikeSchema);
  
module.exports = Dislike;
