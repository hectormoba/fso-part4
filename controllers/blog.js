const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  return res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)

  const result = await blog.save()

  res.status(201).json(result)
})

blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)

  res.status(204).end()
})

blogRouter.post('/:id', async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body)

  res.status(200).end()
})

module.exports = blogRouter
