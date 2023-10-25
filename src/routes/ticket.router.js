import { Router } from "express";
import TicketController from '../controllers/ticketsController.js'

const ticketRouter = Router();

let ticketController = new TicketController();

ticketRouter.get("/:tid", async (req, res) => {
    const result = await ticketController.getTicketsByIdController(req, res);
    res.status(result.statusCode).send(result);
});

export default ticketRouter;