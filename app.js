let CONSTANTS = require('./public/constants/basic');

// create a new express app
const express = require('express');
const app = express();
const mysql = require('mysql2');

// env
require("dotenv").config();

// data for the database
const Books = require('./public/data/Books.json');

// add & configure middleware
app.use(express.static('public'));

app.get('/', (req, res) => {
    // send home.html file
    console.log(process.env.dev_host);
    res.sendFile(__dirname + '/public/static/html/home.html');
});

app.use('/book', require('./routes/bookRouter'));
app.use('/user', require('./routes/userRouter'));
app.use('/db', require('./routes/dbInitRouter'));

// 
// START APP
if (CONSTANTS.DEV_MODE) {
    // start app -- local version
    app.listen(3000, () => {
        console.log('listening on 3000');
    });
} else {
    app.listen(80, () => {
        console.log('listening on 80');
    });
}