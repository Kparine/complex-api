const express = require('express')
const router = express.Router({mergeParams: true})
const ctrl = require('../controllers/books.js')

router.get('/', ctrl.getAllAuthors)
router.get('/:authorId', ctrl.getOneAuthor)
router.post('/', ctrl.createAuthor)
router.patch('/:authorId', ctrl.updateAuthor)
router.delete('/:authorId', ctrl.deleteAuthor)


module.exports = router