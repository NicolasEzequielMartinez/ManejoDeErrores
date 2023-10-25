import ProductsDAO from "../daos/mongodb/ProductsMongo.dao.js";

export default class ProductService {
    constructor() {
        this.productDao = new ProductsDAO();
    };

    // Métodos ProductService:
    async createProductService(info) {
        let response = {};
        try {
            const result = await this.productDao.createProduct(info);
            response.status = "success";
            response.message = "Producto creado exitosamente.";
            response.result = result;
            response.statusCode = 201;
        } catch (error) {
            response.status = "error";
            response.message = "Error al crear el producto.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };

    async getProductByIdService(pid) {
        let response = {};
        try {
            const result = await this.productDao.getProductById(pid);
            if (!result) {
                response.status = "error";
                response.message =  `No se encontró ningún producto con el ID ${pid}.`;
                response.statusCode = 404;
            } else {
                response.status = "success";
                response.message = "Producto obtenido exitosamente.";
                response.result = result;
                response.statusCode = 200;
            }
        } catch (error) {
            response.status = "error";
            response.message = "No se pudo obtener el producto.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };

    async getAllProductsService(limit, page, sort, filtro, filtroVal) {
        let response = {};
        try {
            const result = await this.productDao.getAllProducts(limit, page, sort, filtro, filtroVal);
            if (result.products.length === 0) {
                response.status = "error";
                response.message = "No se encontraron productos.";
                response.statusCode = 404;
            } else {
                response.status = "success";
                response.message = "Productos obtenidos exitosamente.";
                response.result = result.products;
                response.hasNextPage = result.hasNextPage;
                response.statusCode = 200;
            }
        } catch (error) {
            response.status = "error";
            response.message = "Error al obtener los productos.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };

    async deleteProductService(pid) {
        let response = {};
        try {
            const result = await this.productDao.deleteProduct(pid);
            if (result.deletedCount === 0) {
                response.status = "error";
                response.message =  `No se encontró ningún producto con el ID ${pid}.`;
                response.statusCode = 404;
            } else {
                response.status = "success";
                response.message = "Producto eliminado exitosamente.";
                response.result = result;
                response.statusCode = 200;
            }
        } catch (error) {
            response.status = "error";
            response.message = "Error al eliminar el producto.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };

    async updateProductService(pid, updateProduct) {
        let response = {};
        try {
            const result = await this.productDao.updateProduct(pid, updateProduct);
            if (result.n === 0) {
                response.status = "error";
                response.message = `No se encontró ningún producto con el ID ${pid}.`;
                response.statusCode = 404;
            } else {
                response.status = "success";
                response.message = "Producto actualizado exitosamente.";
                response.result = result;
                response.statusCode = 200;
            }
        } catch (error) {
            response.status = "error";
            response.message = "Error al actualizar el producto.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };
}