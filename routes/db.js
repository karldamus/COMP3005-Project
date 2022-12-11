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
        connectionLimit: 10000,
        queueLimit: 0
    });
} else {
    pool = mysql.createPool({
        host: process.env.prod_host,
        user: process.env.prod_user,
        password: process.env.prod_password,
        database: process.env.prod_database,
        waitForConnections: true,
        connectionLimit: 10000,
        queueLimit: 0
    });
}

// create promise based query function
exports.query = function (SQL, callback) {
    // pool.getConnection(function (err, connection) {
    //     if (err) {
    //         console.log(err);
    //         callback(err);
    //         return;
    //     } else {
    //         connection.query(SQL, function (err2, rows, fields) {
    //             if (err2) {
    //                 // console.log(err);
    //                 callback(err2);
    //                 return;
    //             } else {
    //                 // console.log(rows);
    //                 callback(rows);
    //                 return;
    //             }
    //         });
    //     }
    // });
    console.log(SQL);
    pool.getConnection(function(err, conn) {
        conn.query(SQL, function(err, rows, fields) {
            if (err) {
                console.log(err);
                callback(err);
                return;
            } else {
                console.log(rows);
                callback(rows);
                return;
            }
        });

        conn.release();
    })
}

exports.query2 = async function (QUERY, callback) {
	return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                connection.query(QUERY, function (err, rows, fields) {
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


// exports.promiseQuery2 = function (SQL) {
//     // dont use pool
//     return new Promise((resolve, reject) => {
//         var connection = mysql.createConnection({
//             host: process.env.prod_host,
//             user: process.env.prod_user,
//             password: process.env.prod_password,
//             database: process.env.prod_database
//         });
//         connection.connect();
//         connection.query(SQL, function (err, rows, fields) {
//             if (err) {
//                 console.log("ERROR INSIDE PROMISE QUERY");
//                 // console.log(err);
//                 resolve(err);
//             } else {
//                 console.log("SUCCESS INSIDE PROMISE QUERY");
//                 // console.log(rows);
//                 resolve(rows);
//             }
//         });
//         connection.end();
//     });
// }
