const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const Schema = mongoose.Schema

userSchema = new Schema(
    {
        email: {
            unique: true,
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        
        password: {
            type: String,
            required: true,
            trim: true
        },
        verified: {
            type: Boolean,
            default: false
        },
        accessToken: {
          type: String
        }
    },
    { timestamps: true }
)

userSchema.statics.findByEmailAndPassword = async(email, password)=>{
  try{
    const user = await User.findOne({ "email": email})
    //console.log('user----', user)
    //console.log('user.pass = ', user.password, ' pass = ', password)
    if(!user) throw new Error('Invalid Credentials')
    const isMatched = await bcrypt.compare(password, user.password)
    //console.log('ismatched======', isMatched)
    if(!isMatched) throw new Error('Invalid Credentials')
    return user
  } catch(err) {
    err.name = 'AuthError'
    throw err
  } 
}

userSchema.statics.removeToken = async(token)=>{
  try{
    const user = await User.findOne({accessToken: token})
    user.accessToken = null
    console.log(user)
    await user.save()
    return user
  } catch(err) {
    console.log(err.message)
  }
}

userSchema.methods.createToken = async function(token){
  const user = this
  const accessToken = await sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h'})
  user.accessToken = accessToken
  await user.save()
  return accessToken
}

userSchema.pre("save",async function(next) {
    const user = this

    try{
      if(user.isModified('password')){
        const hashedpass = await bcrypt.hash(user.password, 10)
        user.password = hashedpass
        next()
      }
    } catch(err) {
      console.log(err.message)
      next(err)
    }
    
  });

  
  const User = mongoose.model("user", userSchema);
  
  module.exports = User;
