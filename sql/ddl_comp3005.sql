-- publisher
CREATE TABLE PUBLISHER (
    id                  INT PRIMARY KEY,
    publisher_house     VARCHAR(30) NOT NULL,
    city                VARCHAR(30),
    state               VARCHAR(30),
    country             VARCHAR(30),
    year_established    INT
);

-- author
CREATE TABLE AUTHOR (
    id      INT PRIMARY KEY,
    name    VARCHAR(20) NOT NULL
);

-- book
CREATE TABLE BOOK (
    id              INT PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    ISBN            VARCHAR(20) NOT NULL,
    genre           VARCHAR(20) NOT NULL,
    price           INT NOT NULL,
    num_pages       INT NOT NULL,
    publisher_id    INT NOT NULL,
    author_id       INT NOT NULL,

    FOREIGN KEY (publisher_id)
        REFERENCES PUBLISHER (id),
    FOREIGN KEY (author_id)
        REFERENCES AUTHOR (id)
);

-- shipping_address
CREATE TABLE SHIPPING_ADDRESS (
    id          INT PRIMARY KEY,
    street_1    VARCHAR(30) NOT NULL,
    street_2    VARCHAR(30),
    country     VARCHAR(30) NOT NULL,
    city        VARCHAR(30) NOT NULL,
    province    VARCHAR(30) NOT NULL,
    postal_code VARCHAR(6) NOT NULL         -- input checked for spaces (remove!)
);

-- billing_address
CREATE TABLE BILLING_ADDRESS (
    id          INT PRIMARY KEY,
    street_1    VARCHAR(30) NOT NULL,
    street_2    VARCHAR(30),
    country     VARCHAR(30) NOT NULL,
    city        VARCHAR(30) NOT NULL,
    province    VARCHAR(30) NOT NULL,
    postal_code VARCHAR(6) NOT NULL         -- input checked for spaces (remove!)
);

-- credit_card
CREATE TABLE CREDIT_CARD (
    id                  INT PRIMARY KEY,
    name                VARCHAR(50),
    number              INT,         -- input checked for spaces (remove!)
    expiry_date         DATE,
    billing_address_id  INT NOT NULL,
    
    FOREIGN KEY (billing_address_id)
        REFERENCES BILLING_ADDRESS (id)
);

-- user
CREATE TABLE USERS (
    id                      INT PRIMARY KEY,
    level                   INT NOT NULL,
    name                    VARCHAR(50) NOT NULL,
    username                VARCHAR(50) NOT NULL,
    password                VARCHAR(150) NOT NULL,
    shipping_address_id     INT NOT NULL,
    credit_card_id          INT NOT NULL,

    FOREIGN KEY (shipping_address_id)
        REFERENCES SHIPPING_ADDRESS (id),
    FOREIGN KEY (credit_card_id)
        REFERENCES CREDIT_CARD (id)
);

-- orders
CREATE TABLE ORDERS (
    id      INT PRIMARY KEY,
    status  INT NOT NULL, -- 0 = ordered, 1 = processed, 2 = shipped, 3 = delivered 
    user_id INT NOT NULL,

    FOREIGN KEY(user_id)
        REFERENCES USERS(id)
);  

-- order_items
CREATE TABLE ORDER_ITEMS (
    quantity    INT NOT NULL,
    order_id    INT NOT NULL,
    book_id     INT NOT NULL,
    
    FOREIGN KEY (order_id)
        REFERENCES ORDERS (id),
    FOREIGN KEY (book_id)
        REFERENCES BOOK (id)
);