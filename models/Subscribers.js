const mongoose = require('mongoose')
const Schema = mongoose.Schema

subscriberSchema = new Schema(
    {
        toUser: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        fromUser: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
        
    },
    { timestamps: true }
)

const Subscriber = mongoose.model("subscriber", subscriberSchema);
  
module.exports = Subscriber;
