const express = require('express');
const app = express();
const mysql = require('mysql2');

const router = express.Router();

var db = require('./db');

var path = require('path');

router.get('/', (req, res) => {
    // connect to database and get all books
    let QUERY = "SELECT * FROM books";

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

router.get('/more', async (req, res) => {
    // connect to database and get all books
    let QUERY = "SELECT books.id, books.name as book_name, books.price, authors.name as author_name FROM books JOIN authors on books.author_id=authors.id";

    await db.query(QUERY, async function(err, rows, fields) {
        if (err) {
			// send err
			res.send(err);

            // console.log(err);
            // res.send(err);
        } else {
            // console.log(rows);
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
    let QUERY = "SELECT books.id, books.name as book_name, books.ISBN, books.genre, books.price, books.num_pages, authors.id, authors.name as author_name FROM books JOIN authors on books.author_id=authors.id WHERE books.id='" + id + "'";

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