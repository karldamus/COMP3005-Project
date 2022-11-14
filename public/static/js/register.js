window.onload = function() {
    console.log("Register Page Loaded");

    // get the register button
    let registerButton = document.getElementById("register-button");
    
    // get form
    let registerForm = document.getElementById("register-form");

    // prevent default form submission
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
    });

    // call registerUser when the button is clicked
    registerButton.onclick = registerUser;
}

function registerUser() {
    let name = document.getElementById("name").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    var hash_obj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});

    hash_obj.update(password);
    let hashed_password = hash_obj.getHash("HEX");

    // get all books
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let json_response = JSON.parse(this.responseText);

            // see public/constants/basic.js @ registration_codes
            switch (json_response.code) {
                case 200:
                    alert("User '" + username + "' successfully registered!");
                    break;
                case 409:
                    alert("This username is taken. Please try another one.");
                    break;
                default:
                    alert("Something went wrong. Please try again.");
                    break;
            }

            // redirect to login page
            location.href = json_response.redirect_url;
        }
    };

    // open POST request and provide name, username, and hashed password
    xhttp.open("POST", "/user/register", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("name=" + name + "&username=" + username + "&password=" + hashed_password);
}