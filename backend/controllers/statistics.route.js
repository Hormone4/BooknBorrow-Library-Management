const express = require('express');
const router = express.Router();
const statisticsRepo = require('../utils/statistics.repository');

router.get('/most-borrowed/:limit?', async (req, res) => {
    try {
        const limit = req.params.limit || 5;
        const result = await statisticsRepo.getMostBorrowedBooks(limit);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/overdue-by-library', async (req, res) => {
    try {
        const result = await statisticsRepo.getOverdueBorrowsByLibrary();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/library-availability', async (req, res) => {
    try {
        const result = await statisticsRepo.getLibraryAvailabilityStats();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.get('/monthly-stats', async (req, res) => {
    try {
        const result = await statisticsRepo.getMonthlyBorrowStats();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;