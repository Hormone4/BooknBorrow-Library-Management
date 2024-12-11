// controllers/booklibrarymapping.route.js
const express = require('express');
const router = express.Router();
const bookLibraryMappingRepo = require('../utils/booklibrarymapping.repository');
const auth = require("../utils/user.auth");

router.get('/list', mappingListAction);
router.get('/show/:mappingId', mappingShowAction);
router.get('/del/:mappingId', auth.authorizeRequest("ADMIN"), mappingDelAction);
router.post('/update/:mappingId', auth.authorizeRequest("ADMIN"), mappingUpdateAction);
router.get('/listnames', mappingListWithNamesAction);
router.get('/bookname/:mappingId', bookNameByMappingAction);

async function mappingListWithNamesAction(request, response) {
    var mappings = await bookLibraryMappingRepo.getAllBookLibraryMappingsWithNames();
    response.send(JSON.stringify(mappings));
}

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

async function bookNameByMappingAction(request, response) {
    var bookName = await bookLibraryMappingRepo.getBookNameByBookLibraryMappingId(request.params.mappingId);
    response.send(JSON.stringify(bookName));
}

async function mappingDelAction(request, response) {
    var numRows = await bookLibraryMappingRepo.delOneBookLibraryMapping(request.params.mappingId);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}

async function mappingUpdateAction(request, response) {
    try {
        if (!request.body) {
            return response.status(400).json({ error: 'No data provided in request body' });
        }

        const mappingId = request.params.mappingId;
        let result;

        if (mappingId === "0") {
            // Add new Mapping
            const newMappingId = await bookLibraryMappingRepo.addOneBookLibraryMapping(
                request.body.book_id,
                request.body.library_id,
                request.body.book_status
            );
            result = { mappingId: newMappingId, message: 'Mapping added successfully' };
        } else {
            // Update existing Mapping
            const numRows = await bookLibraryMappingRepo.editOneBookLibraryMapping(
                mappingId,
                request.body.book_id,
                request.body.library_id,
                request.body.book_status
            );
            result = { rowsUpdated: numRows };
        }

        response.json(result);
    } catch (error) {
        response.status(500).json({ error: 'Failed to process request' });
    }
}

module.exports = router;
