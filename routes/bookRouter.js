const express = require('express');
const app = express();
const mysql = require('mysql2');

const router = express.Router();

var db = require('./db');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var path = require('path');

router.get('/', (req, res) => {
    // connect to database and get all books
    let QUERY = "SELECT * FROM books";

    db.query(QUERY, function(err, rows, fields) {
        if (err) {
            console.log("Error");
            res.send(err);
        } else {
            console.log("Rows");
            res.send(rows);
        }
    });
});

router.get('/more', (req, res) => {
    console.log("Inside /more");
    // connect to database and get all books
    let QUERY = "SELECT books.id, books.name as book_name, books.price, authors.name as author_name FROM books JOIN authors on books.author_id=authors.id";

    db.query(QUERY, function(err, rows, fields) {
        if (err) {
			res.send(err);
        } else {
            res.send(rows);
        }
    });
});

router.get('/search/:searchQuery', urlencodedParser, (req, res) => {
    let searchQuery = req.params.searchQuery;

    let QUERY = "SELECT books.id, books.name as book_name, books.price, authors.name as author_name FROM books JOIN authors on books.author_id=authors.id WHERE books.name LIKE '%" + searchQuery + "%' OR authors.name LIKE '%" + searchQuery + "%'";

    db.query(QUERY, function(err, rows, fields) {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    });
});

router.get('/sortby/:column', (req, res) => {
    // connect to database and get all books
    let QUERY = "SELECT * FROM books ORDER BY " + req.params.column;

    db.query(QUERY, function(err, rows, fields) {
        if (err) {
            // console.log(err);
            res.send(err);
        } else {
            // console.log(rows);
            res.send(rows);
        }
    });
});

// given an id paramater, return the book with that id
router.get('/:id', (req, res) => {
    // get the id from the request
    const id = req.params.id;

    // connect to database and get book with id
    // let QUERY = "SELECT * FROM `books` WHERE `book_id` = '" + id + "'";
    let QUERY = "SELECT books.id, books.name as book_name, books.ISBN, books.genre, books.price, books.num_pages, authors.id as author_id, authors.name as author_name FROM books JOIN authors on books.author_id=authors.id WHERE books.id='" + id + "'";

    console.log(QUERY);

    db.query(QUERY, function(err, rows, fields) {
        if (err) {
            // console.log(err);
            res.send(err);
        } else {
            // console.log(rows);
            res.send(rows);
        }
    });
});

router.get('/book-single/:id', (req, res) => {
    console.log("book-single");
    // send book-single.html file
    // it is one directory up from the current directory in public/static/html
    // send the book id after the link /
    res.sendFile(path.join(__dirname, '../public/static/html/book-single.html'));
});

function searchForBook(book_id) {
    
}

module.exports = router;