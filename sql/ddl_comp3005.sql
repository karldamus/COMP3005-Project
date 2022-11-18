CREATE TABLE IF NOT EXISTS PUBLISHERS (
    db_id                  INT PRIMARY KEY AUTO_INCREMENT,
    publisher_id        VARCHAR(6) UNIQUE NOT NULL,
    house     VARCHAR(30) NOT NULL,
    city                VARCHAR(30),
    state               VARCHAR(30),
    country             VARCHAR(30),
    year_established    INT
);

CREATE TABLE IF NOT EXISTS AUTHORS (
    db_id          INT PRIMARY KEY AUTO_INCREMENT,
    author_id   VARCHAR(6) UNIQUE NOT NULL,
    name        VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS BOOKS (
    db_id              INT PRIMARY KEY AUTO_INCREMENT,
    book_id         VARCHAR(6) UNIQUE NOT NULL,
    name            VARCHAR(100) NOT NULL,
    ISBN            VARCHAR(20) NOT NULL,
    genre           VARCHAR(20) NOT NULL,
    price           FLOAT(4) NOT NULL,
    num_pages       INT NOT NULL,
    publisher_id    VARCHAR(6) NOT NULL,
    author_id       VARCHAR(6) NOT NULL,

    FOREIGN KEY (publisher_id)
        REFERENCES PUBLISHERS (publisher_id),
    FOREIGN KEY (author_id)
        REFERENCES AUTHORS (author_id)
);

CREATE TABLE IF NOT EXISTS SHIPPING_ADDRESS (
    db_id          INT PRIMARY KEY AUTO_INCREMENT,
    street_1    VARCHAR(30) NOT NULL,
    street_2    VARCHAR(30),
    country     VARCHAR(30) NOT NULL,
    city        VARCHAR(30) NOT NULL,
    province    VARCHAR(30) NOT NULL,
    postal_code VARCHAR(6) NOT NULL 
);

CREATE TABLE IF NOT EXISTS BILLING_ADDRESS (
    db_id          INT PRIMARY KEY AUTO_INCREMENT,
    street_1    VARCHAR(30) NOT NULL,
    street_2    VARCHAR(30),
    country     VARCHAR(30) NOT NULL,
    city        VARCHAR(30) NOT NULL,
    province    VARCHAR(30) NOT NULL,
    postal_code VARCHAR(6) NOT NULL 
);

CREATE TABLE IF NOT EXISTS CREDIT_CARD (
    db_id   INT PRIMARY KEY AUTO_INCREMENT,
    name                VARCHAR(50),
    number              INT,  
    expiry_date         DATE,
    billing_address_id  INT,
    
    FOREIGN KEY (billing_address_id)
        REFERENCES BILLING_ADDRESS (db_id)
);

CREATE TABLE IF NOT EXISTS USERS (
    db_id              INT PRIMARY KEY AUTO_INCREMENT,
    level                   INT NOT NULL,
    name                    VARCHAR(50) NOT NULL,
    username                VARCHAR(50) UNIQUE NOT NULL,
    password                VARCHAR(150) NOT NULL,
    shipping_address_id     INT,
    credit_card_id          INT,

    FOREIGN KEY (shipping_address_id)
        REFERENCES SHIPPING_ADDRESS (db_id),
    FOREIGN KEY (credit_card_id)
        REFERENCES CREDIT_CARD (db_id)
);

CREATE TABLE IF NOT EXISTS ORDERS (
    db_id      INT PRIMARY KEY AUTO_INCREMENT,
    status  INT NOT NULL,
    user_id INT,

    FOREIGN KEY(user_id)
        REFERENCES USERS(db_id)
);  

CREATE TABLE IF NOT EXISTS ORDER_ITEMS (
    quantity    INT NOT NULL,
    order_id    INT NOT NULL,
    book_id     VARCHAR(6) NOT NULL,
    
    FOREIGN KEY (order_id)
        REFERENCES ORDERS (db_id),
    FOREIGN KEY (book_id)
        REFERENCES BOOKS (book_id)
);