const express = require('express');
const app = express();
const mysql = require('mysql2');

const router = express.Router();

// get basic book data
router.get('/', (req, res) => {
    let Books = require('../public/data/Books.json');
    res.send(Books);
});

module.exports = router;