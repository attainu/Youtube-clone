
const { Sequlize,DataTypes} = require("sequelize")
const db = require("../db");

const lkSchema = db.define(
    "Likes",     {
        lk_userId: {
            type: DataTypes.STRING,
            required:true      
        },
       lk_videoId: {
        type: DataTypes.STRING,
        required:true
    },
        lk_commentId: {
            type: DataTypes.STRING,
            required:true
            },
        
    },
    { timestamps: true },
    { tableName:"likes"}
)
  
module.exports = lkSchema;

