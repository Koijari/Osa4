
const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id expected identifier', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
});
  
test('a new blog is added', async () => {
    const initialResponse = await api.get('/api/blogs');
    const initialLength = initialResponse.body.length;
  
    const newBlog = {
      title: "DefinedRandom",
      author: "RandomRat",
      url: "http://areuserious.com",
      likes: 5
    };
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  
    const finalResponse = await api.get('/api/blogs');
    const finalLength = finalResponse.body.length;
    assert.strictEqual(finalLength, initialLength + 1)
  });

  describe('Blog likes default value', () => {
    test('if likes is missing, it is set to 0', async () => {
      const newBlog = {
        title: "No Likes Blog",
        author: "Test Author",
        url: "http://nolikes.com",
      };
  
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
  
        assert.deepStrictEqual(response.body.likes, 0)
    });
  });
  

after(async () => {
  await mongoose.connection.close()
})