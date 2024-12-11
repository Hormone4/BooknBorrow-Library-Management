const express = require('express');
const router = express.Router();
const libraryRepo = require('../utils/libraries.repository');
const bookRepo = require("../utils/books.repository");
const auth = require("../utils/user.auth");


router.get('/list', libraryListAction); //Works
router.get('/show/:libraryId', libraryShowAction);
router.get('/del/:libraryId', auth.authorizeRequest("ADMIN"), libraryDelAction);
router.post('/update/:libraryId', auth.authorizeRequest("ADMIN"), libraryUpdateAction);
router.get('/listbooks/:libraryId', libraryBooksAction);
router.get('/search/:input', librarySearchAction);

async function libraryListAction(request, response) {
    var libraries = await libraryRepo.getAllLibraries();
    response.send(JSON.stringify(libraries));
}

async function libraryShowAction(request, response) {
    var oneLibrary = await libraryRepo.getOneLibrary(request.params.libraryId);
    response.send(JSON.stringify(oneLibrary));
}

async function libraryDelAction(request, response) {
    var numRows = await libraryRepo.delOneLibrary(request.params.libraryId);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}

async function libraryUpdateAction(request, response) {
    try {
        if (!request.body) {
            return response.status(400).json({ error: 'No data provided in request body' });
        }

        const libraryId = request.params.libraryId;
        let result;

        if (libraryId === "0") {
            // Add new Library
            const newLibraryId = await libraryRepo.addOneLibrary(
                request.body.library_name,
                request.body.library_email,
                request.body.library_phone,
                request.body.library_creationYear,
                request.body.library_zipCode,
                request.body.library_streetName,
                request.body.library_streetNumber
            );
            result = { library_id: newLibraryId, message: 'Library added successfully' };
        } else {
            // Update existing Library
            const numRows = await libraryRepo.editOneLibrary(
                libraryId,
                request.body.library_name,
                request.body.library_email,
                request.body.library_phone,
                request.body.library_creationYear,
                request.body.library_zipCode,
                request.body.library_streetName,
                request.body.library_streetNumber
            );
            result = { rowsUpdated: numRows };
        }

        response.json(result);
    } catch (error) {
        response.status(500).json({ error: 'Failed to process request' });
    }
}

async function libraryBooksAction(request, response) {
    var books = await libraryRepo.getLibraryBooks(request.params.libraryId);
    response.send(JSON.stringify(books));
}

async function librarySearchAction(request, response) {
    var libraries = await libraryRepo.searchForLibrary(request.params.input);
    response.send(JSON.stringify(libraries));
}

module.exports = router;