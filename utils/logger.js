
const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') { 
        console.log(...params)
    }
}
  
const errorMsg = (...params) => {
    if (process.env.NODE_ENV !== 'test') { 
        console.error(...params)
    }
}  
  
module.exports = {
    info,
    errorMsg
}