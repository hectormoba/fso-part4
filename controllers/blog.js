const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

const getToken = req => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }

  return null
}

const manageToken = req => {
  const requestToken = getToken(req)
  return jwt.verify(requestToken, SECRET)
}

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  return res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
  const decodedToken = manageToken(req)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = new Blog({ user, ...req.body })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)

  await user.save()

  res.status(201).json(result)
})

blogRouter.get('/:id', async (req, res) => {
  const result = await Blog.findById(req.params.id).populate('user', { username: 1, name: 1, id: 1 })

  res.status(200).json(result)
})

blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)

  res.status(204).end()
})

blogRouter.post('/:id', async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body)

  res.status(200).end()
})

blogRouter.put('/:id', async (req, res) => {
  const decodedToken = manageToken(req)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const result = await Blog.findByIdAndUpdate(req.params.id, { user, ...req.body })

  res.status(201).json(result)
})
module.exports = blogRouter
