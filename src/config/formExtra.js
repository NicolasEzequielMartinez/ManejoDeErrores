import jwt from 'jsonwebtoken';
import config from "../config.js";

import UserController from '../controllers/userController.js';

const userController = new UserController();

export const completeProfile = async (req, res) => {

    const userId = req.cookies.userId;
    console.log('Valor de la cookie userId:', userId);

    const last_name = req.body.last_name;
    const email = req.body.email;
    const age = req.body.age;
    const password = req.body.password;

    try {
        const updateUser = {
            last_name,
            email,
            age,
            password,
        };
        const responseControllerU = await userController.updateUserController(userId, updateUser);
        const userCompleteDB = responseControllerU.result;
        let token = jwt.sign({
            email: userCompleteDB.email,
            first_name: userCompleteDB.first_name,
            tickets: userCompleteDB.tickets,
            role: userCompleteDB.role,
            cart: userCompleteDB.cart,
            userID: userCompleteDB._id
        }, config.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.cookie(config.JWT_COOKIE, token, {
            httpOnly: true
        })
        
        res.send({
            status: 'success',
            redirectTo: '/products'
        });

    } catch (error) {
        console.error('Error al completar el perfil:', error);
        res.status(500).json({
            message: 'Error al completar el perfil. Inténtalo de nuevo.'
        });
    }
};