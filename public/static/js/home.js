var xhttp;

window.onload = async function() {
    console.log ("Hello World");
	
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = async function() {
        if (this.readyState == 4 && this.status == 200) {
            // createTable(this.responseText);
			console.log("Received response from /book/more");
            console.log(this.responseText);
            displayBooks(this.responseText);
        }
    };

    xhttp.open("GET", "/book/more", true);
    xhttp.send();

    // setup search bar
    setupSearchBar();
}

function displayBooks(listOfBookData) {
    // get html wrapper
    let booksWrapper = document.getElementById("books-wrapper");

    booksWrapper.innerHTML = '';

    let books = JSON.parse(listOfBookData);

    for (let i = 0; i < books.length; i++) {
        // get single book
        let book = books[i];

        // get book data
        let book_id = book.id;
        let book_name = book.book_name;
        let author_name = book.author_name;
        let price = book.price;

        // make price 2 decimal places
        price = price.toFixed(2);

        // get book div
        let singleBookDiv = createSingleBookDiv(book_id, book_name, author_name, price);

        // add event listener
        singleBookDiv.addEventListener("click", function() {
            console.log("book.id in eventListener: " + book.id);
            displaySingleBook(book.id);
        });

        // append to books wrapper
        booksWrapper.appendChild(singleBookDiv);
    }
}

function setupSearchBar() {
    let searchBox = document.getElementById("search-box");
    let searchButton = document.getElementById("search-button");

    searchBox.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            submitSearchQuery(searchBox.value);
        }
        // submitSearchQuery(searchBox.value);
    });

    searchButton.addEventListener("click", function() {
        submitSearchQuery(searchBox.value);
    });
}

function submitSearchQuery(searchQuery) {
    if (searchQuery == null || searchQuery == "" || onlySpaces(searchQuery)) {
        location.reload();
    }

    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = async function() {
        if (this.readyState == 4 && this.status == 200) {
            displayBooks(this.responseText);
        }
    }

    xhttp.open("GET", "/book/search/" + searchQuery, true);
    xhttp.send();
}

function onlySpaces(str) {
    return str.trim().length === 0;
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

            console.log("Book id inside displaySingleBook: " + bookId);

            // send request to get to /book-single/:id
            window.location.href = "/book/book-single/" + bookId;
        }
    };

    console.log("GET /book/" + bookId);

    xhttp.open("GET", "/book/" + bookId, true);
    xhttp.send();
}
