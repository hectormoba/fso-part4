const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((previous, current) => previous + current.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? 'No blogs added yet'
    : blogs.length === 1
      ? blogs[0]
      : [...blogs].sort((a, b) => b.likes - a.likes)[0]
}

const containAtLeastXChar = (string, numOfChar) => string.length >= numOfChar

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  containAtLeastXChar
}
