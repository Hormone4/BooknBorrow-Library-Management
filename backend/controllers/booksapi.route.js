// NO SQL CODE IN THE CONTROLLER, ONLY CALLS TO REPOSITORY
// there has to be something between the controller and the database

// controllers/booknborrowapi.route.js
const express = require('express');
const router = express.Router();
const bookRepo = require('../utils/books.repository');




router.get('/list', bookListAction); //Works
router.get('/show/:bookId', bookShowAction); // works
router.get('/del/:bookId', bookDelAction); // need to add check to see if no book_id is used as foreign key
router.post('/update/:bookId', bookUpdateAction);



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
    // var json = JSON.stringify(request.body); // bodyParser can process json in body + regular POST form input too
    // console.log(json);
    // TODO: !!! INPUT VALIDATION !!!
    var bookId = request.params.bookId;
    if (bookId==="0") bookId = await bookRepo.addOneBook(request.body.book_brand);
    var isFancy = (request.body.book_isFancy === undefined || request.body.book_isFancy === false) ? 0 : 1;
    var numRows = await bookRepo.editOneBook(bookId,
        request.body.book_name,
        request.body.book_author,
        request.body.book_description,
        request.body.book_publicationDate,
        request.body.book_isbn,
        request.body.book_imageFileName);
    let result = { rowsUpdated: numRows };
    response.send(JSON.stringify(result));
}

module.exports = router;