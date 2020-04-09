const express = require('express')
const userRoutes = require('./routes/userRoutes')
const videoRoutes = require('./routes/videoRoutes')
const subscribeRoutes = require('./routes/subscribeRoutes')
const commentRoutes = require('./routes/commentRoutes')
const cors = require("cors")
const likeRoutes = require('./routes/likeRoutes')
const PORT = process.env.PORT || 8000

require('dotenv').config()
require('./db')

const app = express()
app.use(cors());
app.get("/",(req,res)=>res.send({message:"Welcome to youtube clone API"}))
app.use('/uploads', express.static('uploads'));

app.use(express.json())
app.use(userRoutes)
app.use(videoRoutes)
app.use(subscribeRoutes)
app.use(commentRoutes)
app.use(likeRoutes)


app.listen(PORT, ()=>{
    console.log('Get Set Gooooo!!! on port: ', PORT)
})