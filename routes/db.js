let CONSTANTS = require('../public/constants/basic');

var mysql = require('mysql2');
// const { get } = require('./bookRouter');

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

// create promise based query function
exports.query = async function (SQL, callback) {
    pool.getConnection(async function (err, connection) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            connection.query(SQL, async function (err, rows, fields) {
                if (err) {
                    // console.log(err);
                    callback(err);
                } else {
                    // console.log(rows);
                    callback(rows);
                }
            });
        }
    });
}

exports.query2 = async function (SQL, callback) {
	return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                connection.query(SQL, function (err, rows, fields) {
                    if (err) {
                        console.log("ERROR INSIDE PROMISE QUERY");
                        // console.log(err);
                        resolve(err);
                    } else {
                        console.log("SUCCESS INSIDE PROMISE QUERY");
                        // console.log(rows);
                        resolve(rows);
                    }
                });
            }
        });
    });
}

// create promise based query function
exports.promiseQuery = function (SQL) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                connection.query(SQL, function (err, rows, fields) {
                    if (err) {
                        console.log("ERROR INSIDE PROMISE QUERY");
                        console.log(err);
                        resolve(err);
                    } else {
                        console.log("SUCCESS INSIDE PROMISE QUERY");
                        console.log(rows);
                        resolve(rows);
                    }
                });
            }
        });
    });
}

