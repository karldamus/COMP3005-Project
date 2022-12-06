var xhttp;

window.onload = async function() {
    console.log("Hello World from book-single.js");

    // get url
    let url = window.location.href;

    // get the id from the url
    let id = url.substring(url.lastIndexOf('/') + 1);

    console.log("id: " + id);

    // get #single-book-data
    let singleBookData = document.getElementById("single-book-data");

    // get book data from server
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Book data: " + this.responseText);
        }
    };

    xhttp.open("GET", "/book/" + id, true);
    xhttp.send();
}