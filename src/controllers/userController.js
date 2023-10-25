import UserService from "../services/user.service.js";
import mongoose from 'mongoose';

export default class UserController {
    constructor() {
        this.userService = new UserService();
    }
    // Métodos UserController: 
    async createUserControler(info) {
        let response = {};
        try {
            if (!info) {
                response.status = "error";
                response.message = `No se proporcionaron los datos para el registro.`;
                response.statusCode = 400;
            } else {
                const responseService = await this.userService.createUserService(info);
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
            return response
        } catch (error) {
            console.error('Error:', error.message);
            response.status = "error";
            response.message = "Error al registrar el usuario: " + error.message;
            response.error = error.message;
            response.statusCode = 500;
            return response;
        }
    }

    async getUserByEmailOrNameOrIdController(identifier) {
        let response = {};
        try {
            if (!identifier) {
                response.status = "error";
                response.message = `No se proporcionó ningún email, nombre o ID de usuario.`;
                response.statusCode = 400;
            } else {
                const responseService = await this.userService.getUserByEmailOrNameOrIdService(identifier);
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
            console.error('Error:', error.message);
            response.status = "error";
            response.message = "Error al obtener usuario por su Email, Nombre o ID: " + error.message;
            response.error = error.message;
            response.statusCode = 500;
            return response;
        }
    }

    async updateUserController(uid, updatedUser) {
        let response = {};
        try {
            if (!uid) {
                response.status = "error";
                response.message = `No se proporcionó ningún ID de usuario.`;
                response.statusCode = 400;
            } else if (!mongoose.Types.ObjectId.isValid(uid)) {
                response.status = "error";
                response.message = `ID de usuario inválido.`;
                response.statusCode = 400;
            } else if (!updatedUser) {
                response.status = "error";
                response.message = `No se proporcionaron los datos para la actualización.`;
                response.statusCode = 400;
            } else {
                const responseService = await this.userService.updateUserProfileSevice(uid, updatedUser);
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
            console.error('Error:', error.message);
            response.status = "error";
            response.message = "Error al actualizar el usuario: " + error.message;
            response.error = error.message;
            response.statusCode = 500;
            return response;
        }
    }
}