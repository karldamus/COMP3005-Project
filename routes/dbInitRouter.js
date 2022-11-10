const express = require('express');
const app = express();
const mysql = require('mysql2');
const fs = require('fs');

const router = express.Router();

var path = require('path');

var db = require('./db');

let ddl_sql;

router.get('/init', async (req, res) => {
    ddl_sql = fs.readFileSync(path.join(__dirname, '../sql/ddl_comp3005.sql'), 'utf8').toString();
    
    sql_arr = ddl_sql.split(';');

    // remove last element of array
    sql_arr.pop();

    for (let i = 0; i < sql_arr.length; i++) {
        // execute db.query
        await db.promiseQuery(sql_arr[i], (err, results, fields) => {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
            }
        });
    }

    res.send('Database initialized');
});

module.exports = router;
