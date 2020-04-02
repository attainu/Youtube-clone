const express = require('express')
const userRoutes = require('./routes/userRoutes')
const videoRoutes = require('./routes/videoRoutes')
const subscribeRoutes = require('./routes/subscribeRoutes')
const commentRoutes = require('./routes/commentRoutes')
const likeRoutes = require('./routes/likeRoutes')

//const jwt = require('jsonwebtoken')
require('dotenv').config()
require('./db')

const app = express()

app.use(express.json())
//app.use(apiRoutes)
app.use(userRoutes)
app.use(videoRoutes)
app.use(subscribeRoutes)
app.use(commentRoutes)
app.use(likeRoutes)


app.listen(8080, ()=>{
    console.log('Get Set Gooooo!!!')
})