// utils/books.repository.js
pool = require(__dirname + "\\db.include.js"); // use same folder as the current file

module.exports = {
    getBlankBook(){ // defines the entity model, for documentation purposes (not used in code)
        return {
            "book_id": 0,
            "book_name": 'name',
            "book_author": 'author',
            "book_description": 'description',
            "book_publicationDate": ' ',
            "book_isbn": '00000000000000',
            "book_imageFileName": 'name.jpg'
        };
    },
    async getAllAuthors(){ // TODO? move to authors.repository.js
        try {
            let sql = "SELECT * FROM authors";
            // .execute() does: getConnection() + prepare() + query() + releaseConnection()
            const [rows, fields] = await pool.execute(sql);
            console.log("BRANDS FETCHED: "+rows.length);
            return rows; // array of author objects
        }
        catch (err) {
            // TODO: log/send error ...
            console.log(err);
            throw err; // return false ???
        }
    },
    async getAllBooks(){
        try {
            let sql = "SELECT * FROM books INNER JOIN authors ON book_author=author_id";
            const [rows, fields] = await pool.execute(sql);
            console.log("CARS FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getBooksByName(name){ // may be done in the frontend (more user-friendly), although server-side is faster
        try {
            let sql = "SELECT * FROM books INNER JOIN authors ON book_author=author_id WHERE upper(name) like upper(?)";
            const [rows, fields] = await pool.execute(sql, [ `%${name}%` ]); // has to be an array, the % is needed for sql LIKE
            console.log("CARS FILTERED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getOneBook(book_id){
        try {
            // sql = "SELECT * FROM books INNER JOIN authors ON book_author=author_id WHERE book_id = "+book_id;
            // SQL INJECTION => !!!!ALWAYS!!!! sanitize user input!
            // escape input (not very good) OR prepared statements (good) OR use orm (GOOD!)
            let sql = "SELECT * FROM books INNER JOIN authors ON book_author=author_id WHERE book_id = ?";
            const [rows, fields] = await pool.execute(sql, [ book_id ]);
            console.log("SINGLE CAR FETCHED: "+rows.length);
            if (rows.length === 1) {
                return rows[0];
            } else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async delOneBook(book_id){
        try {
            let sql = "DELETE FROM books WHERE book_id = ?";
            const [okPacket, fields] = await pool.execute(sql, [ book_id ]); // okPacket is a result object (tell if it was successful)
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows; // how many rows were affected (deleted)
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async addOneBook(authorId){
        try {
            let sql = "INSERT INTO books (book_id, book_author) VALUES (NULL, ?) ";
            const [okPacket, fields] = await pool.execute(sql, [ authorId ]);
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async editOneBook(book_id, bookAuthor, bookName, bookBaseprice, bookIsfancy, bookRealprice){
        try {
            let sql = "UPDATE books SET book_author=?, book_name=?, book_baseprice=?, book_isfancy=?, book_realprice=? WHERE book_id=? ";
            // positional parameters are needed because of the ? in the sql
            // they allow to avoid SQL injection
            const [okPacket, fields] = await pool.execute(sql,
                [bookAuthor, bookName, bookBaseprice, bookIsfancy, bookRealprice, book_id]);
            // same order as the sql parameters
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};
