const mongoose = require('mongoose')

const URI = process.env.MONGODB_URI
const url = 'mongodb://127.0.0.1:27017/Wenzio'

mongoose.connect(URI || url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(()=> console.log('db connected successfully'))
  .catch((err)=> console.log(err.message))
