const uuid = require('uuid/v4')
const readBooks = require('./utils.js').readBooks
const writeBooks = require('./utils.js').writeBooks



//app.get
function getAllBooks(id) {
  const books = readBooks()
  return id ? books.slice(0, id) : books
}

//app.post
function createBook(body) {
  const name = body.title
  const books = readBooks()

  if (!name) {
    return {
      errors: ['title is required']
    }
  }
  if (name.length > 30) {
    return {
      errors: ['name is too long, please shorten name to less than 30 characters']
    }
  }

  const book = {
    id: uuid(),
    name,
    author: [],
    borrowed: true
  }
  books.push(book)
  writeBooks(books)

  return book

}

//app.get
function getOneBook(bookId) {
  const books = readBooks()
  const book = books.find(book => book.id === bookId)
  const errors = []

  if (!book) {
    errors.push(`author with ${bookId} not found`)
    return {
      errors
    }
  } else {
    return book
  }
}


//app.patch
function updateBook(bookId, body) {
  const errors = []
  const name = body.title
  const borrowed = body.borrowed
  const author = body.author
  
  const books = readBooks()
  const book = books.find(book => book.id === bookId)



  let response

  if (!book) {
    errors.push(`book with ${bookId} not found`)
    response = {
      errors
    }
  }

  if (name.length > 30) {
    errors.push(`book name is too long`)
    response = {
      errors
    }
  } else {

    const book = {
      bookId,
      name,
      borrowed,
      author
    }

    books.splice(1, 0, book)
    writeBooks(books)
    response = book
  }
  return response
}

//app.delete
function deleteBook(bookId) {
  const books = readBooks()
  const idx = books.findIndex(book => book.id === bookId)

    books.splice(idx, 1)
    writeBooks(books)
    
  
  return books
}

module.exports = {
  getAllBooks,
  createBook,
  getOneBook,
  updateBook,
  deleteBook
}