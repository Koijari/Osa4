
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

describe('DELETE /api/blogs/:id', () => {
  test('poistaa blogin ja palauttaa 204', async () => {
    const poistoBlogi = new Blog({
      title: 'Poistettava blogi',
      author: 'DeletorRat',
      url: 'http://gonegone.go.',
      likes: 3
    })
    const tallennetutBlogit = await poistoBlogi.save()

    await api
      .delete(`/api/blogs/${tallennetutBlogit.id}`)
      .expect(204)

    const blogitJaljella = await Blog.find({})
    const blogiIDt = blogitJaljella.map(b => b.id)
    assert.strictEqual(blogiIDt.includes(tallennetutBlogit.id), false)
  })
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
    assert.deepStrictEqual(finalLength, initialLength + 1)
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

      assert.strictEqual(response.body.likes, 0)
  });
});
  
describe('PUT /api/blogs/:id', () => {
  test('päivittää blogin ja palauttaa sen', async () => {

    const uusiBlogi = new Blog({
      title: 'Muokattava blogi',
      author: 'TestRat',
      url: 'http://testi.com',
      likes: 3
    });
    const savedBlog = await uusiBlogi.save()

    const paivitettyBlogi = {
      title: 'Päivitetty blogi',
      author: 'ModifierRat',
      url: 'http://updated.com',
      likes: 7
    }

    const response = await api
      .put(`/api/blogs/${savedBlog.id}`)
      .send(paivitettyBlogi)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.title, paivitettyBlogi.title)
    assert.strictEqual(response.body.author, paivitettyBlogi.author)
    assert.strictEqual(response.body.url, paivitettyBlogi.url)
    assert.strictEqual(response.body.likes, paivitettyBlogi.likes)
  })
})

after(async () => {
  await mongoose.connection.close()
})