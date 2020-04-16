
const { Sequelize, DataTypes} = require("sequelize")
const db = require("../db");

const userSchema = db.define("Users", {
    user_email:{
      type: DataTypes.STRING,
      allowNull: false,
      is:/^\w+([\.-]?\w+)*@\w+([\._]?\w+)*,(\.\w{2,3})+$/,
      isEmail:true, 
     },
     user_name: {
          type: DataTypes.STRING,
          allowNull: false,      
      },
        user_password: {
          type: DataTypes.STRING,
          allowNull: false,
        }, 
        isEmailVerified:{
          type: DataTypes.BOOLEAN,
          defaultValue:false
        },
        isLoggedIn:{
          type:DataTypes.BOOLEAN,
          defaultValue:false
        },
        accessToken: {
          type: DataTypes.STRING,
          defaultValue:null
        }
    },
    { timestamps: true },
    { tableName:"Users"}
)

module.exports = userSchema;