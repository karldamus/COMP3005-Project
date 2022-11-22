let CONSTANTS = require('../public/constants/basic');

const express = require('express');
const session = require('express-session');
const app = express();
const mysql = require('mysql2');
var crypto = require('crypto');

const router = express.Router();

var db = require('./db');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var path = require('path');

app.use(session({secret: process.env.session_secret}));

router.get('/login', (req, res) => {
    // send user-login.html file
    // it is one directory up from the current directory in public/static/html
    res.sendFile(path.join(__dirname, '../public/static/html/user-login.html'));
});

router.post('/login', urlencodedParser, (req, res) => {
    // get username and password from request body
    let username = req.body.username;
    let password = req.body.password;

    // check if username and password are valid
    // check if username is in database
    // hash the given password from the request body
    // compare the hashed password to the hashed password in the database
    // hash the password using SHA-512

    // let hashed_password = crypto.createHash('sha512').update
    var hash = crypto.createHash('sha512');
    let data = hash.update(password, 'utf-8');
    let hashed_password = data.digest('hex');

    console.log("Username: " + username);
    console.log("Password: " + password);
    console.log("Hashed Password: " + hashed_password);

    let QUERY = `SELECT * FROM users WHERE username = '${username}';`;

    db.promiseQuery(QUERY).then((results) => {
        console.log(results);
        // if username is not in database
        if (results.length == 0) {
            res.send(CONSTANTS.login_codes[404]);
        } else {
            // if username is in database
            // check if password is correct
            if (results[0].password == hashed_password) {
                // username and password are correct
                // create a session for the user
                req.session.user = username;
                req.session.name = results[0].name;

                res.send(CONSTANTS.login_codes[200]);
            } else {
                res.send(CONSTANTS.login_codes[401]);
            }
        }
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });

    console.log("END OF POST");
});


router.get('/register', (req, res) => {
    // send user-register.html file
    // it is one directory up from the current directory in public/static/html
    res.sendFile(path.join(__dirname, '../public/static/html/user-register.html'));
});

router.post('/register', urlencodedParser, (req, res) => {
    // get the params name, username, and password
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;

    // use a promise query to check if user_username already exists
    let QUERY = "SELECT * FROM users WHERE username = '" + username + "'";

    db.promiseQuery(QUERY).then(function(rows) {
        if (rows.length > 0) {
            // username already exists
            res.send(CONSTANTS.registration_codes[409]);
        } else {
            // username does not exist
            // insert the user into the database
            let QUERY = "INSERT INTO users (level, name, username, password) VALUES (" + process.env.user_level_common + ", '" + name + "', '" + username + "', '" + password + "')";

            db.promiseQuery(QUERY).then(function(rows) {
                res.send(CONSTANTS.registration_codes[200]);
            }).catch(function(err) {
                res.send(err);
            });
        }
    }).catch(function(err) {
        res.send(err);
    });
});

module.exports = router;