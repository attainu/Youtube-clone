const express = require('express')
const userRoutes = require('./routes/userRoutes')
const videoRoutes = require('./routes/videoRoutes')
const subscribeRoutes = require('./routes/subscribeRoutes')
const commentRoutes = require('./routes/commentRoutes')
const likeRoutes = require('./routes/likeRoutes');
require('dotenv').config();
const db = require('./db');
// require('./elephantSQL');

db.authenticate()
    .then(()=> console.log('Database connected'))
    .catch(err => console.log(err.message))


const app = express()
//app.use(apiRoutes)
app.use(express.json())
app.use(userRoutes)
app.use(videoRoutes)
app.use(subscribeRoutes)
app.use(commentRoutes)
app.use(likeRoutes)


db.sync({}).then(()=> {
    console.log('Database connected')
    app.listen(8081, ()=>{
        console.log('Get Set Gooooo!!!')
    })
})
.catch(err => console.log(err.message))
