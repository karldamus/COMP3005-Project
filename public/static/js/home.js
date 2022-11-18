var xhttp;

window.onload = function() {
    console.log ("Hello World");

    // get books from /db/getBooks
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            createTable(this.responseText);
        }
    };

    xhttp.open("GET", "/book", true);
    xhttp.send();
}

function createTable(listOfBooks) {
    // get the div to display the books #all-books
    let allBooks = document.getElementById("all-books");

    // remove all content from allBooks
    allBooks.innerHTML = "";

    // create a table to display the books
    let table = document.createElement("table");
    table.setAttribute("id", "books-table");

    // create a header row
    let headerRow = document.createElement("tr");

    // create a header for the book id and book name
    let bookIdHeader = document.createElement("th");
    let bookNameHeader = document.createElement("th");
    let bookISBNHeader = document.createElement("th");

    // add the text to the headers
    bookIdHeader.innerHTML = "Book ID";
    bookNameHeader.innerHTML = "Book Name";
    bookISBNHeader.innerHTML = "Book ISBN";

    // add onclick events to the headers
    // bookIdHeader.setAttribute("onclick", sortBy('book_id'));
    // bookNameHeader.setAttribute("onclick", sortBy('title'));
    // bookISBNHeader.setAttribute("onclick", sortBy('ISBN'));

    // add the headers to the header row
    headerRow.appendChild(bookIdHeader);
    headerRow.appendChild(bookNameHeader);
    headerRow.appendChild(bookISBNHeader);

    // add the header row to the table
    table.appendChild(headerRow);

    // add the table to the div
    allBooks.appendChild(table);

    // display the books
    displayBooks(listOfBooks);
}

function displayBooks(listOfBooks) {
    let books = JSON.parse(listOfBooks);

    console.log(books);

    // get the table
    let table = document.getElementById("books-table");

    // remove all content from the table aside from the header
    table.innerHTML = table.innerHTML.split("</tr>")[0] + "</tr>";

    // add the books to the table
        // add the books to the table
    for (let i = 0; i < books.length; i++) {
        let book = books[i];

        // create a row for the book
        let row = document.createElement("tr");

        // create a cell for the book id and book name
        let bookIdCell = document.createElement("td");
        let bookNameCell = document.createElement("td");
        let bookISBN = document.createElement("td");

        // add underline to the book name
        bookNameCell.style.textDecoration = "underline";

        // add mouse hover to the book name
        bookNameCell.style.cursor = "pointer";

        // add the text to the cells
        bookIdCell.innerHTML = book.book_id;
        bookNameCell.innerHTML = book.name;
        bookISBN.innerHTML = book.ISBN;

        bookNameCell.addEventListener("click", function() {
            displayBook(book.book_id);
        });

        // add the cells to the row
        row.appendChild(bookIdCell);
        row.appendChild(bookNameCell);
        row.appendChild(bookISBN);

        // add the row to the table
        table.appendChild(row);
    }

}

function displayBook(bookId) {
    console.log("Inside displayBook");
    // make a get request to /book/:id
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // get the book
            let book = JSON.parse(this.responseText)[0];

            // get the div to display the book
            console.log(book);
        }
    };

    console.log("GET /book/" + bookId);

    xhttp.open("GET", "/book/" + bookId, true);
    xhttp.send();
}


function sortBy(column) {
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            createTable(this.responseText);
        }
    };

    xhttp.open("GET", "/book/sortby/" + column, true);
    xhttp.send();
}