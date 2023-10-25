import ProductService from '../services/products.service.js';
import mongoose from 'mongoose';

export default class ProductController {
    constructor() {
        this.productService = new ProductService();
    }
    // Métodos ProductController:
    async createProductController(req, res) {
        let response = {};
        try {
            const productData = req.body;
            const responseService = await this.productService.createProductService(productData);
            response.status = responseService.status;
            response.message = responseService.message;
            response.statusCode = responseService.statusCode;
            if (responseService.status === "success") {
                response.result = responseService.result;
                // Real Time: 
                const products = await this.productService.getAllProductsService();
                req.socketServer.sockets.emit('products', products.result);
            }
            if (responseService.status === "error") {
                response.error = responseService.error;
            }
            console.log(response.message);
            return response
        } catch (error) {
            console.error('Error:', error.message);
            response.status = "error";
            rresponse.message = "Error al crear el producto - Controller:" + error.message;
            response.error = error.message;
            response.statusCode = 500;
            return response;
        }
    };

    async getProductByIDController(req, res) {
        let response = {};
        try {
            const pid = req.params.pid;
            const responseService = await this.productService.getProductByIdService(pid);
            response.status = responseService.status;
            response.message = responseService.message;
            response.statusCode = responseService.statusCode;
            if (responseService.status === "success") {
                response.result = responseService.result;
            }
            if (responseService.status === "error") {
                response.error = responseService.error;
            }
            console.log(response.message);
            return response
        } catch (error) {
            console.error('Error:', error.message);
            response.status = "error";
            response.message = "Error al consultar el producto - Controller:" + error.message;
            response.error = error.message;
            response.statusCode = 500;
            return response;
        }
    };

    async getAllProductsController(req, res) {
        let response = {};
        try {
            const limit = Number(req.query.limit) || 10;
            const page = Number(req.query.page) || 1;
            let sort = Number(req.query.sort) || 1;
            let filtro = req.query.filtro || null;
            let filtroVal = req.query.filtroVal || null;

            const responseService = await this.productService.getAllProductsService(limit, page, sort, filtro, filtroVal);
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
            console.log(response.message);
            return response;
        } catch (error) {
            console.error('Error: ', error.message);
            response.status = "error";
            response.message = "Error al obtener los productos - Controller" + error.message;
            response.error = error.message;
            response.statusCode = 500;
            return response;
        };
    };

    async deleteProductController(req, res) {
        let response = {};
        try {
            const pid = req.params.pid;
            const responseService = await this.productService.deleteProductService(pid);
            response.status = responseService.status;
            response.message = responseService.message;
            response.statusCode = responseService.statusCode;
            if (responseService.status === "success") {
                response.result = responseService.result;
                // Real Time: 
                const products = await this.productService.getAllProductsService();
                req.socketServer.sockets.emit('products', products.result);
            };
            if (responseService.status === "error") {
                response.error = responseService.error;
            };
            console.log(response.message);
            return response
        } catch (error) {
            console.error('Error: ', error.message);
            response.status = "error";
            response.message = "Error al eliminar el producto - Controller" + error.message;
            response.error = error.message;
            response.statusCode = 500;
            return response;
        };
    };

    async updatedProductController(req, res) {
        let response = {};
        try {
            const pid = req.params.pid;
            const updatedFields = req.body;
            const responseService = await this.productService.updateProductService(pid, updatedFields);
            response.status = responseService.status;
            response.message = responseService.message;
            response.statusCode = responseService.statusCode;
            if (responseService.status === "success") {
                response.result = responseService.result;
                // Real Time: 
                const products = await this.productService.getAllProductsService();
                req.socketServer.sockets.emit('products', products.result);
            }
            if (responseService.status === "error") {
                response.error = responseService.error;
            }
            console.log(response.message);
            return response
        } catch (error) {
            console.error('Error: ', error.message);
            response.status = "error";
            response.message = "Error al actualizar el producto - Controller" + error.message;
            response.error = error.message;
            response.statusCode = 500;
            return response;
        }
    }
}