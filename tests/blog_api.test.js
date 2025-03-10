
const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })
  
  test('user creation fails if username or password is too short', async (t) => {
    const invalidUser = {
      username: 'SR',
      name: 'SuperRat',
      password: '42',
    }
  
    const response = await api
      .post('/api/users')
      .send(invalidUser)
  
    assert.strictEqual(response.status, 400)
    assert.strictEqual(
      response.body.error,
      'Username and password must be at least 3 characters long'
    )
  })  

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'KingRat',
      name: 'Rat King',
      password: 'topSekret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
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
  /*
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
}); */
  
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
/*
test('returns 401 if token is missing', async () => {
  const response = await api
    .post('/api/blogs')
    .send({
      title: 'Rat title',
      author: 'Rat author',
      url: 'http://testrat.url',
    })
    .expect(401)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.error, 'Token missing')
}) 
*/
after(async () => {
  await mongoose.connection.close()
})