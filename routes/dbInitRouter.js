const express = require('express');
const app = express();
const mysql = require('mysql2');
const fs = require('fs');

const router = express.Router();

var path = require('path');

var db = require('./db');

let ddl_sql;

router.get('/init', async (req, res) => {
    ddl_sql = fs.readFileSync(path.join(__dirname, '../sql/ddl_comp3005.sql'), 'utf8').toString();
    
    sql_arr = ddl_sql.split(';');

    // remove last element of array
    sql_arr.pop();

    for (let i = 0; i < sql_arr.length; i++) {
        // add semicolon back to end of each sql statement
        sql_arr[i] += ';';

        // execute db.query
        await db.promiseQuery(sql_arr[i], (err, results, fields) => {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
            }
        });
    }

    res.send('Database initialized');
});

router.get('/insert', async (req, res) => {
    // publishers
    // get data from root/public/data/Publishers.json
    let publishers = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/Publishers.json'), 'utf8').toString());

    for (let i = 0; i < publishers.length; i++) {
        let publisher = publishers[i];

        let id = publisher.PubID;
        let house = publisher["Publishing House"];
        let city = publisher.City;
        let state = publisher.State;
        let country = publisher.Country;
        let year_established = publisher["Year Established"];

        let sql = `INSERT INTO publishers (publisher_id, house, city, state, country, year_established) VALUES ('${id}', '${house}', '${city}', '${state}', '${country}', ${year_established});`;

        await db.promiseQuery(sql, (err, results, fields) => {
            // if promise is rejected
            if (err) {
                console.log("ERROR INSIDE /insert/publishers");
                console.log(err);
            } else {
                console.log("SUCCESS INSIDE /insert/publishers");
                console.log(results);
            }
        });
    }

    // authors
    // get data from root/public/data/Authors.json
    let authors = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/Authors.json'), 'utf8').toString());

    let sql = "INSERT INTO authors (author_id, name) VALUES ";

    for (let i = 0; i < authors.length; i++) {
        let author = authors[i];

        let id = author.AuthID;
        let name = author["First Name"] + ' ' + author["Last Name"];

        if (i == authors.length - 1) {
            sql += `('${id}', '${name}');`;
        } else {
            sql += `('${id}', '${name}'), `;
        }
    }

    await db.promiseQuery(sql, (err, results, fields) => {
        if (err) {
            console.log("ERROR INSIDE /insert/authors");
            console.log(err);
        } else {
            console.log("SUCCESS INSIDE /insert/authors");
            console.log(results);
        }
    });


    // books
    // get data from root/public/data/Books.json
    let books = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/Books.json'), 'utf8').toString());

    console.log("AFTER BOOKS");

    console.log("BOOKS ==========================")
    console.log("books.length: " + books.length);

    console.log(books);

    sql = "INSERT INTO books (book_id, name, ISBN, genre, price, num_pages, publisher_id, author_id) VALUES "; 

    for (let i = 0; i < books.length; i++) {
        let book = books[i];

        let id = book.BookID;
        let name = book.Title;
        let ISBN = book.ISBN;
        let genre = book.Genre;
        let price = book.Price;
        let num_pages = book.Pages;
        let publisher_id = book.PubID;
        let author_id = book.AuthID;

        // format ' and " in book name
        name = name.replace(/'/g, "''");

        // let sql = `INSERT INTO books (book_id, name, ISBN, genre, price, num_pages, publisher_id, author_id) VALUES ('${id}', '${name}', '${ISBN}', '${genre}', ${price}, ${num_pages}, '${publisher_id}', '${author_id}');`;

        if (i == books.length - 1) {
            sql += `('${id}', '${name}', '${ISBN}', '${genre}', ${price}, ${num_pages}, '${publisher_id}', '${author_id}');`;
        } else {
            sql += `('${id}', '${name}', '${ISBN}', '${genre}', ${price}, ${num_pages}, '${publisher_id}', '${author_id}'), `;
        }
    }

    await db.promiseQuery(sql, (err, results, fields) => {
        if (err) {
            console.log("ERROR INSIDE /insert/books");
            console.log(err);
        } else {
            console.log("SUCCESS INSIDE /insert/books");
            console.log(results);
        }
    });

    // shipping_addresses

    // billing_addresses

    // credit_cards

    // users

    // orders

    // order_items

    res.send('All data inserted');

});



module.exports = router;
