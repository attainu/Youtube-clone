const mongoose = require('mongoose')
const Schema = mongoose.Schema

videoSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
            trim: true
        },
        title: {
            type: String,
            required: true,
            maxlength: 100
        },
        description: {
            type: String,
        },
        filePath: {
            type: String
        },
        views: {
            type: Number,
            default: 0
        },
        
    },
    { timestamps: true }
)



  
  const Video = mongoose.model("video", videoSchema);
  
  module.exports = Video;
