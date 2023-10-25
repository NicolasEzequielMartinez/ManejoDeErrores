import mongoose from "mongoose";
import { productsModel } from "./models/products.model.js";
import config from "../../config.js";

export default class ProductDAO {
    
    // MONGOOSE
    connection = mongoose.connect( config.MONGO_URL );
    
    async createProduct(info) {
        try {
            const result = await productsModel.create(info);
            return result;
        } catch (error) {
            throw new Error("Error al crear el producto - DAO. Error original: " + error.message);
        }
    };

    async getProductById(pid) {
        try {
            const result = await productsModel.findOne({
                _id: pid
            });
            return result;
        } catch (error) {
            throw new Error("Error al obtener el producto por ID - DAO. Error original: " + error.message);
        };
    };

    async getAllProducts(limit = 10, page = 1, sort = 1, filtro = null, filtroVal = null) {
        try {
            let whereOptions = {};
            if (filtro != '' && filtroVal != '') {
                whereOptions = {
                    [filtro]: filtroVal
                };
            };
            let result = {};
            if (sort !== 1) {
                result = await productsModel.paginate(whereOptions, {
                    limit: limit,
                    page: page,
                    sort: {
                        price: sort
                    },
                });
            } else {
                result = await productsModel.paginate(whereOptions, {
                    limit: limit,
                    page: page,
                });
            }
            const hasNextPage = result.page < result.totalPages;
            return {
                products: result,
                hasNextPage: hasNextPage
            };
        } catch (error) {
            throw new Error("Error al obtener los productos - DAO. Error original: " + error.message);
        }
    };

    async deleteProduct(pid) {
        try {
            let result = await productsModel.deleteOne({ _id: pid })
            return result;
        } catch (error) {
            throw new Error("Error al eliminar el producto - DAO. Error original: " + error.message);
        }
    };
    
    async updateProduct(pid, updateProduct) {
        try {
            let result = await productsModel.updateOne({
                _id: pid
            }, {
                $set: updateProduct
            });
            return result;
        } catch (error) {
            throw new Error("Error al actualizar el producto. Error original: " + error.message);
        }
    };
}