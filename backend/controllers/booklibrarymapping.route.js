// controllers/booklibrarymapping.route.js
const express = require('express');
const router = express.Router();
const bookLibraryMappingRepo = require('../utils/booklibrarymapping.repository');

router.get('/list', mappingListAction);
router.get('/show/:mappingId', mappingShowAction);
router.get('/book/:bookId', mappingsByBookAction);
router.get('/library/:libraryId', mappingsByLibraryAction);
router.get('/del/:mappingId', mappingDelAction);
router.post('/add', mappingAddAction);

async function mappingListAction(request, response) {
    var mappings = await bookLibraryMappingRepo.getAllBookLibraryMappings();
    response.send(JSON.stringify(mappings));
}

async function mappingShowAction(request, response) {
    var oneMapping = await bookLibraryMappingRepo.getOneBookLibraryMapping(request.params.mappingId);
    response.send(JSON.stringify(oneMapping));
}

async function mappingsByBookAction(request, response) {
    var mappings = await bookLibraryMappingRepo.getBookLibraryMappingsByBookId(request.params.bookId);
    response.send(JSON.stringify(mappings));
}

async function mappingsByLibraryAction(request, response) {
    var mappings = await bookLibraryMappingRepo.getBookLibraryMappingsByLibraryId(request.params.libraryId);
    response.send(JSON.stringify(mappings));
}

async function mappingDelAction(request, response) {
    var numRows = await bookLibraryMappingRepo.delOneBookLibraryMapping(request.params.mappingId);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}

async function mappingAddAction(request, response) {
    try {
        if (!request.body || !request.body.book_id || !request.body.library_id) {
            return response.status(400).json({ error: 'No data provided in request body' });
        }

        const newMapping = await bookLibraryMappingRepo.addBookLibraryMapping(
            request.body.book_id,
            request.body.library_id
        );
        
        let result = { message: 'Mapping added successfully' };
        response.json(result);
    } catch (error) {
        response.status(500).json({ error: 'Failed to process request' });
    }
}

module.exports = router;
