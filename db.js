const mongoose = require('mongoose')

const url = 'mongodb://127.0.0.1:27017/Wenzio'

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(()=> console.log('db connected successfully'))
  .catch((err)=> console.log(err.message))
