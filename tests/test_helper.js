const blogs = require('../utils/blogsData').blogs
const User = require('../models/user')

const initialBlogPosts = [blogs[0], blogs[1]]

const newPost = blogs[2]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogPosts,
  newPost,
  usersInDb
}
