var xhttp;

xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // send htmlContent to createHeader
        createHeader(this.responseText);
    }
};

xhttp.open("GET", "/header", true);
xhttp.send();


function createHeader(htmlContent) {
    // check if user is logged in
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let isLoggedIn = this.responseText == "true" ? true : false;

            // get the <my-header> element
            let header = document.getElementsByTagName("my-header")[0];

            // add the html content to the header div
            header.innerHTML = htmlContent;

            // get header-logo
            let headerLogo = document.getElementById("header-logo");

            // add onclick event to header-logo
            headerLogo.onclick = function() {
                location.href = "/";
            };

            if (isLoggedIn) {
                document.getElementById("login-text").innerHTML = "Logout";
                document.getElementById("login-link").href = "/user/logout";
            } else {
                document.getElementById("login-text").innerHTML = "Login";
                document.getElementById("login-link").href = "/user/login";
            }
        }
    }

    xhttp.open("GET", "/user/isloggedin", true);
    xhttp.send();
}