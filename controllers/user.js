const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const containAtLeastXChar = require('../utils/list_helper').containAtLeastXChar

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1, id: 1 })
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (!(containAtLeastXChar(username, 3) && containAtLeastXChar(password, 3))) {
    return res.status(400).json({
      error: 'username or password have to be at least 3 characters long'
    })
  }

  const existingUser = await User.findOne({ username })

  console.log(existingUser)

  if (existingUser) {
    return res.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    password: passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = userRouter
