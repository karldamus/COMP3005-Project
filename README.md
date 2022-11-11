### Project Overview
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

### Getting Started with Local Development

1. Clone the project
2. Create a `.env` file and insert the values according to the .env.example file
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

1. Head to [http://localhost:3000/db/init](http://localhost:3000/db/init) to create all the tables
2. Head to [http://localhost:3000/db/insert](http://localhost:3000/db/insert) to insert all the values


### Links
- [LIVE SITE](http://comp3005.karldamus.com)
- [DEVLOG](https://github.com/karldamus/COMP3005-Project/blob/main/DEVLOG.md)
- [PROJECT OUTLINE](https://github.com/karldamus/COMP3005-Project/blob/main/docs/projectoutline.md)

### Creators:
- Karl Damus
- Roy Cheruiyot