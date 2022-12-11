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

router.get('/', (req, res) => {
    // send cart.html file
    // it is one directory up from the current directory in public/static/html
    res.sendFile(path.join(__dirname, '../public/static/html/cart.html'));
});

router.get('/checkout', (req, res) => {
    // send checkout.html file
    // it is one directory up from the current directory in public/static/html
    res.sendFile(path.join(__dirname, '../public/static/html/checkout.html'));
});

router.get('/checkout/process', urlencodedParser, (req, res) => {
    console.log("CHECKING OUT");
    console.log(req.query);

    let params = req.query;

    let orderDetails = {
        "billing_details": {
            "street": params.billing_street,
            "country": params.billing_country,
            "city": params.billing_city,
            "province": params.billing_province,
            "postal_code": params.billing_postal_code
        },
        "shipping_details": {
            "street": params.shipping_street,
            "country": params.shipping_country,
            "city": params.shipping_city,
            "province": params.shipping_province,
            "postal_code": params.shipping_postal_code
        },
        "credit_card_details": {
            "name": params.name,
            "number": params.number,
            "expiry_date": params.expiry_date
        },
        "cart": req.session.cart,
        "charge": calculateTotal(req.session.cart)
    }

    if (params.shipping_street == "" || params.shipping_city == "" || params.shipping_state == "" || params.shipping_zip == "") {
        // make sure to set shipping info to billing info
        orderDetails["shipping_details"] = orderDetails["billing_details"];
    }

    console.log(orderDetails);
    // create a new order query
    // get the order id after
    // instert into orders table (id, status, user_id)
    let QUERY = "INSERT INTO orders (status, user_id) VALUES (" + CONSTANTS.ORDER_STATUS.PLACED + ", " + req.session.userId + ");";

    db.query(QUERY, (err, result) => {
        if (err) {
            console.log(err);
            // res.send(CONSTANTS.order_codes[500]);
        } else {
            console.log(result);
            let orderId = result.insertId;
        }
    });

    console.log("req.session.creditCardId: " + req.session.creditCardId);
    console.log("req.session.shippingAddressId: " + req.session.shippingAddressId);

    if (req.session.creditCardId != null) {
        // update credit card details in database where id = req.session.creditCardId
        let QUERY = "UPDATE credit_card SET name = '" + orderDetails["credit_card_details"]["name"] + "', number = '" + orderDetails["credit_card_details"]["number"] + "', expiry_date = '" + orderDetails["credit_card_details"]["expiry_date"] + "' WHERE id = " + req.session.creditCardId + ";";

        db.query(QUERY, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
    } else {
        // add new row to billing_address table with billing details
        let QUERY = "INSERT INTO billing_address (street, country, city, province, postal_code) VALUES ('" + orderDetails["billing_details"]["street"] + "', '" + orderDetails["billing_details"]["country"] + "', '" + orderDetails["billing_details"]["city"] + "', '" + orderDetails["billing_details"]["province"] + "', '" + orderDetails["billing_details"]["postal_code"] + "');";

        db.query(QUERY, (result, err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                req.session.billingAddressId = result.insertId;

                // add new row to credit_card table with credit card details and billing address id
                let QUERY2 = "INSERT INTO credit_card (name, number, expiry_date, billing_address_id) VALUES ('" + orderDetails["credit_card_details"]["name"] + "', '" + orderDetails["credit_card_details"]["number"] + "', '" + orderDetails["credit_card_details"]["expiry_date"] + "', '" + req.session.billingAddressId + "');";

                db.query(QUERY2, (result, err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);
                        req.session.creditCardId = result.insertId;

                        // update user table with credit card id
                        let QUERY3 = "UPDATE users SET credit_card_id = " + req.session.creditCardId + " WHERE id = " + req.session.userId + ";";

                        db.query(QUERY3, (result, err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(result);
                            }
                        });
                    }
                });
            }
        });
    }

    if (req.session.shippingAddressId != null) {
        // update shipping address details in database where id = req.session.shippingAddressId
        let QUERY = "UPDATE shipping_address SET street = '" + orderDetails["shipping_details"]["street"] + "', country = '" + orderDetails["shipping_details"]["country"] + "', city = '" + orderDetails["shipping_details"]["city"] + "', province = '" + orderDetails["shipping_details"]["province"] + "', postal_code = '" + orderDetails["shipping_details"]["postal_code"] + "' WHERE id = " + req.session.shippingAddressId + ";";

        db.query(QUERY, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                // log result and set shipping address id
                console.log(result);
            }
        });
    } else {
        // add new row to shipping_address table with shipping details
        let QUERY = "INSERT INTO shipping_address (street, country, city, province, postal_code) VALUES ('"+ orderDetails["shipping_details"]["street"] + "', '" + orderDetails["shipping_details"]["country"] + "', '" + orderDetails["shipping_details"]["city"] + "', '" + orderDetails["shipping_details"]["province"] + "', '" + orderDetails["shipping_details"]["postal_code"] + "');";

        db.query(QUERY, (result, err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                req.shippingAddressId = result.insertId;

                // update users table with shipping address id
                let QUERY2 = "UPDATE users SET shipping_address_id = '" + req.shippingAddressId + "' WHERE id = " + req.session.userId + ";";

                db.query(QUERY2, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);
                    }
                });
            }
        });
    }

    res.send("success");

    // res.redirect('/cart/checkout/confirmation');
});

function calculateTotal(cart) {
    let total = 0;
    for (let bookId in cart) {
        let subTotal = cart[bookId]["price"] * cart[bookId]["quantity"];
        total += subTotal + (subTotal * 0.13);
    }

    total += 10; // shipping cost

    return total;
}

router.get('/get', (req, res) => {
    // send req.session.cart to client
    res.send(req.session.cart);
});

router.post('/add', urlencodedParser, (req, res) => {
    console.log(req.body);
    // get bookId from request query
    let bookId = req.body.bookId;
    let ISBN = req.body.ISBN;
    let bookName = req.body.bookName;
    let authorName = req.body.authorName;
    let price = req.body.price;
    let genre = req.body.genre;
    let numPages = req.body.numPages;
    // let username = req.session.user;

    // check if req.session.cart exists
    if (req.session.cart) {
        // if it exists, check if bookId is in req.session.cart
        if (req.session.cart[bookId]) {
            // if it is, increment the quantity by 1
            req.session.cart[bookId]["quantity"] += 1;
        } else {
            // if it is not, add bookId to req.session.cart
            req.session.cart[bookId] = {
                "bookId": bookId,
                "ISBN": ISBN,
                "bookName": bookName,
                "authorName": authorName,
                "price": price,
                "genre": genre,
                "numPages": numPages,
                "quantity": 1
            };
        }
    } else {
        // if it does not exist, create a new cart
        req.session.cart = {};
        req.session.cart[bookId] = {
            "bookId": bookId,
            "ISBN": ISBN,
            "bookName": bookName,
            "authorName": authorName,
            "price": price,
            "genre": genre,
            "numPages": numPages,
            "quantity": 1
        };
    }

    res.send(req.session.cart);

    // redirect to /cart
    // res.redirect('/cart');
});

module.exports = router;