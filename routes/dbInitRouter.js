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


        let sql = `INSERT INTO publishers (publisher_house, city, state, country, year_established) VALUES ('${house}', '${city}', '${state}', '${country}', ${year_established});`;
        
        // check if publisher already exists
        let sql_check = `SELECT * FROM publishers WHERE publisher_house = '${house}';`;

        await db.promiseQuery(sql_check, (err, results, fields) => {
            if (err) {
                console.log("ERROR");
                console.log(err);
            } else {
                if (results.length > 0) {
                    // skip this publisher
                    console.log('Publisher already exists');
                } else {
                    db.promiseQuery(sql, (err, results, fields) => {
                        if (err) {
                            // console.log(err);
                        } else {
                            // console.log(results);
                        }
                    });
                }
            }
        });
    }

    // authors
    // get data from root/public/data/Authors.json
    // let authors = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/Authors.json'), 'utf8').toString());

    // for (let i = 0; i < authors.length; i++) {
    //     let author = authors[i];

    // TODO: CHANGE id formats in all tables to replicate ids inside json files


    // books

    // shipping_addresses

    // billing_addresses

    // credit_cards

    // users

    // orders

    // order_items

});



module.exports = router;
