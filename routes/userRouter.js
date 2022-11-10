const express = require('express');
const app = express();
const mysql = require('mysql2');

const router = express.Router();

var path = require('path');

router.get('/login', (req, res) => {
    // send user-login.html file
    // it is one directory up from the current directory in public/static/html
    // res.sendFile(path.join(__dirname, '../public/static/html/user-login.html'));

    res.send("Login");
});

router.get('/register', (req, res) => {
    // send user-register.html file
    // it is one directory up from the current directory in public/static/html
    // res.sendFile(path.join(__dirname, '../public/static/html/user-register.html'));

    res.send("Register");
});

module.exports = router;