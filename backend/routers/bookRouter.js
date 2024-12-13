const express = require('express');
const router = express.Router();
const { getAllBooks, createBook, getBookById, deleteBook, updateBook } = require('../controllers/bookController');
const requireAuth = require('../middleware/requireAuth')


// GET all Books
router.get('/', getAllBooks);

// GET a single Book
router.get('/:id', getBookById);

// require auth for the rest of the routes
router.use(requireAuth)

// POST a new Book
router.post('/', createBook);

// DELETE a Book
router.delete('/:id', deleteBook);

// Update Book using PUT
router.put('/:id', updateBook);

module.exports = router;
