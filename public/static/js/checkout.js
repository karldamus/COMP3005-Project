window.onload = function() {
    setupButtons();
}

function setupButtons() {
    let showShippingAddressBox = document.getElementById("shipping_address_check");
    let shippingAddressWrapper = document.getElementById("shipping-address-wrapper");

    showShippingAddressBox.addEventListener("click", function() {
        // check if shipping address box is checked
        if (showShippingAddressBox.checked) {
            // show shipping address box
            // remove hidden class
            shippingAddressWrapper.classList.remove("hidden");
            setRequiredFields();
        } else {
            // hide shipping address box
            // add hidden class
            shippingAddressWrapper.classList.add("hidden");
            setRequiredFields();
        }
    });

    // let checkoutButton = document.getElementById("checkoutButton");

    setRequiredFields();
}

function setRequiredFields() {
    let elements = [];

    let showShippingAddressBox = document.getElementById("shipping_address_check");

    let billing_street = document.getElementById("billing_street");
    let billing_countrySelectBox = document.getElementById("billing_country");
    let billing_country = billing_countrySelectBox.options[billing_countrySelectBox.selectedIndex].text;
    let billing_city = document.getElementById("billing_city");
    let billing_province = document.getElementById("billing_province");
    let billing_postalCode = document.getElementById("billing_postal_code");

    let shipping_street = document.getElementById("shipping_street");
    let shipping_countrySelectBox = document.getElementById("shipping_country");
    let shipping_country = shipping_countrySelectBox.options[shipping_countrySelectBox.selectedIndex].text;
    let shipping_city = document.getElementById("shipping_city");
    let shipping_province = document.getElementById("shipping_province");
    let shipping_postalCode = document.getElementById("shipping_postal_code");

    let creditCard_name = document.getElementById("name");
    let creditCard_number = document.getElementById("number");
    let creditCard_cvc = document.getElementById("cvc");
    let creditCard_expiry = document.getElementById("expiry_date");

    // make all billing address fields required
    billing_street.required = true;
    billing_countrySelectBox.required = true;
    billing_city.required = true;
    billing_province.required = true;
    billing_postalCode.required = true;

    // make all credit card fields required
    creditCard_name.required = true;
    creditCard_number.required = true;
    creditCard_cvc.required = true;
    creditCard_expiry.required = true;

    // only make shipping address fields required if custom shipping address box is checked
    if (showShippingAddressBox.checked) {
        // make all shipping address fields required
        shipping_street.required = true;
        shipping_countrySelectBox.required = true;
        shipping_city.required = true;
        shipping_province.required = true;
        shipping_postalCode.required = true;
    } else {
        // make all shipping address fields not required
        shipping_street.required = false;
        shipping_countrySelectBox.required = false;
        shipping_city.required = false;
        shipping_province.required = false;
        shipping_postalCode.required = false;
    }
}


// // This is your test publishable API key.
// const stripe = Stripe("pk_test_51M9U5ADxJIIB0og4AsMESShbY3wRcv346ebrkxCLeJISu0Uhfx9OcHe3VgWCy6aKg6uo6XkySHWVcZccPzAsuhxe00BsWRXmlO");

// // The items the customer wants to buy
// const items = [{ id: "xl-tshirt" }];

// let elements;

// initialize();
// checkStatus();

// document
//   .querySelector("#payment-form")
//   .addEventListener("submit", handleSubmit);

// // Fetches a payment intent and captures the client secret
// async function initialize() {
//   const response = await fetch("/create-payment-intent", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ items }),
//   });
//   const { clientSecret } = await response.json();

//   const appearance = {
//     theme: 'stripe',
//   };
//   elements = stripe.elements({ appearance, clientSecret });

//   const paymentElementOptions = {
//     layout: "tabs",
//   };

//   const paymentElement = elements.create("payment", paymentElementOptions);
//   paymentElement.mount("#payment-element");
// }

// async function handleSubmit(e) {
//   e.preventDefault();
//   setLoading(true);

//   const { error } = await stripe.confirmPayment({
//     elements,
//     confirmParams: {
//       // Make sure to change this to your payment completion page
//       return_url: "http://localhost:3000/cart/checkout",
//     },
//   });

//   // This point will only be reached if there is an immediate error when
//   // confirming the payment. Otherwise, your customer will be redirected to
//   // your `return_url`. For some payment methods like iDEAL, your customer will
//   // be redirected to an intermediate site first to authorize the payment, then
//   // redirected to the `return_url`.
//   if (error.type === "card_error" || error.type === "validation_error") {
//     showMessage(error.message);
//   } else {
//     showMessage("An unexpected error occurred.");
//   }

//   setLoading(false);
// }

// // Fetches the payment intent status after payment submission
// async function checkStatus() {
//   const clientSecret = new URLSearchParams(window.location.search).get(
//     "payment_intent_client_secret"
//   );

//   if (!clientSecret) {
//     return;
//   }

//   const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

//   switch (paymentIntent.status) {
//     case "succeeded":
//       showMessage("Payment succeeded!");
//       break;
//     case "processing":
//       showMessage("Your payment is processing.");
//       break;
//     case "requires_payment_method":
//       showMessage("Your payment was not successful, please try again.");
//       break;
//     default:
//       showMessage("Something went wrong.");
//       break;
//   }
// }

// // ------- UI helpers -------

// function showMessage(messageText) {
//   const messageContainer = document.querySelector("#payment-message");

//   messageContainer.classList.remove("hidden");
//   messageContainer.textContent = messageText;

//   setTimeout(function () {
//     messageContainer.classList.add("hidden");
//     messageText.textContent = "";
//   }, 4000);
// }

// // Show a spinner on payment submission
// function setLoading(isLoading) {
//   if (isLoading) {
//     // Disable the button and show a spinner
//     document.querySelector("#submit").disabled = true;
//     document.querySelector("#spinner").classList.remove("hidden");
//     document.querySelector("#button-text").classList.add("hidden");
//   } else {
//     document.querySelector("#submit").disabled = false;
//     document.querySelector("#spinner").classList.add("hidden");
//     document.querySelector("#button-text").classList.remove("hidden");
//   }
// }