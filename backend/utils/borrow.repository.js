const { verifyInput } = require('../utils/inputvalidation');

require('dotenv').config();
const os = process.env.OS;
let path = __dirname + "\\db.include.js";
if (os === 'l') {
    path = __dirname + "/db.include.js";  // Linux path
} else if (os === 'w') {
    path = __dirname + "\\db.include.js";  // Windows path
}
pool = require(path);

module.exports = {
    getBlankBorrow() {
        return {
            "borrow_id": 0,
            "book_library_mapping_id": 0,
            "user_id": 0,
            "borrow_borrowDate": new Date().toISOString().slice(0, 10),
            "borrow_returnDate": new Date().toISOString().slice(0, 10),
            "borrow_actualReturnDate": null,
            "borrow_status": 'borrowed',
            "borrow_fine": 0
        };
    },

    async getAllBorrows() {
        try {
            let sql = "SELECT * FROM borrow";
            const [rows, fields] = await pool.execute(sql);
            rows.forEach(row => {
                row.borrow_borrowDate = row.borrow_borrowDate.toISOString().slice(0, 10);
                row.borrow_returnDate = row.borrow_returnDate.toISOString().slice(0, 10);
                if (row.borrow_actualReturnDate) {
                    row.borrow_actualReturnDate = row.borrow_actualReturnDate.toISOString().slice(0, 10);
                }
            });
            console.log("Borrows FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async getOneBorrow(borrow_id) {
        try {
            // verify input
            borrow_id = verifyInput(borrow_id);

            let sql = "SELECT * FROM borrow WHERE borrow_id = ?";
            const [rows, fields] = await pool.execute(sql, [borrow_id]);
            if (rows.length === 1) {
                rows[0].borrow_borrowDate = rows[0].borrow_borrowDate.toISOString().slice(0, 10);
                rows[0].borrow_returnDate = rows[0].borrow_returnDate.toISOString().slice(0, 10);
                if (rows[0].borrow_actualReturnDate) {
                    rows[0].borrow_actualReturnDate = rows[0].borrow_actualReturnDate.toISOString().slice(0, 10);
                }
                return rows[0];
            }
            return false;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async getBorrowsByUserId(user_id) {
        try {
            // verify input
            user_id = verifyInput(user_id);

            let sql = "SELECT * FROM borrow WHERE user_id = ?";
            const [rows, fields] = await pool.execute(sql, [user_id]);
            rows.forEach(row => {
                row.borrow_borrowDate = row.borrow_borrowDate.toISOString().slice(0, 10);
                row.borrow_returnDate = row.borrow_returnDate.toISOString().slice(0, 10);
                if (row.borrow_actualReturnDate) {
                    row.borrow_actualReturnDate = row.borrow_actualReturnDate.toISOString().slice(0, 10);
                }
            });
            console.log("User Borrows FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },


    async addOneBorrow(book_library_mapping_id, user_id, borrow_borrowDate, borrow_returnDate) {
        try {
            // verify input
            book_library_mapping_id = verifyInput(book_library_mapping_id);
            user_id = verifyInput(user_id);
            borrow_borrowDate = verifyInput(borrow_borrowDate);
            borrow_returnDate = verifyInput(borrow_returnDate);

            let sql = "INSERT INTO borrow (book_library_mapping_id, user_id, borrow_borrowDate, borrow_returnDate, borrow_status) VALUES (?, ?, ?, ?, 'borrowed')";
            const [okPacket, fields] = await pool.execute(sql, [book_library_mapping_id, user_id, borrow_borrowDate, borrow_returnDate]);
            
            // Update book status in bookLibraryMapping
            sql = "UPDATE bookLibraryMapping SET book_status = 'borrowed' WHERE book_library_mapping_id = ?";
            [okPacket, fields] = await pool.execute(sql, [book_library_mapping_id]);

            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async returnBorrow(borrow_id, actualReturnDate) {
        try {
            // verify input
            borrow_id = verifyInput(borrow_id);
            actualReturnDate = verifyInput(actualReturnDate);

            // Get the borrow record to check return date
            let sql = "SELECT borrow_returnDate, book_library_mapping_id FROM borrow WHERE borrow_id = ?";
            let [rows, fields] = await pool.execute(sql, [borrow_id]);
            
            if (rows.length === 0) return false;

            const returnDate = new Date(rows[0].borrow_returnDate);
            const actualReturn = new Date(actualReturnDate);
            const book_library_mapping_id = rows[0].book_library_mapping_id;
            
            // Calculate fine if return is late (difference in days * fine per day)
            let fine = 0;
            if (actualReturn > returnDate) {
                const diffTime = Math.abs(actualReturn - returnDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                fine = diffDays * 5; // Assuming $5 per day fine
            }

            // Update the borrow record
            sql = "UPDATE borrow SET borrow_actualReturnDate = ?, borrow_status = ?, borrow_fine = ? WHERE borrow_id = ?";
            const [okPacket] = await pool.execute(sql, [actualReturnDate, fine > 0 ? 'overdue' : 'returned', fine, borrow_id]);

            // Update book status in bookLibraryMapping
            sql = "UPDATE bookLibraryMapping SET book_status = 'available' WHERE book_library_mapping_id = ?";
            await pool.execute(sql, [book_library_mapping_id]);

            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async editOneBorrow(borrow_id, book_library_mapping_id, user_id, borrow_borrowDate, borrow_returnDate) {
        try {
            // verify input
            borrow_id = verifyInput(borrow_id);
            book_library_mapping_id = verifyInput(book_library_mapping_id);
            user_id = verifyInput(user_id);
            borrow_borrowDate = verifyInput(borrow_borrowDate);
            borrow_returnDate = verifyInput(borrow_returnDate);

            let sql = "UPDATE borrow SET book_library_mapping_id = ?, user_id = ?, borrow_borrowDate = ?, borrow_returnDate = ? WHERE borrow_id = ?";
            const [okPacket] = await pool.execute(sql, [book_library_mapping_id, user_id, borrow_borrowDate, borrow_returnDate, borrow_id]);

            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
        },

    async delOneBorrow(borrow_id) {
        try {
            // verify input
            borrow_id = verifyInput(borrow_id);

            // Get the book_library_mapping_id before deleting
            let sql = "SELECT book_library_mapping_id FROM borrow WHERE borrow_id = ?";
            const [rows] = await pool.execute(sql, [borrow_id]);
            
            if (rows.length > 0) {
                const book_library_mapping_id = rows[0].book_library_mapping_id;
                
                // Delete the borrow record
                sql = "DELETE FROM borrow WHERE borrow_id = ?";
                const [okPacket] = await pool.execute(sql, [borrow_id]);

                // Update book status back to available
                sql = "UPDATE bookLibraryMapping SET book_status = 'available' WHERE book_library_mapping_id = ?";
                await pool.execute(sql, [book_library_mapping_id]);

                console.log("DELETE " + JSON.stringify(okPacket));
                return okPacket.affectedRows;
            }
            return 0;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};