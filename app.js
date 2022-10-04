const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const { MONGO_URL } = require('./utils/config')

mongoose
  .connect(MONGO_URL)
  .then((_) => {
    console.log('connected')
  })
  .catch((error) => {
    console.log('error connecting', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app
