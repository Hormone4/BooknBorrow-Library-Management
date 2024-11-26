const express = require('express');
const borrowRepo = require('../utils/borrow.repository');

const router = express.Router();

router.get('/list', borrowListAction);
router.get('/show/:borrowId', borrowShowAction);
router.get('/user/:userId', borrowByUserAction);
router.get('/del/:borrowId', borrowDelAction);
router.post('/update/:borrowId', borrowUpdateAction);
router.post('/return/:borrowId', borrowReturnAction);

async function borrowListAction(request, response) {
    var borrows = await borrowRepo.getAllBorrows();
    response.send(JSON.stringify(borrows));
}

async function borrowShowAction(request, response) {
    var oneBorrow = await borrowRepo.getOneBorrow(request.params.borrowId);
    response.send(JSON.stringify(oneBorrow));
}

async function borrowByUserAction(request, response) {
    var userBorrows = await borrowRepo.getBorrowsByUserId(request.params.userId);
    response.send(JSON.stringify(userBorrows));
}

async function borrowDelAction(request, response) {
    var numRows = await borrowRepo.delOneBorrow(request.params.borrowId);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}

async function borrowUpdateAction(request, response) {
    try {
        if (!request.body) {
            return response.status(400).json({ error: 'No data provided in request body' });
        }

        const borrowId = request.params.borrowId;
        let result;

        if (borrowId === "0") {
            // Add new Borrow
            const newBorrowId = await borrowRepo.addOneBorrow(
                request.body.book_library_mapping_id,
                request.body.user_id,
                request.body.borrow_borrowDate,
                request.body.borrow_returnDate
            );
            result = { borrow_id: newBorrowId, message: 'Borrow added successfully' };
        }

        else {
            // Update existing Borrow
            const numRows = await borrowRepo.editOneBorrow(
                borrowId,
                request.body.book_library_mapping_id,
                request.body.user_id,
                request.body.borrow_borrowDate,
                request.body.borrow_returnDate,
                request.body.borrow_actualReturnDate,
                request.body.borrow_status,
                request.body.borrow_fine
            );
            result = { rowsUpdated: numRows };
        }

        response.json(result);
    } catch (error) {
        response.status(500).json({ error: 'Failed to process request' });
    }
}

async function borrowReturnAction(request, response) {
    try {
        if (!request.body || !request.body.actualReturnDate) {
            return response.status(400).json({ error: 'Return date is required' });
        }

        const numRows = await borrowRepo.returnBorrow(
            request.params.borrowId,
            request.body.actualReturnDate
        );

        const result = { rowsUpdated: numRows };
        response.json(result);
    } catch (error) {
        response.status(500).json({ error: 'Failed to process return' });
    }
}

module.exports = router;