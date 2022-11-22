var xhttp;

window.onload = async function() {
    console.log ("Hello World");
	
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = async function() {
        if (this.readyState == 4 && this.status == 200) {
            // createTable(this.responseText);
			console.log("Received response from /book/more");

            displayBooks(this.responseText);
        }
    };

    xhttp.open("GET", "/book/more", true);
    xhttp.send();
}

function displayBooks(listOfBookData) {
    // get html wrapper
    let booksWrapper = document.getElementById("books-wrapper");

    let books = JSON.parse(listOfBookData);

    for (let i = 0; i < books.length; i++) {
        // get single book
        let book = books[i];

        // get book data
        let book_id = book.book_id;
        let book_name = book.book_name;
        let author_name = book.author_name;
        let price = book.price;

        // make price 2 decimal places
        price = price.toFixed(2);

        // get book div
        let singleBookDiv = createSingleBookDiv(book_id, book_name, author_name, price);

        // add event listener
        singleBookDiv.addEventListener("click", function() {
            displaySingleBook(book.book_id);
        });

        // append to books wrapper
        booksWrapper.appendChild(singleBookDiv);
    }
}

/**
    Create new single-book div based on template:

    <div class="single-book">
        <div class="left-side">
            <img src="/static/img/book.svg" alt="">
            <div class="book-info-wrapper">
                <p class="book-title">The Lord of the Rings: Part 2: The Two Towers</p>
                <p class="author-name">J.R.R Tolkien</p>
            </div>
        </div>
        <div class="right-side">
            <p class="price">$19.99</p>
        </div>
    </div>
*/
function createSingleBookDiv(book_id, book_name, author_name, price) {
        // create single-book div
        let singleBookDiv = document.createElement("div");
        singleBookDiv.classList.add("single-book");

        // create left-side div
        let leftSideDiv = document.createElement("div");
        leftSideDiv.classList.add("left-side");

        // create img
        let img = document.createElement("img");
        img.src = "/static/img/book.svg";
        img.alt = "";

        // create book-info-wrapper div
        let bookInfoWrapperDiv = document.createElement("div");
        bookInfoWrapperDiv.classList.add("book-info-wrapper");

        // create book-title p
        let bookTitleP = document.createElement("p");
        bookTitleP.classList.add("book-title");
        bookTitleP.innerHTML = book_name;

        // create author-name p
        let authorNameP = document.createElement("p");
        authorNameP.classList.add("author-name");
        authorNameP.innerHTML = author_name;

        // create right-side div
        let rightSideDiv = document.createElement("div");
        rightSideDiv.classList.add("right-side");

        // create price p
        let priceP = document.createElement("p");
        priceP.classList.add("price");
        priceP.innerHTML = "$" + price;

        // append all elements
        bookInfoWrapperDiv.appendChild(bookTitleP);
        bookInfoWrapperDiv.appendChild(authorNameP);

        leftSideDiv.appendChild(img);
        leftSideDiv.appendChild(bookInfoWrapperDiv);

        rightSideDiv.appendChild(priceP);

        singleBookDiv.appendChild(leftSideDiv);
        singleBookDiv.appendChild(rightSideDiv);

        return singleBookDiv;
}

function displaySingleBook(bookId) {
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

/**
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

*/