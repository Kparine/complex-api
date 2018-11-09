const fs = require('fs')
const path = require('path')

function readBooks() {
  const bookInJSON = fs.readFileSync(path.resolve(__dirname, "./bookModel.json"),"utf-8")
  const bookAsJS = JSON.parse(bookInJSON)
  return bookAsJS
}

function writeBooks(books) {
  const bookAsJSON = JSON.stringify(books, null, 4)
  fs.writeFileSync(path.join(__dirname, "./bookModel.json"), bookAsJSON)
}

function readAuthors() {
  const authorInJSON = fs.readFileSync(path.resolve(__dirname, "./authorModel.json"))
  const authorAsJS = JSON.parse(authorInJSON)
  return authorAsJS
}

function writeAuthors(authors) {
  const authorAsJSON = JSON.stringify(authors, null, 4)
  fs.writeFileSync(path.resolve(__dirname, "./authorModel.json"), authorAsJSON)
}


module.exports = {
  writeBooks,
  readBooks,
  readAuthors,
  writeAuthors
}