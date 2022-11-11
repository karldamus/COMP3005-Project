## Friday, November 11, 2022
- Updated ddl statements -- id's are more understandable and useable (given the "fake data" we are using for this project)
- Added functionality for automatically creating database tables
- Added functionality for automatically adding data to tables for the following tables:
  - publishers
  - authors
  - books

**- Karl Damus**

## Thursday, November 10, 2022
- Updated way of connecting to database using db.js, MySQL pool, and env variables
- Deleted old "testing" routes to incorporate new db connection
- Added routes for getting: single book, all books, and sorting by column in the books table
- Added user router
- Added database initialization routes
- Added promise-based query to help with database initialization when running multiple queries

**- Karl Damus**

- Created ER Diagram (v1)
- Created DDL statements (v1) -- related to ER Diagram

**- Karl Damus**

**- Roy Cheruiyot**

## Sunday, October 30, 2022
- Added Book data and converted to JSON from this [online fake dataset](https://help.tableau.com/current/pro/desktop/en-us/bookshop_data.htm) (./public/data/Books.json)
  - Each book has the following object format:

```json
{
    ISBN: String,
    BookID: String,
    Title: String,
    AuthID: String,
    Genre: String,
    SeriesID: String || null,
    VolumeNumber: int || null,
    StaffComment: String || null,
    PubID: String,
    PubYear: String,
    Pages: int,
    PrintRunSize: int,
    Price: Double
}
```

- Added Author data and converted to JSON from the above mentioned online fake dataset (./public/data/Authors.json)
- Added routes for getting Book data and move Database connection and test query to Database route
- Created first mock design for landing page (./design/pages)
  - Desktop
  - Mobile
- Created logo for project (./design/logos)

**- Karl Damus**

## Thursday, October 27th, 2022

- Created local testing server with local database in PHPMyAdmin
- Created production server at comp3005.karldamus.com with live database connection
  - Installed Node on production server
  - Created developer "gettingstarted" documentation (private)
- Setup devmode functionality for running on local vs production
- Successfully connected to and queried from database on both local and production versions

**- Karl Damus**
