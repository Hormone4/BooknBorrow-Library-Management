// NO SQL CODE IN THE CONTROLLER, ONLY CALLS TO REPOSITORY
// there has to be something between the controller and the database

// controllers/booknborrowapi.route.js
const express = require('express');
const router = express.Router();
const bookRepo = require('../utils/books.repository');




router.get('/list', bookListAction); //Works
router.get('/show/:bookId', bookShowAction); // works
router.get('/del/:bookId', bookDelAction); // need to add check to see if no book_id is used as foreign key
router.post('/update/:bookId', bookUpdateAction); // post means that it is a form submission
router.get('/search/:input', bookSearchAction);



async function bookListAction(request, response) {
    var books = await bookRepo.getAllBooks();
    response.send(JSON.stringify(books));
}
async function bookShowAction(request, response) {
    var oneBook = await bookRepo.getOneBook(request.params.bookId);
    response.send(JSON.stringify(oneBook));
}
async function bookDelAction(request, response) {
    var numRows = await bookRepo.delOneBook(request.params.bookId);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}
async function bookUpdateAction(request, response) {
    try {
        if (!request.body) {
            return response.status(400).json({ error: 'No data provided in request body' });
        }

        const bookId = request.params.bookId;
        let result;

        if (bookId === "0") {
            // Add new book
            const newBookId = await bookRepo.addOneBook(
                request.body.book_name,
                request.body.book_author,
                request.body.book_description,
                request.body.book_publicationDate,
                request.body.book_isbn,
                request.body.book_imageFileName
            );
            result = { bookId: newBookId, message: 'Book added successfully' };
        } else {
            // Update existing book
            const numRows = await bookRepo.editOneBook(
                bookId,
                request.body.book_name,
                request.body.book_author,
                request.body.book_description,
                request.body.book_publicationDate,
                request.body.book_isbn,
                request.body.book_imageFileName
            );
            result = { rowsUpdated: numRows };
        }

        response.json(result);
    } catch (error) {
        response.status(500).json({ error: 'Failed to process request' });
    }
}

async function bookSearchAction(request, response) {
    var books = await bookRepo.searchForBook(request.params.input);
    response.send(JSON.stringify(books));
}


module.exports = router;