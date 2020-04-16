const User = require('../models/Users')
const { verify } = require('jsonwebtoken')

var middleware={};

 middleware.authentication=async (req, res, next) => {
    var authToken = req.header('Authorization')
    if(authToken){
        try {
            const decode = verify(authToken, process.env.EMAIL_SECRET);
            //console.log(decode.email)
            const user = await User.findOne({
                 where: { 
                     accessToken:authToken
                    } 
            })
            if(user==null){
                return res.status(401).json({message:"Access denied, please login first"})
            }
            else{
                if(user.isLoggedIn==true){
                    req.user = user
                    next()
                }
                else{
                    return res.status(401).json({message:"Access denied"})
                }
            }                   
        }
        catch (e) {
            return res.json({message:e.message});
        }
    }
    else{
        return res.status(401).json({message:"Access denied"})
    }
}

module.exports = middleware