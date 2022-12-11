var xhttp;

window.onload = async function() {
    console.log("Hello World from book-single.js");

    // get url
    let url = window.location.href;

    // get the id from the url
    let id = url.substring(url.lastIndexOf('/') + 1);

    console.log("id: " + id);

    // get book data from server
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let bookData = JSON.parse(this.responseText)[0];

            displayBook(bookData);
        }
    };

    xhttp.open("GET", "/book/" + id, true);
    xhttp.send();
}

function displayBook(bookData) {
    console.log(bookData);

    let ISBN = bookData.ISBN;
    let authorName = bookData.author_name;
    let bookName = bookData.book_name;
    let genre = bookData.genre;
    let bookId = bookData.id;
    let numPages = bookData.num_pages;
    let price = bookData.price;

    // get #single-book-data
    let singleBookData = document.getElementById("single-book-data");
    let titleDiv = document.getElementById("title");
    let metaDataDiv = document.getElementById("metadata");
    let authorDiv = document.getElementById("author");
    let genreDiv = document.getElementById("genre");
    let priceDiv = document.getElementById("price");
    let numPagesDiv = document.getElementById("numPages");
    let buttonWrapperDiv = document.getElementById("buttonWrapper");

    // create elements
    let htmlName = document.createElement("h1");
    let htmlAuthor = document.createElement("h4");
    let htmlGenre = document.createElement("h4");
    let htmlPrice = document.createElement("p");
    let htmlNumPages = document.createElement("p");

    // set content of elements
    htmlName.innerHTML = bookName;
    htmlAuthor.innerHTML = authorName;
    htmlGenre.innerHTML = genre;
    htmlPrice.innerHTML = "$" + price;
    htmlNumPages.innerHTML = numPages;

    // add id's
    htmlName.id = "book-name";
    htmlAuthor.id = "book-author";
    htmlGenre.id = "book-genre";
    htmlPrice.id = "book-price";
    htmlNumPages.id = "book-num-pages";
    
    // add elements to corresponding div's
    titleDiv.appendChild(htmlName);
    authorDiv.appendChild(htmlAuthor);
    genreDiv.appendChild(htmlGenre);
    priceDiv.appendChild(htmlPrice);
    numPagesDiv.appendChild(htmlNumPages);

    // create add to cart button
    let addToCartButton = document.createElement("button");
    addToCartButton.innerHTML = "Add to Cart";

    // add id
    addToCartButton.id = "add-to-cart-button";

    // add button to singleBookData div
    buttonWrapperDiv.appendChild(addToCartButton);

    // add event listener to button
    addToCartButton.addEventListener("click", function() {
        addToCart(bookId, ISBN, bookName, authorName, genre, price, numPages);
    });
}

function addToCart(bookId, ISBN, bookName, authorName, genre, price, numPages) {
    // check if user is logged in
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let isLoggedIn = this.responseText == "true" ? true : false;

            if (isLoggedIn) {
                sendToCart(bookId, ISBN, bookName, authorName, genre, price, numPages);
            } else {
                alert("Please login to add to cart");
                window.location.href = "/user/login";
            }
        }
    }

    xhttp.open("GET", "/user/isloggedin", true);
    xhttp.send();
}

function sendToCart(bookId, ISBN, bookName, authorName, genre, price, numPages) {
    console.log("sendToCart(" + bookId + ")");

    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            alert("Added to cart");
        }
    }

    xhttp.open("POST", "/cart/add", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("bookId=" + bookId + "&ISBN=" + ISBN + "&bookName=" + bookName + "&authorName=" + authorName + "&genre=" + genre + "&price=" + price + "&numPages=" + numPages);
}