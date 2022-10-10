const blogs = require('../utils/blogsData').blogs

const initialBlogPosts = [blogs[0], blogs[1]]

const newPost = blogs[2]

module.exports = {
  initialBlogPosts,
  newPost
}
