const express = require ('express');
const { get } = require('express/lib/request');
const router = express.Router();
const { security } = require('../middleware/security');

const {
    getBooks,
    getBookById,
    updateBook,
    createBook,
    deleteBook,
    pagination
} = require('../controllers/book');

router
    .route('/')
    .get(security, getBooks)
    .post(security, createBook)

router
    .route('/:id')
    .get(security, getBookById)
    .put(security, updateBook)
    .delete(security, deleteBook)

router
    .route('/pagination')
    .post(security, pagination)

module.exports = router;