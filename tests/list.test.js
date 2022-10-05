const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helper')
const blogs = require('../utils/blogsData').blogs

test('dummy returns one', () => {
  const empyBlogsArray = []

  const result = dummy(empyBlogsArray)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('return for an empy array return 0', () => {
    expect(totalLikes([])).toBe(0)
  })

  test('returns for an array with one post return its likes', () => {
    const justOneBlog = [blogs[0]]

    expect(totalLikes(justOneBlog)).toBe(justOneBlog[0].likes)
  })

  test('returns expected result', () => {
    expect(totalLikes(blogs)).toBe(36)
  })
})

describe('favorite likes', () => {
  test('returns a string if a list has 0 items', () => {
    expect(favoriteBlog([])).toMatch(/\D+/)
  })

  test('retruns the unique object if the blogs array has just one blog', () => {
    const justOneBlog = [blogs[0]]

    expect(favoriteBlog(justOneBlog)).toEqual(justOneBlog[0])
  })

  test('returns the expected result', () => {
    expect(favoriteBlog(blogs)).toEqual(blogs[2])
  })
})
