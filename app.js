// IF YOU'RE DEPLOYING
// CHANGE TO FALSE
// 
const devMode = true;
// ====================

// create a new express app
const express = require('express');
const app = express();
const mysql = require('mysql2');

// database connection variable
var con;

// add & configure middleware
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Testing node server third time');
});


app.get('/db', (req, res) => {
    res.send(connectToDatabase());
});

app.get('/db/get', (req, res) => {
    connectToDatabase();
    // let data = getDataFromDatabase();
    // res.send(data);
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
    if (devMode) {
        con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "comp3005"
        });
    } else {
        con = mysql.createConnection({
            host: "mysql.comp3005.karldamus.com",
            user: "comp3005admin",
            password: "karlroyadmin",
            database: "comp3005"
        });
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

if (devMode) {
    // start app -- local version
    app.listen(3000, () => {
        console.log('listening on 3000');
    });
} else {
    app.listen(80, () => {
        console.log('listening on 80');
    });
}