let CONSTANTS = require('./public/constants/basic');

// create a new express app
const express = require('express');
const app = express();
const mysql = require('mysql2');
const fs = require('fs');

// env
require("dotenv").config();

const session = require('express-session');
app.use(session({secret: process.env.session_secret}));

// data for the database
const Books = require('./public/data/Books.json');

// add & configure middleware
app.use(express.static('public'));
    
app.get('/', (req, res) => {
    // send home.html file
    // check if session exists
    if (req.session.user) {
        console.log("Logged in as: " + req.session.user);
    } else {
        console.log("Not logged in");
    }
    res.sendFile(__dirname + '/public/static/html/home.html');
});

app.use('/book', require('./routes/bookRouter'));
app.use('/user', require('./routes/userRouter'));
app.use('/db', require('./routes/dbInitRouter'));

// display global header on all pages
// header is located in public/static/html/global-header.html
// app.use(function(req, res, next) {
//     res.setHeader('Content-Type', 'text/html');
//     res.end(new String(fs.readFileSync('./public/static/html/global-header.html')).replace('<my-content></my-content>', fs.readFileSync('./public/static/html/global-header-content.html')));
//     next();
// });

app.get('/header', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    // send global-header.html file
    res.sendFile(__dirname + '/public/static/html/global-header.html');
});

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