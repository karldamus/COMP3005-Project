let CONSTANTS = require('./public/constants/basic');

// create a new express app
const express = require('express');
const app = express();
const mysql = require('mysql2');
const fs = require('fs');

// env
require("dotenv").config();

app.use(express.json());

const Stripe = require('stripe');
const stripe = Stripe(process.env.stripe_test_secret_key);

const session = require('express-session');
app.use(session({
    secret: process.env.session_secret
}));

// data for the database
const Books = require('./public/data/Books.json');

// add & configure middleware
app.use(express.static('public'));

app.get('/', (req, res) => {
    // send home.html file
    // check if session exists
    if (req.session.user) {
        console.log("Logged in as: " + req.session.user);
    } else {
        console.log("Not logged in");
    }
    res.sendFile(__dirname + '/public/static/html/home.html');
});

app.post("/create-payment-intent", async (req, res) => {
    // const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        //   amount: calculateOrderAmount(items),
        amount: 1099,
        currency: "cad",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

app.use('/book', require('./routes/bookRouter'));
app.use('/user', require('./routes/userRouter'));
app.use('/db', require('./routes/dbInitRouter'));
app.use('/cart', require('./routes/cartRouter'));

// display global header on all pages
// header is located in public/static/html/global-header.html
// app.use(function(req, res, next) {
//     res.setHeader('Content-Type', 'text/html');
//     res.end(new String(fs.readFileSync('./public/static/html/global-header.html')).replace('<my-content></my-content>', fs.readFileSync('./public/static/html/global-header-content.html')));
//     next();
// });

app.get('/header', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    // send global-header.html file
    res.sendFile(__dirname + '/public/static/html/global-header.html');
});

// 
// START APP
if (CONSTANTS.DEV_MODE) {
    // start app -- local version
    app.listen(3000, () => {
        console.log('listening on 3000');
    });
} else {
    app.listen(80, () => {
        console.log('listening on 80');
    });
}