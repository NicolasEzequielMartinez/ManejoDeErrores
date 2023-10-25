import ErrorEnums from "../errors/error.enums.js";

export const errorMiddleware = (error, req, res, next) => {
    console.log(error.cause);
    switch (error.code) {

        // CARTS: 
        
        case ErrorEnums.INVALID_ID_CART_ERROR:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_ID_CART_ERROR
            });
            break;

        case ErrorEnums.INVALID_ID_CART_OR_PRODUCT_ERROR:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_ID_CART_OR_PRODUCT_ERROR
            });
            break;

        case ErrorEnums.QUANTITY_INVALID_ERROR:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.QUANTITY_INVALID_ERROR
            });
            break;

        case ErrorEnums.PRODUCTS_MISSING_OR_INVALID:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.PRODUCTS_MISSING_OR_INVALID
            });
            break;

        case ErrorEnums.INVALID_PRODUCT:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_PRODUCT
            });
            break;

        case ErrorEnums.INVALID_EMAIL:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_EMAIL
            });
            break;

        case ErrorEnums.INVALID_UPDATED_CART_FIELDS:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_UPDATED_CART_FIELDS
            });
            break;

        case ErrorEnums.INVALID_UPTATED_PROD_IN_CART:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_UPTATED_PROD_IN_CART
            });
            break;

            // PRODUCTS: 

        case ErrorEnums.INVALID_PRODUCT_DATA:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_PRODUCT_DATA
            });
            break;

        case ErrorEnums.INVALID_ID_PRODUCT_ERROR:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_ID_PRODUCT_ERROR
            });
            break;

        case ErrorEnums.INVALID_UPDATED_PRODUCT_FIELDS:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_UPDATED_PRODUCT_FIELDS
            });
            break;

        default:
            res.status(500).send({
                status: "error",
                error: "Unhandled error"
            });
    }
};