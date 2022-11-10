let CONSTANTS = require('../public/constants/basic');

var mysql = require('mysql2');

// create a pool
var pool;

// if in dev mode use local database
if (CONSTANTS.DEV_MODE) {
    pool = mysql.createPool({
        host: process.env.dev_host,
        user: process.env.dev_user,
        password: process.env.dev_password,
        database: process.env.dev_database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
} else {
    pool = mysql.createPool({
        host: process.env.prod_host,
        user: process.env.prod_user,
        password: process.env.prod_password,
        database: process.env.prod_database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

exports.get = function (SQL, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            connection.query(SQL, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    callback(err);
                } else {
                    console.log(rows);
                    callback(rows);
                }
            });
        }
    });
}