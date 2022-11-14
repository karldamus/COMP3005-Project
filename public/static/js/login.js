// https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/

window.onload = function() {
    console.log("Login Page Loaded");

    // get the login button
    let loginButton = document.getElementById("login-button");

    // get form
    let loginForm = document.getElementById("login-form");

    // prevent default form submission
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
    });

    // call loginUser when the button is clicked
    loginButton.onclick = loginUser;
}

function loginUser() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // make call to login
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let json_response = JSON.parse(this.responseText);

            // see public/constants/basic.js @ login_codes
            switch (json_response.code) {
                case 200:
                    alert("Successfully logged in as '" + username + "'!");
                    break;
                case 401:
                    alert("Invalid username or password.");
                    break;
                case 404:
                    alert("Username " + username + " not found.");
                    break;
                default:
                    alert("Something went wrong. Please try again.");
                    break;
            }

            // redirect to redirect_url
            location.href = json_response.redirect_url;
        }
    };

    // open POST request and provide username and password
    xhttp.open("POST", "/user/login", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("username=" + username + "&password=" + password);
}