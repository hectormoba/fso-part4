require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGO_URL

mongoose
  .connect(url)
  .then((_) => {
    console.log('connected')
  })
  .catch((error) => {
    console.log('error connecting', error.message)
  })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = mongoose.model('Blog', blogSchema)
