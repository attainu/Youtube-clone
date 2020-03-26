const express = require('express')
const userRoutes = require('./routes/userRoutes')
const apiRoutes = require('./routes/apiRoutes')
//const jwt = require('jsonwebtoken')
require('dotenv').config()
require('./db')

const app = express()

app.use(express.json())
app.use(userRoutes)
app.use(apiRoutes)


app.listen(8080, ()=>{
    console.log('Get Set Gooooo!!!')
})