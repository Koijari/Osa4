
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog({
    title : body.title, 
    author : body.author, 
    url : body.url, 
    likes : body.likes || 0
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.get('/', async (request, response) => {
  const blog = await Blog.find(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const paivitettyBlogi = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true } // validaattori
  );

  if (paivitettyBlogi) {
    response.json(paivitettyBlogi);
  } else {
    response.status(404).json({ error: 'Blogia ei löydy' });
  }
});


module.exports = blogsRouter