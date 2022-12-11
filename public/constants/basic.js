const constants = {
    DEV_MODE: true,

    ORDER_STATUS: {
        PLACED: 1,
        SHIPPED: 2,
        DELIVERED: 3
    },

    order_codes: {
        500: {
            message: "Internal Server Error",
            code: 500,
            redirect_url: "/cart/checkout"
        },
    },

    registration_codes: {
        409: {
            message: "Username already exists",
            code: 409,
            redirect_url: "/user/register"
        },
        500: {
            message: "Internal Server Error",
            code: 500,
            redirect_url: "/user/register"
        },
        200: {
            message: "Registration Successful",
            code: 200,
            redirect_url: "/user/login"
        }
    },

    login_codes: {
        401: {
            message: "Incorrect username or password",
            code: 401,
            redirect_url: "/user/login"
        },
        404: {
            message: "Username not found",
            code: 404,
            redirect_url: "/user/login"
        },
        500: {
            message: "Internal Server Error",
            code: 500,
            redirect_url: "/user/login"
        },
        200: {
            message: "Login Successful",
            code: 200,
            redirect_url: "/"
        }
    },
}

module.exports = constants;