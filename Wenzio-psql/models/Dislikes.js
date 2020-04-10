const { Sequlize,DataTypes} = require("sequelize")
const bcrypt = require('bcryptjs')
//const { sign } = require('jsonwebtoken')

//importing the db connection
const db = require("../db");

//defining the DisLikes Schema

const dlSchema = db.define(
    "Dislikes",    {
        dl_userId: {
            type: DataTypes.TEXT,
            ref: 'user'
        },
        dl_videoId: {
            type: DataTypes.TEXT,
            ref: 'user'
          },
        dl_commentId: {
            type: DataTypes.TEXT,
            ref: 'user'
            },
        
    },
    { timestamps: true },
    { tableName:"Dislikes"}
)
  
  
module.exports = dlSchema;
