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
    getBlankUser() {
        return {
            "user_id": 0,
            "user_name": 'name',
            "user_email": 'email@example.com',
            "user_password": '',
            "user_created": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "user_role": 'USER'
        };
    },

    async getAllUsers() {
        try {
            let sql = "SELECT * FROM users";
            const [rows, fields] = await pool.execute(sql);
            rows.forEach(row => {
                row.user_created = row.user_created.toISOString().slice(0, 10);
                // convert date from javascript format (YYYY-MM-DDT00:00:00.000Z) to SQL format (YYYY-MM-DD)
            });
            console.log("Users FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async getUserById(user_id) {
        try {
            // verify input
            user_id = verifyInput(user_id);

            let sql = "SELECT * FROM users WHERE user_id = ?";
            const [rows, fields] = await pool.execute(sql, [user_id]);

            console.log("SINGLE User FETCHED: " + rows.length);

            if (rows.length === 1) {
                rows[0].user_created = rows[0].user_created.toISOString().slice(0, 10);
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async addUser(user_name, user_email, user_password, user_role) {
        try {
            // verify input
            user_name = verifyInput(user_name);
            user_email = verifyInput(user_email);
            user_password = verifyInput(user_password);
            user_role = verifyInput(user_role);

            let sql = "INSERT INTO users (user_name, user_email, user_password, user_created, user_role) " +
                      "VALUES (?, ?, SHA2(CONCAT(now(), ?), 224), now(), ?)";
            const [okPacket, fields] = await pool.execute(sql, [user_name, user_email, user_password, user_role]);
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async updateUser(user_id, user_name, user_email, user_password, user_role) {
        try {
            // verify input
            user_id = verifyInput(user_id);
            user_name = verifyInput(user_name);
            user_email = verifyInput(user_email);
            user_password = verifyInput(user_password);
            user_role = verifyInput(user_role);

            let sql = "UPDATE users SET user_name=?, user_email=?, user_password=SHA2(CONCAT(now(), ?), 224), user_role=? WHERE user_id=?";
            const [okPacket, fields] = await pool.execute(sql, [user_name, user_email, user_password, user_role, user_id]);
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async deleteUser(user_id) {
        try {
            // verify input
            user_id = verifyInput(user_id);

            // First delete related borrow records
            let sql = "DELETE FROM borrow WHERE user_id = ?";
            let [okPacket, fields] = await pool.execute(sql, [user_id]);
            
            sql = "DELETE FROM users WHERE user_id = ?";    
            [okPacket, fields] = await pool.execute(sql, [user_id]);
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};