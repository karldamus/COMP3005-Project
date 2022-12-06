let CONSTANTS = require('../public/constants/basic');

const express = require('express');
const session = require('express-session');
const app = express();
const mysql = require('mysql2');

const router = express.Router();

var db = require('./db');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var path = require('path');

app.use(session({secret: process.env.session_secret}));

router.get('/checkout', (req, res) => {
    // send checkout.html file
    // it is one directory up from the current directory in public/static/html
    res.sendFile(path.join(__dirname, '../public/static/html/checkout.html'));
});

module.exports = router;