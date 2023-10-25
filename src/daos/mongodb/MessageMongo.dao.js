import mongoose from "mongoose";
import { messageModel } from "./models/messages.model.js"
import config from "../../config.js";

export default class MessageDAO {

    // MONGOOSE
    connection = mongoose.connect( config.MONGO_URL );

    async createMessage(message) {
        try {
            const result = await messageModel.create(message);
            return result;
        } catch (error) {
            throw new Error("Error al crear el mensaje - DAO. Error original: " + error.message);
        }
    }

    async getAllMessage() {
        try {
            let result = await messageModel.find().lean();
            return result;
        } catch (error) {
            throw new Error("Error al obtener los mensajes - DAO. Error original: " + error.message);
        }
    }

    async deleteMessage(mid) {
        try {
            let result = await messageModel.deleteOne({
                _id: mid
            })
            return result;
        } catch (error) {
            throw new Error("Error al eliminar el mensaje - DAO. Error original: " + error.message);
        }
    }
}