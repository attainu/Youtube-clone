
const { Sequlize,DataTypes} = require("sequelize")
const db = require("../db");

//defining the comment Schema
const comSchema = db.define(
    "Comments",   {
        com_content: {
            type: DataTypes.STRING,
        },
        com_writer: {
            type: DataTypes.INTEGER,
            ref: 'user'
        },
        com_videoId: {
            type: DataTypes.INTEGER,
            ref: 'video'
        },
        com_responseTo: {
            type: DataTypes.INTEGER,
            ref: 'user'
        },       
    },
    { timestamps: true },
    { tableName:"Comments"}
)
  
  
//exporting the schema 
module.exports = comSchema;
