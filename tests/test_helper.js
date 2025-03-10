
const Blog = require('../models/blog')
const User = require('../models/user')


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
    }
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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}