require('dotenv').config();
const os = process.env.OS;
let path;
if (os === 'l') {
    path = __dirname + "/db.include.js";  // Linux path
} else if (os === 'w') {
    path = __dirname + "\\db.include.js";  // Windows path
}
pool = require(path);

module.exports = {
    getBlankBook() {
        return {
            "book_id": 0,
            "book_name": 'name',
            "book_author": 'author',
            "book_description": 'description',
            "book_publicationDate": ' ',
            "book_isbn": '0000000000000',
            "book_imageFileName": 'name.jpg'
        };
    },

    async getAllBooks() {
        try {
            let sql = "SELECT * FROM book";
            const [rows, fields] = await pool.execute(sql);
            rows.forEach(row => {
                row.book_publicationDate = row.book_publicationDate.toISOString().slice(0, 10);
                // convert date from javascript format (YYYY-MM-DDT00:00:00.000Z) to SQL format (YYYY-MM-DD)
            });
            console.log("Books FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async getBooksByName(name) {
        try {
            let sql = "SELECT * FROM book WHERE upper(book_name) LIKE upper(?)";
            const [rows, fields] = await pool.execute(sql, [`%${name}%`]);
            rows.forEach(row => {
                row.book_publicationDate = row.book_publicationDate.toISOString().slice(0, 10);
                // convert date from javascript format (YYYY-MM-DDT00:00:00.000Z) to SQL format (YYYY-MM-DD)
            });
            console.log("Books FILTERED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async getOneBook(book_id) {
        try {
            let sql = "SELECT * FROM book WHERE book_id = ?";
            const [rows, fields] = await pool.execute(sql, [book_id]);
            console.log("SINGLE Book FETCHED: " + rows.length);

            if (rows.length === 1) {   // if the book is found
                rows[0].book_publicationDate = rows[0].book_publicationDate.toISOString().slice(0, 10);
                // convert date javascript format (YYYY-MM-DDT00:00:00.000Z) to SQL format (yyyy-mm-dd)
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async delOneBook(book_id) {
        try {
            // First delete any related borrow records
            let sql = "DELETE b FROM borrow b " +
                             "JOIN bookLibraryMapping blm ON b.book_library_mapping_id = blm.book_library_mapping_id " +
                             "WHERE blm.book_id = ?";
            let [okPacket, fields] = await pool.execute(sql, [book_id]);

            // Then delete the bookLibraryMapping records
            sql = "DELETE FROM bookLibraryMapping WHERE book_id = ?";
            [okPacket, fields] = await pool.execute(sql, [book_id]);

            // Finally delete the book record
            sql = "DELETE book FROM book WHERE book_id = ?";
            [okPacket, fields] = await pool.execute(sql, [book_id]);

            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async addOneBook(book_name, book_author, book_description, book_publicationDate, book_isbn, book_imageFileName) {
        try {
            let sql = "INSERT INTO book (book_name, book_author, book_description, book_publicationDate, book_isbn, book_imageFileName) " +
                             "VALUES (?, ?, ?, ?, ?, ?)";
            const [okPacket, fields] = await pool.execute(sql, [book_name, book_author, book_description, book_publicationDate, book_isbn, book_imageFileName]);
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async editOneBook(book_id, book_author, book_name, book_description, book_publicationDate, book_isbn, book_imageFileName) {
        try {
            let sql = "UPDATE book SET book_author=?, book_name=?, book_description=?, book_publicationDate=?, book_isbn=?, book_imageFileName=? WHERE book_id=?";
            const [okPacket, fields] = await pool.execute(sql, [book_author, book_name, book_description, book_publicationDate, book_isbn, book_imageFileName, book_id]);
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};
