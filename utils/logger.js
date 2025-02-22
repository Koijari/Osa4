
const info = (...params) => {
    console.log(...params)
}
  
const errorMsg = (...params) => {
console.error(...params)
}  
  
module.exports = {
    info,
    errorMsg
}