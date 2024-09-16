const mongoose = require('mongoose')
const Schema = mongoose.Schema

commentSchema = new Schema(
    {
        content: {
            type: String
        },
        writer: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        videoId: {
            type: Schema.Types.ObjectId,
            ref: 'video'
        },
        responseTo: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },       
    },
    { timestamps: true }
)
  
const Comment = mongoose.model("comment", commentSchema);
  
module.exports = Comment;
