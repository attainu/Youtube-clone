const { Sequlize,DataTypes} = require("sequelize")

//importing the db connection
const db = require("../db");

//defining the Videos Schema

const vdoSchema = db.define(
    "Videos",    {
        vdo_owner: {
         type: DataTypes.STRING,
           ref: 'user',
            required: true,
            trim: true
        },
        vdo_title: {
            type: DataTypes.STRING,
            
            required: true,
            maxlength: 100
        },
        vdo_description: {
            type: DataTypes.STRING,
        },
        vdo_filePath: {
            type: DataTypes.STRING,
        },
        vdo_views: {
            type: DataTypes.INTEGER,
        },
        vdo_duration: {
            type: DataTypes.INTEGER,
        }
        
    },
    { timestamps: true },
    { tableName:"Videos"}
)
  
  
module.exports = vdoSchema;
