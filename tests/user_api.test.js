const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const { usersInDb } = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const apiURL = '/api/users'

describe('when we try to create a user', () => {
  const testUser = {
    name: 'test',
    username: 'userTest',
    password: 'randompwd'
  }

  beforeEach(async () => {
    await User.deleteMany({})
    const userToSave = new User(testUser)
    await userToSave.save()
  })

  test('a user with a short username or password fails', async () => {
    const invalidUsername = {
      name: 'test1',
      username: 'aa',
      password: 'randompwd'
    }

    const res = await api
      .post(apiURL)
      .send(invalidUsername)
      .expect(400)

    expect(res.body.error).toContain('username or password have to be at least 3 characters long')
  })

  test('that already exist in the DB, the request fails', async () => {
    const res = await api
      .post(apiURL)
      .send(testUser)
      .expect(400)

    expect(res.body.error).toContain('username must be unique')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
