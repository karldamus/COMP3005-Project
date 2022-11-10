const express = require('express');
const app = express();
const mysql = require('mysql2');

const router = express.Router();

var path = require('path');

// given an id paramater, return the book with that id
router.get('/:id', (req, res) => {
    // get the id from the request
    const id = req.params.id;

    // send book-single.html file
    // it is one directory up from the current directory in public/static/html
    // also send the id as a parameter
    // res.sendFile(path.join(__dirname, '../public/static/html/book-single.html'), { id: id });

    res.send("Book " + id);
});

function searchForBook(book_id) {
    
}

module.exports = router;