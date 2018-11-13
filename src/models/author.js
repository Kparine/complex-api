const uuid = require('uuid/v4')
const readAuthors = require('./utils.js').readAuthors
const writeAuthors = require('./utils.js').writeAuthors
const readBooks = require('./utils.js').readBooks
const writeBooks = require('./utils.js').writeBooks

//app.get
function getAllAuthors(bookId) {
  const books = readBooks()
  const book = books.find(ele => ele.id === bookId)

  if (!book) {
    errors.push(`book with ${bookId} not found`)
    return {
      errors
    }
  }
  // no console.logs' in final submissions
  console.log(books)
  const authors = readAuthors()

  const data = book.author
    .map(authorId => authors.find(a => a.id === authorId))
    .filter(_ => _)
  return data
}

//app.post
function createAuthor(bookId, body) {
  const firstName = body.firstName
  const lastName = body.lastName
  const id = uuid()
  const errors = []


  if (!firstName) {
    errors.push('first name is required')
  }
  if (!lastName) {
    errors.push('last name is required')
  }
  if (errors.length) return {
    errors
  }

  const books = readBooks()

  const book = books.find(ele => ele.id === bookId)
  if (!book) {
    return {
      errors
    }
  }

  book.author.push(id)
  writeBooks(books)

  const authors = readAuthors()
  const author = {
    id,
    firstName,
    lastName
  }
  authors.push(author)
  writeAuthors(authors)

  return author
}

//app.get
function getOneAuthor(bookId, authorId) {
  const errors = []
  const books = readBooks()
  const book = books.find(ele => ele.id === bookId)

  if (!book) {
    errors.push(`book with ${bookId} not found`)
    return {
      errors
    }
  }
  const authors = readAuthors()
  const author = authors.find(author => author.id === authorId)

  if (!author) {
    errors.push(`author with ${authorId} not found`)
    return {
      errors
    }
  } else {
    return author
  }
}

//app.patch
function updateAuthor(bookId, authorId, updates) {
  const errors = []
  const books = readBooks()
  const book = books.find(ele => ele.id === bookId)

  if (!book) {
    errors.push(`book with ${bookId} not found`)
    return {
      errors
    }
  }
  const authors = readAuthors()
  const author = authors.find(ele => ele.id === authorId)

  if (!book.authors.includes(author)) {
    errors.push(`book with ${bookId} does not have author with ${authorId}`)
    return {
      errors
    }
  }

  if (!author) {
    errors.push(`author with ${authorId} not found`)
    return {
      errors
    }
  }

  author.firstName = updates.firstName
  author.lastName = updates.lastName

  writeAuthors(authors)
  return author
}

//app.delete
function deleteAuthor(id, authorId, name) {
  const errors = []
  const authors = readAuthors()
  const idx = authors.findIndex(author => author.id === authorId)

  let response
  if (idx === -1) {
    errors.push(`author with ${authorId} not found`)
    return {
      errors
    }
  } else {
    const author = {
      id: uuid(),
      name
    }
    authors.splice(idx, 1)
    writeAuthors(authors)
    response = author
  }
  return response
}

module.exports = {
  getAllAuthors,
  createAuthor,
  getOneAuthor,
  updateAuthor,
  deleteAuthor
}