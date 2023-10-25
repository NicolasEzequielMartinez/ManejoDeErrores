import ErrorEnums from "./error.enums.js";

export default (error, req, res, next) => {
    console.log(error.cause);
    switch (error.cause) {
        case ErrorEnums.INVALID_TYPES_ERROR:
            res.send({
                status: "error",
                error: error.name
            })
            break;

            // Carrito:
        case ErrorEnums.QUANTITY_INVALID_ERROR:
            res.send({
                status: "error",
                error: error.name,
                cause: error.cause,
            });
            break;

        default:
            res.send({
                status: "error",
                error: "Unhandled error"
            })
    }
}