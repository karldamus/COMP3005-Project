const express = require('express');
const app = express();
const mysql = require('mysql2');

const router = express.Router();

var db = require('./db');

var path = require('path');

router.get('/', (req, res) => {
    // connect to database and get all books
    let QUERY = "SELECT * FROM books";

    db.get(QUERY, function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(rows);
            res.send(rows);
        }
    });
});

router.get('/sortby/:column', (req, res) => {
    // connect to database and get all books
    let QUERY = "SELECT * FROM books ORDER BY " + req.params.column;

    db.get(QUERY, function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(rows);
            res.send(rows);
        }
    });
});

// given an id paramater, return the book with that id
router.get('/:id', (req, res) => {
    // get the id from the request
    const id = req.params.id;

    // connect to database and get book with id
    let QUERY = "SELECT * FROM `books` WHERE `book_id` = '" + id + "'";

    db.get(QUERY, function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(rows);
            res.send(rows);
        }
    });
});

function searchForBook(book_id) {
    
}

module.exports = router;