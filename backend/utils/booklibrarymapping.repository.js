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
    getBlankBookLibraryMapping() {
        return {
            "book_library_mapping_id": 0,
            "book_id": 0,
            "library_id": 0,
            "book_status": 'available'
        };

    },

    async getAllBookLibraryMappings() {
        try {
            let sql = "SELECT * FROM book_library_mapping";
            const [rows, fields] = await pool.execute(sql);
            console.log("BookLibraryMappings FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async getOneBookLibraryMapping(book_library_mapping_id) {
        try {
            let sql = "SELECT * FROM book_library_mapping WHERE book_library_mapping_id = ?";
            const [rows, fields] = await pool.execute(sql, [book_library_mapping_id]);
            console.log("SINGLE BookLibraryMapping FETCHED: " + rows.length);
            return rows.length === 1 ? rows[0] : false;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async getBookLibraryMappingsByBookId(book_id) {
        try {
            let sql = "SELECT * FROM book_library_mapping WHERE book_id = ?";
            const [rows, fields] = await pool.execute(sql, [book_id]);
            console.log("BookLibraryMappings FILTERED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async getBookLibraryMappingsByLibraryId(library_id) {
        try {
            let sql = "SELECT * FROM book_library_mapping WHERE library_id = ?";
            const [rows, fields] = await pool.execute(sql, [library_id]);
            console.log("BookLibraryMappings FILTERED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async addBookLibraryMapping(book_id, library_id) {
        try {
            let sql = "INSERT INTO book_library_mapping (book_id, library_id) VALUES (?, ?)";
            const [rows, fields] = await pool.execute(sql, [book_id, library_id]);
            console.log("BookLibraryMapping ADDED: " + rows.affectedRows);
            return rows.affectedRows === 1 ? true : false;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async delOneBookLibraryMapping(book_library_mapping_id) {
        try {
            let sql = "DELETE FROM book_library_mapping WHERE book_library_mapping_id = ?";
            const [rows, fields] = await pool.execute(sql, [book_library_mapping_id]);
            console.log("BookLibraryMapping DELETED: " + rows.affectedRows);
            return rows.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async delBookLibraryMappingsByBookIdAndLibraryId(book_id, library_id) {
        try {
            let sql = "DELETE FROM book_library_mapping WHERE book_id = ? AND library_id = ?";
            const [rows, fields] = await pool.execute(sql, [book_id, library_id]);
            console.log("BookLibraryMappings DELETED: " + rows.affectedRows);
            return rows.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

};
