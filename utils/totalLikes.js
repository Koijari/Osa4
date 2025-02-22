
const totalLikes = (blogs) => {
  //console.log(blogs)
  
  if (!Array.isArray(blogs)) {
    return 0 // Palautetaan 0, jos taulukossa ei ole elementtejä
  }
  
  return blogs.reduce((sum, blog) => sum + Number(blog.likes || 0), 0) // likes-palautus tai 0, jos ei arvoja
}

module.exports = { totalLikes }
