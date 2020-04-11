const User = require('../models/Users');
const {hash, compare} = require('bcryptjs');
const {sign, verify} = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// const sequelize = require('sequelize');
const { Op } = require('sequelize');
require('dotenv').config();
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.G_MAIL,
//       pass: process.env.G_PASS
//     },
//   });
controller = {};
//Controller function for registration
controller.register = async(req, res)=>{
    if((req.body.user_email===undefined || req.body.user_name===undefined || req.body.user_password===undefined)){
        res.status(200).json({message:'Please fill the required details'})
    }
    else{
        //Checking if email already exist in database
        const ifEmailExist = await User.findOne({
            where:{
                user_email:req.body.user_email
            }
        })
        // .then((data)=>{
            //if received email(req.body.email) does not exist in DB then hashing the password and storing it in DB.
            if(!ifEmailExist){
                hash(req.body.user_password, 10).then(hashedPassword=>{
                    const data = {
                        user_name:req.body.user_name,
                        user_email:req.body.user_email,
                        user_password:hashedPassword,
                    };
                    let{user_name, user_email, user_password}=data
                    //Stroing req.body to DB
                    User.create({
                        user_name, user_email, user_password
                    }).then(data1 =>{
                        console.log(data1)
                        //Here using JWT Sign to create a token(so that it can be sent via email for email verification) and for that purpose, a new field has been added to Users model stating isEmailVerified=true/false
                        sign(
                            {
                            email:data1.user_email,
                            id: data1.id,
                            },
                            process.env.EMAIL_SECRET,
                            {
                            expiresIn: '1d',
                            },
                            (err, emailToken) => {
                                if(err)return res.status(500).json({message:err})
                                // const url = `http://localhost:8081/emailConfirmation/${emailToken}`;
                                // const mailOptions = {
                                //     from:process.env.G_MAIL,
                                //     to: data1.user_email,
                                //     subject: 'Email verification',
                                //     html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
                                // };
                                // transporter.sendMail(mailOptions)
                                // .then(data=>res.json({message:data}))
                                // .catch(e=>res.json({message:e}))
                                // //     if (error) {
                                // //         return res.json({message:error});
                                // //     } else {
                                // //         return res.json({message:`Email sent + ${info.response}`});
                                // //     }
                                // // })
                                // // return res.json({message:'A link has been sent to your email address for verification'})
                                User.update({ accessToken:emailToken, isLoggedIn:true}, { where: { user_email:req.body.user_email } })
                                    .then(dat=>{
                                        console.log(dat)
                                        //sending token via res.json
                                        return res.json({message:`Welcome ${data.user_name} to dashboard`, token:emailToken})
                                    })
                                    .catch(e=>console.log(e.message))
                                },
                            )
                    })
                    .catch((e)=>{
                        console.log(e.message)
                        return res.json({message: e})
                    })
                })
            }
            else{
                return res.status(200).json({message:'Email is already in use'})
            }
        // //})
        // .catch(e=>console.log(e.message))
    }
}
//controller function to confirm email verification
// controller.emailConfirmation= async(req, res)=>{
//     console.log(req.params.token)
//   try {
//     const decode = verify(req.params.token, process.env.EMAIL_SECRET);
//     console.log(decode)
//     await User.update({ isEmailVerified: true}, { where: { id:decode.id } });
//   } 
//   catch (e) {
//     return res.status(500).json({message:e.message});
//   }
//   return res.status(200).json({message:"email verified, you can log in now"})
// }
//Controller function for login
controller.login = async(req, res)=>{
    if((req.body.user_email===undefined || req.body.user_password===undefined)){
        res.status(200).json({message:'Please fill the required details'})
    }
    else{
        const data = await User.findOne({
            where:{
                user_email:req.body.user_email
            }
        })
        if(data){
            // if(data.isEmailVerified==true){
                if(data.isLoggedIn == false){
                    compare(req.body.user_password, data.user_password).then((isMatched)=>{
                        if(isMatched){
                            // Once the password is matched, we create a token using JWT sign and also update isLoggedIn value to true
                            sign({
                                email: data.user_email,
                                id:data.id
                              },
                              process.env.EMAIL_SECRET,
                              {
                                expiresIn: '1d',
                              },(err, token) =>{
                                if(err)return res.status(500).send('Server error')
                                console.log(`token: ${token}`)
                                //updating isLoggedIn value to true
                                User.update({ isLoggedIn: true, accessToken:token }, { where: { user_email:req.body.user_email } })
                                    .then(dat=>{
                                        console.log(dat)
                                        //sending token via res.json
                                        return res.json({message:`Welcome ${data.user_name} to dashboard`, token:token})
                                    })
                                    .catch(e=>console.log(e.message))
                              })
                            }
                            else{
                                res.status(404).json({message:'Invalid credentials'})
                            }
                        })
                        .catch(e=>console.log(e.message))
                }
                else{
                    res.json({message:"You're already logged in"})
                }
            // }
            // else{
            //     res.json({message:'Email verification is required to login'})
            // }
        }
        else{
            res.status(404).json({message:'Invalid credentials'})
        }
    }
}
//Controller function for logout
controller.logout = async(req, res)=>{
    const user = req.user
    try {
        await User.update({ isLoggedIn: false, accessToken:null }, { where: { user_email:user.user_email } });
        res.status(400).json({message:'Logged out successfully'})
      } 
      catch (e) {
        return res.status(500).json({message:e.message})
      }
}
//Change password
controller.changePassword = async(req, res)=>{
    try {
        if((req.body.user_email===undefined || req.body.user_password===undefined || req.body.user_newPassword===undefined)){
            res.status(200).json({message:'Please fill the listed details: user_email, user_password, user_newPassword'})
        }
        else{
            const data = await User.findOne({
                where:{
                    user_email:req.body.user_email
                }
            })
            if(data){
                    compare(req.body.user_password, data.user_password).then(async (isMatched)=>{
                        if(isMatched){
                            hash(req.body.user_newPassword, 10).then(async(hashedPassword1)=>{
                                await User.update({user_password: hashedPassword1, isLoggedIn: false, accessToken:null}, { where: { user_email:req.body.user_email } });
                                return res.status(200).json({message:'Password changed successfully'})
                            }) 
                        }
                        else{
                            return res.status(404).json({message:'Invalid credentials/password'})
                        }
                    })
            }
            else{
                return res.status(404).json({message:'Invalid credentials/email'}) 
            }
        }
    }
    catch (e) {
        return res.status(500).json({message:e.message})
      }
}
module.exports= controller ;