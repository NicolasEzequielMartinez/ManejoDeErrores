import passport from 'passport';
import local from 'passport-local';
import config from "../config.js";
import { createHash, isValidPassword } from '../utils/bcrypt.utils.js';

import UserController from '../controllers/userController.js'
import CartController from '../controllers/cartController.js';

const localStrategy = local.Strategy;

const userController = new UserController();
const cartController = new CartController();

export const initializePassportLocal = () => {
    // Primera estrategia - Registro:
    passport.use('register', new localStrategy({
            passReqToCallback: true,
            usernameField: 'email'
        },
        async (req, username, password, done) => {
            const {
                first_name,
                last_name,
                email,
                age,
            } = req.body;
            try {
                const responseControllerU = await userController.getUserByEmailOrNameOrIdController(username);
                const exist = responseControllerU.result;
                if (exist) {
                    const errorMessage = 'El usuario ya existe. Presione "Ingresa aquí" para iniciar sesión.';
                    return done(null, false, {
                        message: errorMessage
                    });
                } else {
                    const responseControllerC = await cartController.createCartController();
                    const cart = responseControllerC.result;
                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password),
                        role: 'User',
                        cart: cart._id,
                    };
                    const responseControllerU = await userController.createUserControler(newUser);
                    const user = responseControllerU.result;
                    return done(null, result);
                }
            } catch (error) {
                return done('Error de registro', error);
            }
        }
    ));
    // Segunda estrategia - Login:
    passport.use(
        'login',
        new localStrategy({
            usernameField: 'email'
        }, async (username, password, done) => {
            try {
                if (username === config.ADMIN_NAME && password === config.ADMIN_PASSWORD) {
                    let userAdmin = {
                        name: "Admin",
                        email: config.ADMIN_NAME,
                        age: "00",
                        role: "admin",
                        id: 0,
                        cart: 0,
                    };
                    return done(null, userAdmin);
                } else {
                    const responseControllerU = await userController.getUserByEmailOrNameOrIdController(username);
                    const user = responseControllerU.result;
                    if (!user) {
                        const errorMessage = 'No hay una cuenta registrada con este correo. Presione "Regístrarse aquí" para crear una cuenta.';
                        return done(null, false, {
                            message: errorMessage
                        });
                    }
                    if (!isValidPassword(user, password)) {
                        const errorMessage = 'El correo sí se encuentra registrado pero, la contraseña ingresada es incorrecta.';
                        return done(null, false, {
                            message: errorMessage
                        });
                    }
                    return done(null, user);
                }
            } catch (error) {
                return done(error);
            }
        })
    );
};