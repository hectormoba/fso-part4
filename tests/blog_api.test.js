const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const { initialBlogPosts, newPost } = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const apiURL = '/api/blogs'

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const post of initialBlogPosts) {
    const postObject = new Blog(post)
    await postObject.save()
  }
})

describe('A call to blogs endpoint', () => {
  test('returns as a json', async () => {
    await api.get(apiURL)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('has expected amount of blogs inside', async () => {
    const response = await api.get(apiURL)

    expect(response.body).toHaveLength(initialBlogPosts.length)
  })

  test('shows that a id property is defined', async () => {
    const response = await api.get(apiURL)

    expect(response.body[0].id).toBeDefined()
  })
})

describe('adding a new blog post', () => {
  test('creates and stores a new db document', async () => {
    await api
      .post(apiURL)
      .send(newPost)
    const response = await api.get(apiURL)
    expect(response.body).toHaveLength(initialBlogPosts.length + 1)
  })
})

describe('deleting a note', () => {
  test('succeeds with valid data', async () => {
    const blogsInDb = await api.get(apiURL)
    await api.delete(`${apiURL}/${blogsInDb.body[0].id}`)
    const actualBlogsInDb = await api.get(apiURL)

    expect(actualBlogsInDb.body).toHaveLength(blogsInDb.body.length - 1)
  })
})

describe('updating an existing blog', () => {
  test('succeds and returns diferent data', async () => {
    const updatedPost = initialBlogPosts[0]
    updatedPost.likes = 10
    await api
      .post(`${apiURL}/${initialBlogPosts[0]._id.toString()}`)
      .send(updatedPost)
    const blogs = await api.get(apiURL)
    expect(blogs.body[0].likes).toBe(updatedPost.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
