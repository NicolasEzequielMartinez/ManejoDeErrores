import MessageDAO from "../daos/mongodb/MessageMongo.dao.js";

export default class MessageService {
    constructor() {
        this.messageDao = new MessageDAO();
    }
    // Métodos MessageService: 
    async createMessageService(message) {
        let response = {};
        try {
            const result = await this.messageDao.createMessage(message);
            response.status = "success";
            response.message = "Mensaje creado exitosamente.";
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

    async getAllMessageService() {
        let response = {};
        try {
            const result = await this.messageDao.getAllMessage();
            if (result.length === 0) {
                response.status = "error";
                response.message = "No se encontraron mensajes.";
                response.statusCode = 404;
            } else {
                response.status = "success";
                response.message = "Mensajes obtenidos exitosamente.";
                response.result = result;
                response.statusCode = 200;
            }
        } catch (error) {
            response.status = "error";
            response.message = "Error al obtener los mensajes.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };

    async deleteMessageService(mid){
        let response = {};
        try {
            const result = await this.messageDao.deleteMessage(mid);
            if (result.deletedCount === 0) {
                response.status = "error";
                response.message =  `No se encontró ningún mensaje con el ID ${mid}.`;
                response.statusCode = 404;
            } else {
                response.status = "success";
                response.message = "Mensaje eliminado exitosamente.";
                response.result = result;
                response.statusCode = 200;
            }
        } catch (error) {
            response.status = "error";
            response.message = "Error al eliminar el mensaje.";
            response.error = error.message;
            response.statusCode = 500;
        }
        return response;
    };
}