const User = require('../models/Users')
const transport = require('../email')


module.exports = {

    //Register user function
    async users(req, res){
        try{
            const allUsers = await User.find()
            res.json(allUsers)
        } catch(err) {
            console.log(err)
        }
    },
    async Register(req, res){
        try{
            const user = req.body
            if(!user.email||!user.name||!user.password){
                return res.status(400).send({ message: 'Fill All Required Fields'})
            }
            const newUser = await User.create(user)
            const token = await newUser.createToken()

            const mail = await transport.sendMail({
                from: process.env.SENDER_EMAIL,
                to: 'facebookid100@gmail.com',
                subject: 'Wenzio account confirmation',
                text: `Hello ${user.name}, your account has been created and confirmed successfully. click <a href="#">here</a> to using our service. The link not working yet, work in progress
                
                -Regards Wenzio Team`
            }, (err, data)=>{
                if(err) console.log(err)
                else console.log('email sent')
            })
            newUser.password = "Oh no no no no!!!!"
            
            res.status(201).json({
                statusCode: 201,
                newUser,
                accessToken: token,
                mail,
                expiresIn: '24h'
            })
        } catch(err) {
            console.log(err)
            res.status(500).send('Error')
        }
    },

    //Login user funcion
 
    async Login(req, res) {
        try {
            const {email, password} = req.body;
            if(!email || !password) {
                return res.status(400).json({statusCode:400, message: 'Invalid Credentials'})
            }
            console.log(email, '   pass---', password)
            const user = await User.findByEmailAndPassword(email, password);
            const token = await user.createToken();
            user.password = "Oh no no no no!!!!"
            res.status(200).json({
                statusCode:200,
                user,
                accessToken: token,
                expiresIn: "24h"
            });
            
        } catch (err) {
            if(err.name === 'AuthError'){
                res.json({success: false, message: "Invalid Credentials."})
            }
        }
    },

    //Logout user function

    async Logout (req,res){
        try {
            const token = req.params.token
            const user = await User.removeToken(token);
            user.password = "Oh no no no no!!!!"
            res.json({user, message: 'Logged out successfully'});
            
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Something went wrong!');
        }
        
    },

}