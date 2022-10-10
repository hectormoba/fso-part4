const { MONGO_URL } = require('../utils/config')
const mongoose = require('mongoose')

mongoose
  .connect(MONGO_URL)
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

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
