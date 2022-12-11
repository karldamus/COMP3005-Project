var xhttp;

window.onload = async function() {
    userLoggedInCheck();

    // create call to cart/get
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let cartData = JSON.parse(this.responseText);
            displayCart(cartData);
        }
    };

    xhttp.open("GET", "/cart/get", true);
    xhttp.send();
}

function displayCart(cartData) {
    let subTotal = 0;

    console.log(cartData);
    // get cart-wrapper div
    let cartWrapper = document.getElementById("cart-wrapper");

    // loop through cartData object don't use length
    for (const [key, value] of Object.entries(cartData)) {
        // create single cart item div
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        let bookName = document.createElement("h4");
        bookName.innerHTML = value["bookName"];
        let authorName = document.createElement("h4");
        authorName.innerHTML = value["authorName"];
        let price = document.createElement("p");
        price.innerHTML = "$" + value["price"];
        let quantity = document.createElement("p");
        quantity.innerHTML = "Quantity: " + value["quantity"];

        cartItem.appendChild(bookName);
        cartItem.appendChild(authorName);
        cartItem.appendChild(price);
        cartItem.appendChild(quantity);

        cartWrapper.appendChild(cartItem);

        subTotal += value["price"] * value["quantity"];
    }

    // create checkout button
    let checkoutButton = document.createElement("button");
    checkoutButton.innerHTML = "Checkout";
    checkoutButton.classList.add("checkout-btn");

    // create subtotal div
    let subTotalDiv = document.createElement("div");
    subTotalDiv.classList.add("subtotal");

    let subTotalText = document.createElement("h4");
    subTotalText.innerHTML = "Subtotal: $" + subTotal;

    subTotalDiv.appendChild(subTotalText);


    checkoutButton.onclick = function() {
        window.location.href = "/cart/checkout";
    }

    cartWrapper.appendChild(subTotalDiv);
    cartWrapper.appendChild(checkoutButton);
}

function userLoggedInCheck() {
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let isLoggedIn = this.responseText == "true" ? true : false;

            if (!isLoggedIn) {
                alert("Please login to view cart");
                window.location.href = "/user/login";
            } 
        }
    }

    xhttp.open("GET", "/user/isloggedin", true);
    xhttp.send();
}