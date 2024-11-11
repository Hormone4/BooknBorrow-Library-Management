pool = require(__dirname + "/db.include.js"); // don't forget to change the / to \\ on Windows

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
            return rows.length === 1 ? rows[0] : false;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async delOneBook(book_id) {
        try {
            let sql = "DELETE FROM book WHERE book_id = ?";
            const [okPacket, fields] = await pool.execute(sql, [book_id]);
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async addOneBook(book_name, book_author, book_description, book_publicationDate, book_isbn, book_imageFileName) {
        try {
            let sql = "INSERT INTO book (book_name, book_author, book_description, book_publicationDate, book_isbn, book_imageFileName) VALUES (?, ?, ?, ?, ?, ?)";
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
