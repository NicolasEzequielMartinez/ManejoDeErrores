import UserDAO from "../daos/mongodb/UserMongo.dao.js";

export default class UserService { 
    constructor() {
        this.userDAO = new UserDAO();
    };

    // Métodos UserService: 
    async createUserService(info) {
        let response = {};
        try {
            const result = await this.userDAO.createUser(info);
            response.status = "success";
            response.message = "Usuario registrado exitosamente.";
            response.result = result;
            response.statusCode = 201;
        } catch (error) {
            response.status = "error";
            response.message = "Error al registrar al usuario.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };

    async getUserByEmailOrNameOrIdService(identifier) {
        let response = {};
        try {
            const result = await this.userDAO.getUserByEmailOrNameOrId(identifier);
            if (!result) {
                response.status = "error";
                response.message = `No se encontró ningún usuario con el Email, Nombre o ID proporcionado - Service.`;
                response.statusCode = 404;
            } else {
                response.status = "success";
                response.message = "Usuario encontrado.";
                response.result = result;
                response.statusCode = 200;
            }
        } catch (error) {
            response.status = "error";
            response.message = "No se pudo obtener el usuario.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };

    async updateUserProfileSevice(uid, updateUser) {
        let response = {};
        try {
            const result = await this.userDAO.updateUser(uid, updateUser);
            if (!result) {
                response.status = "error";
                response.message = `No se encontró ningún usuario con el ID proporcionado.`;
                response.statusCode = 404;
            } else {
                response.status = "success";
                response.message = "Usuario actualizado exitosamente.";
                response.result = result;
                response.statusCode = 200;
            }
        } catch (error) {
            response.status = "error";
            response.message = "Error al actualizar el usuario.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };
}