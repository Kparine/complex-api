const authorModel = require('../models/author.js')
const bookModel = require('../models/book.js')

//retreive all books
function getAllBooks(req, res, next){
  const id = req.params.bookId
  const data = bookModel.getAllBooks(id)
  
  // this error checking is not necessary.
  // it will never trigger
  let result = []
  
  if (result.errors) {
    return next({
      status: 400,
      message: `Could not find books`,
      errors: result.errors
    })
  }
 
  res.status(200).json({
    data
  })
}

//Retreive all authors
function getAllAuthors(req, res, next){
  const bookId = req.params.bookId
  const result = authorModel.getAllAuthors(bookId)

  if (result.errors) {
    return next({
      status: 400,
      message: `Could not find authors`,
      errors: result.errors
    })
  }
  
  res.status(200).json({
    data: result
  })
}

//Create a book
function createBook(req, res, next){
  // make sure to remove all console.logs' in your future work
  console.log(req.body)
  const result = bookModel.createBook(req.body)

  if (result.errors) {
    return next({
      status: 400,
      message: `Could not create new book`,
      errors: result.errors
    })
  }

  res.status(201).json({
    data: result
  })
}

//create an author
function createAuthor(req, res, next) {
  const id = req.params.bookId
  const result = authorModel.createAuthor(id, req.body)

  
  if (result.errors) {
    return next({
      status: 400,
      message: `Could not create new author`,
      errors: result.errors
    })
  }

  res.status(201).json({
    data: result
  })
}

//retreive a single book
function getOneBook(req, res, next) {
  const bookId = req.params.bookId
  const result = bookModel.getOneBook(bookId)


  if (result.errors) {
    return next({
      status: 404,
      message: `Could not find book with id of ${bookId}`,
      errors: result.errors
    })
  }

  res.status(200).json({
    data: result
  })
}

//retreive a single author
function getOneAuthor(req, res, next) {
  const bookId = req.params.bookId
  const authorId = req.params.authorId
  const result = authorModel.getOneAuthor(bookId, authorId)
  
  if (result.errors) {
    return next({
      status: 404,
      message: `Could not find author with id of ${authorId}`,
      errors: result.errors
    })
  }

  res.status(200).json({
    data: result
  })
}


function updateBook(req, res, next) {
  const id = req.params.bookId
  const result = bookModel.updateBook(id, req.body)

  if(result.errors) {
    return next({
      status: 404,
      message: `Could not update book with id of ${id}`,
      errors: result.errors
    })
  }
  res.status(200).json({
    data: result
  })
}

function updateAuthor(req, res, next){
  const id = req.params.bookId
  const authorId = req.params.id
  const result = authorModel.updateAuthor(authorId, id, req.body)

  if(result.errors){
    return next ({
      status: 404,
      message: `Could not update author with id of ${authorId}`,
      errors: result.errors
    })
  }
  res.status(200).json({
    data: result
  })
}

//app.delete
function deleteBook(req, res, next) {
  const bookId = req.params.bookId
  const result = bookModel.deleteBook(bookId)

  if (result.errors){
    return next({
      status: 404,
      message: `Could not delete book with id of ${bookId}`,
      errors: result.errors
    })
  }
  res.status(200).json({
    data: result
  })
}

function deleteAuthor(req, res, next){
  const id = req.params.bookId
  const authorId = req.params.authorId
  const result = authorModel.deleteAuthor(id, authorId)

  if (result.errors){
    return next({
      status: 404,
      message: `Could not delete author with ${authorId}`,
      errors: result.errors
    })
  }
  res.status(200).json({
    data: result
  })
}

module.exports = {
  getAllBooks,
  getAllAuthors,
  createBook,
  createAuthor,
  getOneBook,
  getOneAuthor,
  deleteAuthor,
  updateAuthor,
  deleteBook,
  updateBook
}