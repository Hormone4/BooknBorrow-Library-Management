const express = require('express');
const bookLibraryMappingRepo = require('../utils/booklibrarymapping.repository');

const router = express.Router();

router.get('/list', bookLibraryMappingListAction);
router.get('/show/:mappingId', bookLibraryMappingShowAction);
router.get('/book/:bookId', bookLibraryMappingsByBookAction);
router.get('/library/:libraryId', bookLibraryMappingsByLibraryAction);
router.get('/del/:mappingId', bookLibraryMappingDelAction);
router.post('/add', bookLibraryMappingAddAction);

async function bookLibraryMappingListAction(request, response) {
    try {
        const mappings = await bookLibraryMappingRepo.getAllBookLibraryMappings();
        response.json(mappings);
    } catch (error) {
        response.status(500).json({ error: 'Failed to fetch mappings' });
    }
}

async function bookLibraryMappingShowAction(request, response) {
    try {
        const mapping = await bookLibraryMappingRepo.getOneBookLibraryMapping(request.params.mappingId);
        if (!mapping) {
            return response.status(404).json({ error: 'Mapping not found' });
        }
        response.json(mapping);
    } catch (error) {
        response.status(500).json({ error: 'Failed to fetch mapping' });
    }
}

async function bookLibraryMappingsByBookAction(request, response) {
    try {
        const mappings = await bookLibraryMappingRepo.getBookLibraryMappingsByBookId(request.params.bookId);
        response.json(mappings);
    } catch (error) {
        response.status(500).json({ error: 'Failed to fetch mappings for book' });
    }
}

async function bookLibraryMappingsByLibraryAction(request, response) {
    try {
        const mappings = await bookLibraryMappingRepo.getBookLibraryMappingsByLibraryId(request.params.libraryId);
        response.json(mappings);
    } catch (error) {
        response.status(500).json({ error: 'Failed to fetch mappings for library' });
    }
}

async function bookLibraryMappingDelAction(request, response) {
    try {
        const numRows = await bookLibraryMappingRepo.delOneBookLibraryMapping(request.params.mappingId);
        response.json({ rowsDeleted: numRows });
    } catch (error) {
        response.status(500).json({ error: 'Failed to delete mapping' });
    }
}

async function bookLibraryMappingAddAction(request, response) {
    try {
        if (!request.body || !request.body.book_id || !request.body.library_id) {
            return response.status(400).json({ error: 'Missing required fields' });
        }

        const success = await bookLibraryMappingRepo.addBookLibraryMapping(
            request.body.book_id,
            request.body.library_id
        );

        if (success) {
            response.json({ message: 'Mapping added successfully' });
        } else {
            response.status(500).json({ error: 'Failed to add mapping' });
        }
    } catch (error) {
        response.status(500).json({ error: 'Failed to add mapping' });
    }
}

module.exports = router;