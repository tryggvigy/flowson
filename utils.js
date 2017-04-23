const fs = require('fs')

const readFile = file => 
  new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) reject(err)
      try {
        resolve(data)
      } catch (exception) {
        reject(exception)
      }
    })
  })

module.exports = {
  readFile,
}