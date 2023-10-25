import ProductService from "../services/products.service.js";
import MessageService from "../services/message.service.js";
import mongoose from "mongoose";
import CartService from "../services/carts.service.js";

export default class ViewsController {
    constructor() {
        this.productService = new ProductService();
        this.messageService = new MessageService();
        this.cartService = new CartService();
    }
    // PRODUCTS VIEW:
    async getAllProductsControllerV(limit, page, sort, filtro, filtroVal) {
        let response = {};
        let limitV = limit;
        let pageV = page;
        let sortV = sort;
        let filtroV = filtro;
        let filtroValV = filtroVal;
        try {
            const limit = limitV || 10;
            const page = pageV || 1;
            let sort = sortV || 1;
            let filtro = filtroV || null;
            let filtroVal = filtroValV || null;
            const responseService = await this.productService.getAllProductsService(limit, page, sort, filtro, filtroVal)
            response.status = responseService.status;
            response.message = responseService.message;
            response.statusCode = responseService.statusCode;
            if (responseService.status === "success") {
                response.result = responseService.result;
                response.hasNextPage = responseService.hasNextPage;
            };
            if (responseService.status === "error") {
                response.error = responseService.error;
            };
            return response;
        } catch (error) {
            console.error('Error: ', error.message);
            response.status = "error";
            response.message = "Error al obtener los productos." + error.message;
            response.error = error.message;
            response.statusCode = 500;
            return response;
        };
    };

    // CHAT VIEW: 

    async getAllMessageControllerV() {
        let response = {};
        try {
            const responseService = await this.messageService.getAllMessageService();
            response.status = responseService.status;
            response.message = responseService.message;
            response.statusCode = responseService.statusCode;
            if (responseService.status === "success") {
                response.result = responseService.result;
                response.hasNextPage = responseService.hasNextPage;
            };
            if (responseService.status === "error") {
                response.error = responseService.error;
            };
            return response;
        } catch {
            console.error('Error:', error.message);
            res.status(500).json({
                error: "Error al obtener los mensajes: " + error.message
            });
        }
    }

    // // CARTS VIEW:

    // async getCartByIdV(cartID) {
    //     let response = {};
    //     try {
    //         const cid = cartID
    //         if (!cid) {
    //             response.status = "error";
    //             response.message = `No se proporcionó ningún ID de carrito.`;
    //             response.statusCode = 400;
    //         } else if (!mongoose.Types.ObjectId.isValid(cid)) {
    //             response.status = "error";
    //             response.message = `El ID proporcionado no es válido.`;
    //             response.statusCode = 400;
    //         } else {
    //             const responseService = await this.cartService.getCartByIdService(cid);
    //             response.status = responseService.status;
    //             response.message = responseService.message;
    //             response.statusCode = responseService.statusCode;
    //             if (responseService.status === "success") {
    //                 response.result = responseService.result;
    //             };
    //             if (responseService.status === "error") {
    //                 response.error = responseService.error;
    //             };
    //         };
    //         console.log(response);
    //         return response;
    //     } catch (error) {
    //         console.error('Error:', error.message);
    //         res.status(500).json({
    //             error: 'Error al consultar el carrito: ' + error.message
    //         });
    //     };
    // };
};