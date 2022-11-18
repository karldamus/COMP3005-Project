## Project Overview
This is the final project for COMP3005 at Carleton University. The basic outline of the project is described below:

**Brief:** Design and implement an application for an online bookstore (Look Inna Book)

**Feature List:**

| Feature Name           | Permission Level |
|------------------------|------------------|
| Browse books           | Anyone           |
| View a book            | Anyone           |
| Add books to your cart | Anyone           |
| Login / Register       | Anyone           |
| Checkout               | Logged in users  |
| Track order            | Logged in users  |
| Add new books          | Admin            |
| Remove books           | Admin            |
| View publisher info    | Admin            |
| View sale reports      | Admin            |
| Order new books        | Server           |

## Getting Started with Local Development

1. Clone the project
2. Create a `.env` file and insert the values according to the `.env.example` file
3. Install XAMPP control panel
   1. Start both the Apache and MySQL services and go to the MySQL Admin page
   2. Update the localhost user according to your `.env` username and password (User accounts tab)
4. If changes in MySQL were made, update your phpMyAdmin/config.inc.php file (`$cfg['Servers'][$i]['password']`)
5. Create a new database with the same name as the value of `dev_database` in your `.env` file
6. Run the following commands in a terminal from the root directory of this project

```shell
npm init
npm install <dependency_name> # list all dependencies in requirements.txt
npm install -g nodemon # to run the server
nodemon app.js
```

#### Initialize and Insert Data into the Database

1. Head to http://localhost:3000/db/init to create all the tables
2. Restart the server
3. Head to http://localhost:3000/db/insert to insert all the values

## Common Problems

Problem: The site http://localhost:3000 can't be reached

Potential fixes:
- Is app.js running on port 3000? Check to see that `DEV_MODE` is set to `true` in `root/public/constants/basic.js`.

Problem: No books are being displayed.

Potential fixes:
- Did you initialize the database **and** insert data into the database by using the method above?
- Is XAMPP control panel still running?

Problem: Database connection can't be made and/or tables cannot be created.

Potential fixes:
- Did you set up your `.env` file correctly? Double check the values in the database against your values in `.env` file.
- Is XAMPP control panel still running?

## Links
- [LIVE SITE](http://comp3005.karldamus.com)
- [DEVLOG](https://github.com/karldamus/COMP3005-Project/blob/main/DEVLOG.md)
- [PROJECT OUTLINE](https://github.com/karldamus/COMP3005-Project/blob/main/docs/projectoutline.md)

## Creators:
- Karl Damus
- Roy Cheruiyot