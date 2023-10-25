import mongoose from "mongoose";
import { ticketModel } from './models/ticket.model.js'
import config from "../../config.js";

export default class TicketDAO {

    // MONGOOSE
    connection = mongoose.connect( config.MONGO_URL );

    async createTicket(ticketInfo) {
        try {
            const result = await ticketModel.create(ticketInfo);
            return result;
        } catch (error) {
            throw new Error("No se pudo crear la colección de tickets para el usuario - DAO. Error original: " + error.message);
        }
    };

    async getTicketsByID(tid) {
        try {
            const result = await ticketModel.findOne({
                _id: tid
            }).populate('tickets.ticket');
            return result;
        } catch (error) {
            throw new Error("No se pudieron obtener los tickets del usuario - DAO. Error original: " + error.message);
        }
    }; 
}
