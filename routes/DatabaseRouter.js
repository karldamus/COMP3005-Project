let CONSTANTS = require('../public/constants/basic');

const express = require('express');
const app = express();
const mysql = require('mysql2');

const secrets = require('../secrets.json');

const router = express.Router();

// database connection variable
var con;

// connect to database
router.get('/connect', (req, res) => {
    res.send(connectToDatabase());
});

// get data from database
router.get('/get', (req, res) => {
    connectToDatabase();

    con.query('SELECT * FROM `test`', function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(rows);
            res.send(rows);
        }
    });
});

function connectToDatabase() {
    if (CONSTANTS.DEV_MODE) {
        con = mysql.createConnection(secrets.dev_mode_config);
    } else {
        con = mysql.createConnection(secrets.prod_mode_config);
    }

    con.connect(function(err) {
        if (err) {
            console.log('Error connecting to Db');
        }

        console.log('Connection established');
    });

    return "Connection established";
}

function disconnectFromDatabase() {
    con.end(function(err) {
        if (err) {
            console.log('Error disconnecting from Db');
            return;
        }

        console.log('Connection closed');
        return;
    });
}

module.exports = router;