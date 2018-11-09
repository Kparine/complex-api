const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/books.js')

router.get('/', ctrl.getAllBooks)
router.get('/:bookId', ctrl.getOneBook)
router.post('/', ctrl.createBook)
router.put('/:bookId', ctrl.updateBook)
router.delete('/:bookId', ctrl.deleteBook)


module.exports = router