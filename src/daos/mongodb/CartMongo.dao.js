import mongoose from "mongoose";
import { cartModel } from "./models/carts.model.js";
import {ticketModel} from "./models/ticket.model.js";
import config from "../../config.js";

export default class CartsDAO {

  // MONGOOSE
  connection = mongoose.connect( config.MONGO_URL );

  async createCart() {
    try {
      const result = await cartModel.create({
        products: [],
        tickets: []
      });
      return result;
    } catch (error) {
      throw new Error("Error al crear el carrito - DAO. Error original: " + error.message);
    };
  };

  async getCartById(cid) {
    try {
      const result = await cartModel.findOne({_id: cid }).populate(['products.product', 'tickets.ticketsRef']);
      return result;
    } catch (error) {
      throw new Error("Error al obtener el carrito por ID - DAO. Error original: " + error.message);
    };
  };

  async getAllCarts() {
    try {
      const result = await cartModel.find();
      return result;
    } catch (error) {
      throw new Error("Error al obtener todos los carritos - DAO. Error original: " + error.message);
    };
  };

  async addProductToCart(cid, product, quantity) {
    try {
      const cart = await this.getCartById(cid);
      const productID = product._id.toString();
      const existingProductIndex = cart.products.findIndex(p => p.product._id.toString() === productID);
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity +=  parseInt(quantity, 10);
      } else {
        cart.products.push({
          product: product,
          quantity: quantity
        });
      }
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error("Error al agregar el producto al carrito - DAO. Original error: " + error.message);
    }
  };

  async addTicketToCart(cid, ticketID) {
    try {
      const cart = await this.getCartById(cid);
      const existingTicketIndex = cart.tickets.findIndex(t => t.ticketsRef.toString() === ticketID);
      if (existingTicketIndex === -1) {
        cart.tickets.push({
          ticketsRef: ticketID
        });
        await cart.save();
      }
      return cart;
    } catch (error) {
      throw new Error("Error al agregar el ticket al carrito - DAO. Original error: " + error.message);
    }
  }

  async deleteProductFromCart(cid, pid) {
    try {
      const cart = await this.getCartById(cid);
      cart.products.pull(pid);
      await cart.save();
      return {
        status: 'success'
      };
    } catch (error) {
      throw new Error("Error al borrar el producto en carrito - DAO. Original error: " + error.message);
    }
  };

  async updateProductInCart(cid, pid, updatedProdInCart) {
    try {
      const cart = await this.getCartById(cid);
      const product = cart.products.find((p) => p._id.toString() === pid);
      if (!product) {
        throw new Error(`No se encontró ningún producto con el ID ${pid} en el carrito.`);
      }
      product.quantity = updatedProdInCart.quantity;
      await cart.save();
      return {
        cart
      };
    } catch (error) {
      throw new Error("Error al actualizar producto en carrito - DAO. Original error: " + error.message);
    }
  };

  async deleteAllProductFromCart(cartId) {
    try {
      const cart = await this.consultarCartPorId(cartId);
      cart.products = [];
      await cart.save();
      return {
        status: 'success'
      };
    } catch (error) {
      throw new Error("Error al borrar todos los productos en carrito - DAO. Original error: " + error.message);
    }
  };

  async updateCart(cid, updatedCartFields) {
    try {
      let result = await cartModel.updateOne({
        _id: cid
      }, {
        $set: updatedCartFields
      });
      return result;
    } catch (error) {
      throw new Error("Error al actualizar el carrito - DAO. Original error: " + error.message);
    }
  };
}