const { Sequlize,DataTypes} = require("sequelize");
//const { sign } = require('jsonwebtoken')

//importing the db connection
const db = require("../db");

//defining the Subscribers Schema

const subSchema = db.define(
    "Subscribers",      {
        sub_toUser: {
            type: DataTypes.STRING,
            ref: 'user'
          },
        sub_fromUser: {
            type: DataTypes.STRING,
            ref: 'user'
             }
        
    },
    { timestamps: true },
    { tableName:"Subscribers"}
)

module.exports = subSchema;

