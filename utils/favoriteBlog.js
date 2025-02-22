
const favoriteBlog = (blogs) => {
    if (!Array.isArray(blogs) || blogs.length === 0) {
      return null; // tyhjä taulukko, palauttaa null
    }
  
    // Käytetään reduce-metodia etsimään suurin likes-arvo
    return blogs.reduce((max, blog) => (Number(blog.likes) > Number(max.likes) ? blog : max), blogs[0]);
  };
  
  module.exports = { favoriteBlog };
  