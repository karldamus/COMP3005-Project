CREATE TABLE IF NOT EXISTS PUBLISHERS (
    publisher_db_id                  INT PRIMARY KEY AUTO_INCREMENT,
    publisher_id        VARCHAR(6) UNIQUE NOT NULL,
    publisher_house     VARCHAR(30) NOT NULL,
    publisher_city                VARCHAR(30),
    publisher_state               VARCHAR(30),
    publisher_country             VARCHAR(30),
    publisher_year_established    INT
);

CREATE TABLE IF NOT EXISTS AUTHORS (
    author_db_id          INT PRIMARY KEY AUTO_INCREMENT,
    author_id   VARCHAR(6) UNIQUE NOT NULL,
    author_name        VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS BOOKS (
    book_db_id              INT PRIMARY KEY AUTO_INCREMENT,
    book_id         VARCHAR(6) UNIQUE NOT NULL,
    book_name            VARCHAR(100) NOT NULL,
    book_ISBN            VARCHAR(20) NOT NULL,
    book_genre           VARCHAR(20) NOT NULL,
    book_price           FLOAT(4) NOT NULL,
    book_num_pages       INT NOT NULL,
    book_publisher_id    VARCHAR(6) NOT NULL,
    book_author_id       VARCHAR(6) NOT NULL,

    FOREIGN KEY (book_publisher_id)
        REFERENCES PUBLISHERS (publisher_id),
    FOREIGN KEY (book_author_id)
        REFERENCES AUTHORS (author_id)
);

CREATE TABLE IF NOT EXISTS SHIPPING_ADDRESS (
    shipping_address_db_id          INT PRIMARY KEY AUTO_INCREMENT,
    shipping_address_street_1    VARCHAR(30) NOT NULL,
    shipping_address_street_2    VARCHAR(30),
    shipping_address_country     VARCHAR(30) NOT NULL,
    shipping_address_city        VARCHAR(30) NOT NULL,
    shipping_address_province    VARCHAR(30) NOT NULL,
    shipping_address_postal_code VARCHAR(6) NOT NULL 
);

CREATE TABLE IF NOT EXISTS BILLING_ADDRESS (
    billing_address_db_id          INT PRIMARY KEY AUTO_INCREMENT,
    billing_address_street_1    VARCHAR(30) NOT NULL,
    billing_address_street_2    VARCHAR(30),
    billing_address_country     VARCHAR(30) NOT NULL,
    billing_address_city        VARCHAR(30) NOT NULL,
    billing_address_province    VARCHAR(30) NOT NULL,
    billing_address_postal_code VARCHAR(6) NOT NULL 
);

CREATE TABLE IF NOT EXISTS CREDIT_CARD (
    credit_card_db_id   INT PRIMARY KEY AUTO_INCREMENT,
    credit_card_name                VARCHAR(50),
    credit_card_number              INT,  
    credit_card_expiry_date         DATE,
    credit_card_billing_address_id  INT,
    
    FOREIGN KEY (credit_card_billing_address_id)
        REFERENCES BILLING_ADDRESS (billing_address_db_id)
);

CREATE TABLE IF NOT EXISTS USERS (
    user_db_id              INT PRIMARY KEY AUTO_INCREMENT,
    user_level                   INT NOT NULL,
    user_name                    VARCHAR(50) NOT NULL,
    user_username                VARCHAR(50) UNIQUE NOT NULL,
    user_password                VARCHAR(150) NOT NULL,
    user_shipping_address_id     INT,
    user_credit_card_id          INT,

    FOREIGN KEY (user_shipping_address_id)
        REFERENCES SHIPPING_ADDRESS (shipping_address_db_id),
    FOREIGN KEY (user_credit_card_id)
        REFERENCES CREDIT_CARD (credit_card_db_id)
);

CREATE TABLE IF NOT EXISTS ORDERS (
    order_db_id      INT PRIMARY KEY AUTO_INCREMENT,
    order_status  INT NOT NULL,
    order_users_id INT,

    FOREIGN KEY(order_users_id)
        REFERENCES USERS(user_db_id)
);  

CREATE TABLE IF NOT EXISTS ORDER_ITEMS (
    order_item_quantity    INT NOT NULL,
    order_item_order_id    INT NOT NULL,
    order_item_book_id     VARCHAR(6) NOT NULL,
    
    FOREIGN KEY (order_item_order_id)
        REFERENCES ORDERS (order_db_id),
    FOREIGN KEY (order_item_book_id)
        REFERENCES BOOKS (book_id)
);