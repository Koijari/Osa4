
const Blog = require('../models/blog')

const initialBlogs = [
    {
        "title" : "Random",
        "author" : "RandomRat",
        "url" : "http://cheesetobite.not/whynot",
        "likes" : "4"
    },
    {
        "title" : "Defined",
        "author" : "DefinedRat",
        "url" : "http://cheesetobite.yes/ohyes",
        "likes" : "6"
    },
    {
        "title" : "Ultimate",
        "author" : "UltimateRat",
        "url" : "http://cheesetobite.all/noleftovers",
        "likes" : "7"
    },
    {
        "title" : "Randomizer",
        "author" : "RandomRat",
        "url" : "http://cheesetobite.dns/whymeagain",
        "likes" : "2"
    },
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}