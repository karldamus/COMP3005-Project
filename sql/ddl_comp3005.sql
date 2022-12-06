CREATE TABLE IF NOT EXISTS BANK_ACCOUNTS (
    account_number      INT UNIQUE NOT NULL,
    balance             DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS TRANSACTIONS (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    account_number      INT NOT NULL,
    transaction_date    DATE NOT NULL,
    transaction_amount  DECIMAL(10,2) NOT NULL,
    to_account_number   INT NOT NULL,

    FOREIGN KEY (account_number) 
        REFERENCES BANK_ACCOUNTS(account_number)
);

CREATE TABLE IF NOT EXISTS PUBLISHERS (
    id                  VARCHAR(6) UNIQUE NOT NULL,
    house               VARCHAR(30) NOT NULL,
    city                VARCHAR(30),
    state               VARCHAR(30),
    country             VARCHAR(30),
    year_established    INT,
    bank_account_number INT,

    FOREIGN KEY (bank_account_number) 
        REFERENCES BANK_ACCOUNTS(account_number)
);

CREATE TABLE IF NOT EXISTS AUTHORS (
    id          VARCHAR(6) UNIQUE NOT NULL,
    name        VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS BOOKS (
    id              VARCHAR(6) UNIQUE NOT NULL,
    name            VARCHAR(100) NOT NULL,
    ISBN            VARCHAR(20) NOT NULL,
    genre           VARCHAR(20) NOT NULL,
    price           FLOAT(4) NOT NULL,
    num_pages       INT NOT NULL,
    publisher_id    VARCHAR(6) NOT NULL,
    author_id       VARCHAR(6) NOT NULL,

    FOREIGN KEY (publisher_id)
        REFERENCES PUBLISHERS (id),
    FOREIGN KEY (author_id)
        REFERENCES AUTHORS (id)
);

CREATE TABLE IF NOT EXISTS SHIPPING_ADDRESS (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    street    VARCHAR(30) NOT NULL,
    country     VARCHAR(30) NOT NULL,
    city        VARCHAR(30) NOT NULL,
    province    VARCHAR(30) NOT NULL,
    postal_code VARCHAR(6) NOT NULL 
);

CREATE TABLE IF NOT EXISTS BILLING_ADDRESS (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    street    VARCHAR(30) NOT NULL,
    country     VARCHAR(30) NOT NULL,
    city        VARCHAR(30) NOT NULL,
    province    VARCHAR(30) NOT NULL,
    postal_code VARCHAR(6) NOT NULL 
);

CREATE TABLE IF NOT EXISTS CREDIT_CARD (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    name                VARCHAR(50),
    number              INT,  
    expiry_date         DATE,
    billing_address_id  INT,
    
    FOREIGN KEY (billing_address_id)
        REFERENCES BILLING_ADDRESS (id)
);

CREATE TABLE IF NOT EXISTS USERS (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    level                   INT NOT NULL,
    name                    VARCHAR(50) NOT NULL,
    username                VARCHAR(50) UNIQUE NOT NULL,
    password                VARCHAR(150) NOT NULL,
    save_info               BIT,
    shipping_address_id     INT,
    credit_card_id          INT,


    FOREIGN KEY (shipping_address_id)
        REFERENCES SHIPPING_ADDRESS (id),
    FOREIGN KEY (credit_card_id)
        REFERENCES CREDIT_CARD (id)
);

CREATE TABLE IF NOT EXISTS ORDERS (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    status  INT NOT NULL,
    user_id INT,

    FOREIGN KEY(user_id)
        REFERENCES USERS(id)
);  

CREATE TABLE IF NOT EXISTS ORDER_ITEMS (
    quantity    INT NOT NULL,
    order_id    INT NOT NULL,
    book_id     VARCHAR(6) NOT NULL,
    
    FOREIGN KEY (order_id)
        REFERENCES ORDERS (id),
    FOREIGN KEY (book_id)
        REFERENCES BOOKS (id)
);