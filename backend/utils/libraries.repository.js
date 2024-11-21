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
    getBlankLibrary() {
        return {
            "library_id": 0,
            "library_name": 'name',
            "library_email": 'email@random.hu',
            "library_phone": '0606060606',
            "library_creationYear": null,
            "library_zipCode": '00000',
            "library_streetName": 'street',
            "library_streetNumber": '0'
        };
    },

    async getAllLibraries() {
        try {
            let sql = "SELECT * FROM library";
            const [rows, fields] = await pool.execute(sql);
            console.log("Libraries FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async getOneLibrary(library_id) {
        try {
            let sql = "SELECT * FROM library WHERE library_id = ?";
            const [rows, fields] = await pool.execute(sql, [library_id]);
            console.log("SINGLE Library FETCHED: " + rows.length);
            return rows.length === 1 ? rows[0] : false;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async addOneLibrary(library_name, library_email, library_phone, library_creationYear, library_zipCode, library_streetName, library_streetNumber) {
        try {
            let sql = "INSERT INTO library (library_name, library_email, library_phone, library_creationYear, library_zipCode, library_streetName, library_streetNumber) "+
                             "VALUES (?, ?, ?, ?, ?, ?, ?)";
            const [okPacket, fields] = await pool.execute(sql, [library_name, library_email, library_phone, library_creationYear, library_zipCode, library_streetName, library_streetNumber]);
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async editOneLibrary(library_id, library_name, library_email, library_phone, library_creationYear, library_zipCode, library_streetName, library_streetNumber) {
        try {
            let sql = "UPDATE library SET library_name=?, library_email=?, library_phone=?, library_creationYear=?, library_zipCode=?, library_streetName=?, library_streetNumber=? WHERE library_id=?";
            const [okPacket, fields] = await pool.execute(sql, [library_name, library_email, library_phone, library_creationYear, library_zipCode, library_streetName, library_streetNumber, library_id]);
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async delOneLibrary(library_id) {
        try {
            // First delete related borrow records
            let sql = "DELETE b FROM borrow b " +
                             "JOIN bookLibraryMapping blm ON b.book_library_mapping_id = blm.book_library_mapping_id " +
                             "WHERE blm.library_id = ?";
            let [okPacket, fields] = await pool.execute(sql, [library_id]);

            // Then delete the bookLibraryMapping records
            sql = "DELETE FROM bookLibraryMapping " +
                  "WHERE library_id = ?";
            [okPacket, fields] = await pool.execute(sql, [library_id]);

            // Finally delete the library
            sql = "DELETE FROM library WHERE library_id = ?";
            [okPacket, fields] = await pool.execute(sql, [library_id]);

            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async getLibraryBooks(library_id) {
        try {
            let sql = `
                SELECT b.*, blm.book_status
                FROM book b
                JOIN bookLibraryMapping blm ON b.book_id = blm.book_id
                WHERE blm.library_id = ?`;
            const [rows, fields] = await pool.execute(sql, [library_id]);
            console.log("Library Books FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};