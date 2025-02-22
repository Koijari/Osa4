
const mostBlogs = (blogs) => {
    if (!Array.isArray(blogs) || blogs.length === 0) {
      return null;
    }
  
    const counts = blogs.reduce((acc, blog) => {
      acc[blog.author] = (acc[blog.author] || 0) + 1;
      return acc;
    }, {});
  
    const topAuthor = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
  
    return { author: topAuthor, blogs: counts[topAuthor] };
  };
  
  module.exports = { mostBlogs };
  