require('dotenv').config();
const os = process.env.OS;
let path = __dirname + "\\db.include.js";
if (os === 'l') {
    path = __dirname + "/db.include.js";  // Linux path
} else if (os === 'w') {
    path = __dirname + "\\db.include.js";  // Windows path
}
pool = require(path)

module.exports = {
    getBlankReservation() {
        return {
            "borrow_id": 0,
            "book_library_mapping_id": 0,
            "reservation_library_id": 0,
            "user_id": ' ',
            "borrow_borrowDate": ' ',
            "borrow_returnDate": ' ',
            "borrow_status": ' ',
            "borrow_fine": 0
        };
    },

    async getAllReservations() {
        try {
            let sql = "SELECT * FROM borrow";
            const [rows, fields] = await pool.execute(sql);
            console.log("Reservations FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async getOneReservation(borrow_id) {
        try {
            let sql = "SELECT * FROM borrow WHERE borrow_id = ?";
            const [rows, fields] = await pool.execute(sql, [borrow_id]);
            console.log("SINGLE Reservation FETCHED: " + rows.length);
            return rows.length === 1 ? rows[0] : false;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async getReservationsByUserId(user_id) {
        try {
            let sql = "SELECT * FROM borrow WHERE user_id = ?";
            const [rows, fields] = await pool.execute(sql, [user_id]);
            console.log("Reservations FILTERED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async getReservationsByBookLibraryMappingId(book_library_mapping_id) {
        try {
            let sql = "SELECT * FROM borrow WHERE book_library_mapping_id = ?";
            const [rows, fields] = await pool.execute(sql, [book_library_mapping_id]);
            console.log("Reservations FILTERED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async addReservation(book_library_mapping_id, reservation_library_id, user_id, borrow_borrowDate, borrow_returnDate, borrow_status, borrow_fine) {
        try {
            let sql = "INSERT INTO borrow (book_library_mapping_id, reservation_library_id, user_id, borrow_borrowDate, borrow_returnDate, borrow_status, borrow_fine) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const [result] = await pool.execute(sql, [book_library_mapping_id, reservation_library_id, user_id, borrow_borrowDate, borrow_returnDate, borrow_status, borrow_fine]);
            console.log("Reservation ADDED: " + result.affectedRows);
            return result.insertId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    
    async getActiveReservationsByUserId(user_id) {
        try {
            let sql = "SELECT * FROM borrow WHERE user_id = ? AND borrow_status = 'active'";
            const [rows, fields] = await pool.execute(sql, [user_id]);
            console.log("Reservations FILTERED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async getActiveReservationsByBookLibraryMappingId(book_library_mapping_id) {
        try {
            let sql = "SELECT * FROM borrow WHERE book_library_mapping_id = ? AND borrow_status = 'active'";
            const [rows, fields] = await pool.execute(sql, [book_library_mapping_id]);
            console.log("Reservations FILTERED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    ,

    async delOneReservation(borrow_id) {
        try {
            let sql = "DELETE FROM borrow WHERE borrow_id = ?";
            const [result] = await pool.execute(sql, [borrow_id]);
            console.log("Reservation DELETED: " + result.affectedRows);
            return result.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async updateReservation(borrow_id, book_library_mapping_id, reservation_library_id, user_id, borrow_borrowDate, borrow_returnDate, borrow_status, borrow_fine) {
        try {
            let sql = "UPDATE borrow SET book_library_mapping_id = ?, reservation_library_id = ?, user_id = ?, borrow_borrowDate = ?, borrow_returnDate = ?, borrow_status = ?, borrow_fine = ? WHERE borrow_id = ?";
            const [result] = await pool.execute(sql, [book_library_mapping_id, reservation_library_id, user_id, borrow_borrowDate, borrow_returnDate, borrow_status, borrow_fine, borrow_id]);
            console.log("Reservation UPDATED: " + result.affectedRows);
            return result.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};


