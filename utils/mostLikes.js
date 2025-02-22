
const mostLikes = (blogs) => {
    if (!Array.isArray(blogs) || blogs.length === 0) {
      return null // Palautetaan null, jos blogeja ei ole
    }
  
    const likesByAuthor = blogs.reduce((acc, blog) => {
      const author = blog.author
      const likes = Number(blog.likes) // Muutetaan likes numeroksi
  
      acc[author] = (acc[author] || 0) + likes
      return acc
    }, {})
  
    const topAuthor = Object.keys(likesByAuthor).reduce((a, b) =>
      likesByAuthor[a] > likesByAuthor[b] ? a : b
    )
  
    return {
      author: topAuthor,
      likes: likesByAuthor[topAuthor]
    }
  }
  
  module.exports = { mostLikes }
  