import CartService from "../services/carts.service.js";

export default class CartController {
    constructor() {
        this.cartService = new CartService()
    }
    // Métodos CartController:
    async createCartController(req, res) {
        let response = {};
        try {
            const responseService = await this.cartService.createCartService();
            response.status = responseService.status;
            response.message = responseService.message;
            response.statusCode = responseService.statusCode;
            if (responseService.status === "success") {
                response.result = responseService.result;
            };
            if (responseService.status === "error") {
                response.error = responseService.error;
            };
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({
                error: "Error al crear el carrito: " + error.message
            });
        };
    };

    async getCartByIdController(req, res) {
        let response = {};
        try {
            const cid = req.params.cid;
            if (!cid) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de carrito.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(cid)) {
                response.status = "error";
                response.message = `El ID proporcionado no es válido.`;
                response.statusCode = 400;
            } else {
                const responseService = await this.cartService.getCartByIdService(cid);
                response.status = responseService.status;
                response.message = responseService.message;
                response.statusCode = responseService.statusCode;
                if (responseService.status === "success") {
                    response.result = responseService.result;
                };
                if (responseService.status === "error") {
                    response.error = responseService.error;
                };
            };
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error:', error.message);
            response.status = "error";
            response.message = 'Error al consultar el carrito: ' + error.message;
            response.error = error.message;
            response.statusCode = 500;
            return response;
        };
    };

    async getAllCartsController(req, res) {
        let response = {};
        try {
            const responseService = await this.cartService.getAllCartsService();
            response.status = responseService.status;
            response.message = responseService.message;
            response.statusCode = responseService.statusCode;
            if (responseService.status === "success") {
                response.result = responseService.result;
            };
            if (responseService.status === "error") {
                response.error = responseService.error;
            };
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({
                error: "Error al crear el carrito: " + error.message
            });
        };
    };

    async addProductInCartController(req, res) {
        let response = {};
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const quantity = req.params.quantity; 
            if(!quantity){
                response.status = "error";
                response.message = `No se proporcionó cuantas Unds. del producto se desea comprar.`;
                response.statusCode = 400;
            } else if (!pid) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de producto.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(pid)) {
                response.status = "error";
                response.message = `El ID de producto proporcionado, no es válido.`;
                response.statusCode = 400;
            } else if (!cid) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de carrito.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(cid)) {
                response.status = "error";
                response.message = `El ID de carrito proporcionado, no es válido.`;
                response.statusCode = 400;
            } else {
                const responseService = await this.cartService.addProductToCartService(cid, pid, quantity);
                response.status = responseService.status;
                response.message = responseService.message;
                response.statusCode = responseService.statusCode;
                if (responseService.status === "success") {
                    response.result = responseService.result;
                };
                if (responseService.status === "error") {
                    response.error = responseService.error;
                };
            };
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error: ', error.message);
            res.status(500).json({
                error: "Error al agregar el producto del carrito: " + error.message
            });
        };
    };

    async purchaseProductsInCartController(req, res) {
        let response = {};
    
        try {
            const cartID = req.params.cid;
            const purchaseInfo = req.body;
            const products = purchaseInfo.products;
            const userEmail = purchaseInfo.userEmailAddress;
    
            if (!cartID) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de carrito.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(cartID)) {
                response.status = "error";
                response.message = `El ID de carrito proporcionado no es válido.`;
                response.statusCode = 400;
            } else if (!purchaseInfo || !Array.isArray(products) || products.length === 0) {
                response.status = "error";
                response.message = `No se enviaron los productos a comprar o el formato es inválido.`;
                response.statusCode = 400;
            } else if (!userEmail) {
                response.status = "error";
                response.message = `El correo electrónico del usuario no fue proporcionado.`;
                response.statusCode = 400;
            } else {
                for (const productInfo of products) {
                    if (!productInfo.databaseProductID || !mongoose.Types.ObjectId.isValid(productInfo.databaseProductID)) {
                        response.status = "error";
                        response.message = `Uno o más productos tienen un formato inválido.`;
                        response.statusCode = 400;
                        return res.status(response.statusCode).json(response);
                    }
                }
                const responseService = await this.cartService.purchaseProductsInCartService(cartID, purchaseInfo, userEmail);
                response.status = responseService.status;
                response.message = responseService.message;
                response.statusCode = responseService.statusCode;
                if (responseService.status === "success") {
                    response.result = responseService.result;
                };
                if (responseService.status === "error") {
                    response.error = responseService.status;
                };
            };
            console.log(response);
            return response
        } catch (error) {
            console.error('Error:', error.message);
            response.status = "error";
            response.message = "Error al procesar la compra - Controller: " + error.message;
            response.error = error.message;
            response.statusCode = 500;
            return res.status(response.statusCode).json(response);
        }
    }

    async deleteProductFromCartController(req, res) {
        let response = {};
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            if (!pid) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de producto.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(pid)) {
                response.status = "error";
                response.message = `El ID de producto proporcionado, no es válido.`;
                response.statusCode = 400;
            } else if (!cid) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de carrito.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(cid)) {
                response.status = "error";
                response.message = `El ID de carrito proporcionado, no es válido.`;
                response.statusCode = 400;
            } else {
                const responseService = await this.cartService.deleteProductFromCartService(cid, pid);
                response.status = responseService.status;
                response.message = responseService.message;
                response.statusCode = responseService.statusCode;
                if (responseService.status === "success") {
                    response.result = responseService.result;
                };
                if (responseService.status === "error") {
                    response.error = responseService.error;
                };
            };
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error: ', error.message);
            response.status = "error";
            response.message = "Error al eliminar producto del carrito: " + error.message;
            response.error = error.message;
            response.statusCode = 500;
            return response;
        };
    };

    async deleteAllProductsFromCartController(req, res) {
        let response = {};
        try {
            const cid = req.params.cid;
            if (!cid) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de carrito.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(cid)) {
                response.status = "error";
                response.message = `El ID proporcionado no es válido.`;
                response.statusCode = 400;
            } else {
                const responseService = await this.cartService.deleteAllProductFromCartService(cid);
                response.status = responseService.status;
                response.message = responseService.message;
                response.statusCode = responseService.statusCode;
                if (responseService.status === "success") {
                    response.result = responseService.result;
                };
                if (responseService.status === "error") {
                    response.error = responseService.error;
                };
            };
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error: ', error.message);
            res.status(500).json({
                error: "Error al eliminar todos los productos del carrito: " + error.message
            });
        };
    };

    async updateCartController(req, res) {
        let response = {};
        try {
            const cid = req.params.cid;
            const updatedCartFields = req.body;
            if (!cid) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de carrito.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(cid)) {
                response.status = "error";
                response.message = `El ID proporcionado no es válido.`;
                response.statusCode = 400;
            } else if (!updatedCartFields) {
                response.status = "error";
                response.message = `No se proporcionó ningún cuerpo para el carrito.`;
                response.statusCode = 400;
            } else {
                const responseService = await this.cartService.updateCartService(cid, updatedCartFields);
                response.status = responseService.status;
                response.message = responseService.message;
                response.statusCode = responseService.statusCode;
                if (responseService.status === "success") {
                    response.result = responseService.result;
                };
                if (responseService.status === "error") {
                    response.error = responseService.error;
                };
            };
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error: ', error.message);
            res.status(500).json({
                error: "Error al actualizar el carrito: " + error.message
            });
        };
    };

    async updateProductInCartController(req, res) {
        let response = {};
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const updatedProdInCart = req.body;
            if (!pid) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de producto.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(pid)) {
                response.status = "error";
                response.message = `El ID de producto proporcionado, no es válido.`;
                response.statusCode = 400;
            } else if (!cid) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de carrito.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(cid)) {
                response.status = "error";
                response.message = `El ID de carrito proporcionado, no es válido.`;
                response.statusCode = 400;
            } else if (!updatedProdInCart) {
                response.status = "error";
                response.message = `No se proporcionó ningún cuerpo para la actualización del producto.`;
                response.statusCode = 400;
            } else {
                const responseService = await this.cartService.updateProductInCartService(cid, pid, updatedProdInCart);
                response.status = responseService.status;
                response.message = responseService.message;
                response.statusCode = responseService.statusCode;
                if (responseService.status === "success") {
                    response.result = responseService.result;
                }
                if (responseService.status === "error") {
                    response.error = responseService.error;
                }
            }
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error: ', error.message);
            res.status(500).json({
                error: "Error al actualizar el producto en el carrito: " + error.message
            });
        }
    }
}