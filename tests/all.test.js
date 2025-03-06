
const { test, describe } = require('node:test')
const assert = require('node:assert')
const { info } = require('../utils/logger')
const { dummy } = require('../utils/list_helper')
const { totalLikes } = require('../utils/totalLikes')
const { favoriteBlog } = require('../utils/favoriteBlog')
const { mostBlogs } = require('../utils/mostBlogs')
const { mostLikes } = require('../utils/mostLikes')

const blogs = [
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

describe('dummy', () => {
  test('dummy returns one', () => {
    const result = dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

describe('totalLikes', () => {
  test('Sum all likes', () => {  
    const result = totalLikes(blogs)
    //info(result)
    assert.strictEqual(result, 19)
  })

  test('null if no blogs', () => {
    const blogs = []
    const result = mostBlogs(blogs)
    assert.strictEqual(result, null)
  })
})

describe('favoriteBlog', () => {
  test('The blog with most likes', () => {
    const result = favoriteBlog(blogs)
    //info(result)
    assert.deepStrictEqual(result,    // huom. deepStrictEqual: vertailee sisältöä, ei muistiosoitetta
      { 
        title : "Ultimate", 
        author : "UltimateRat", 
        url : "http://cheesetobite.all/noleftovers", 
        likes : "7" 
    })
  })

  test('null if no likes or no blogs', () => {
    const blogs = {}
    const result = favoriteBlog(blogs)
    assert.deepStrictEqual(result, null)
  })
})

describe('mostBlogs', () => {
  test('The author with the most blogs', () => {
    const result = mostBlogs(blogs)
    //info(result)
    assert.deepStrictEqual(result, { author: 'RandomRat', blogs: 2 })
  })

  test('null if the list is empty', () => {
    const blogs = []
    const result = mostBlogs(blogs)
    assert.strictEqual(result, null)
  })
})


info('Tests passed =)')