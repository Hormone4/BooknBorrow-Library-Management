require('dotenv').config();
const os = process.env.OS;
let path = __dirname + "\\db.include.js";
if (os === 'l') {
    path = __dirname + "/db.include.js";  // Linux path
} else if (os === 'w') {
    path = __dirname + "\\db.include.js";  // Windows path
}
pool = require(path)
const { verifyInput } = require('../utils/inputvalidation');

module.exports = {



async getMostBorrowedBooks(limit = 5) {
    try {
        let sql = `
            SELECT b.book_name, b.book_author, COUNT(*) as borrow_count
            FROM borrow br
            JOIN bookLibraryMapping blm ON br.book_library_mapping_id = blm.book_library_mapping_id
            JOIN book b ON blm.book_id = b.book_id
            GROUP BY b.book_id
            ORDER BY borrow_count DESC
            LIMIT ?`;
        const [rows] = await pool.execute(sql, [limit]);
        return rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
},

async getOverdueBorrowsByLibrary() {
    try {
        let sql = `
            SELECT l.library_name, COUNT(*) as overdue_count
            FROM borrow br
            JOIN bookLibraryMapping blm ON br.book_library_mapping_id = blm.book_library_mapping_id
            JOIN library l ON blm.library_id = l.library_id
            WHERE br.borrow_status = 'overdue'
            GROUP BY l.library_id`;
        const [rows] = await pool.execute(sql);
        return rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
},

async getUserBorrowingStats() {
    try {
        let sql = `
            SELECT u.user_name,
                   COUNT(*) as total_borrows,
                   SUM(CASE WHEN br.borrow_status = 'overdue' THEN 1 ELSE 0 END) as overdue_count,
                   SUM(br.borrow_fine) as total_fines
            FROM users u
            JOIN borrow br ON u.user_id = br.user_id
            GROUP BY u.user_id
            ORDER BY total_borrows DESC`;
        const [rows] = await pool.execute(sql);
        return rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
},

async getLibraryAvailabilityStats() {
    try {
        let sql = `
            SELECT l.library_name,
                   COUNT(*) as total_books,
                   SUM(CASE WHEN blm.book_status = 'available' THEN 1 ELSE 0 END) as available_books,
                   SUM(CASE WHEN blm.book_status = 'borrowed' THEN 1 ELSE 0 END) as borrowed_books
            FROM library l
            JOIN bookLibraryMapping blm ON l.library_id = blm.library_id
            GROUP BY l.library_id`;
        const [rows] = await pool.execute(sql);
        return rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
}