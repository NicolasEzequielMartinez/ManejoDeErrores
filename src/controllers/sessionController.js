import jwt from 'jsonwebtoken';
import passport from 'passport';
import config from "../config.js";
import {CurrentUserDTO} from './DTO/user.dto.js';

export const registerUser = (req, res, next) => {
    passport.authenticate('register', {
        session: false
    }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                message: info.message
            });
        }
        res.json({
            message: 'Registro exitoso',
            user
        });
    })(req, res, next);
};

export const loginUser = (req, res, next) => {
    passport.authenticate('login', {
        session: false
    }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                message: info.message
            });
        } else {
            let token = jwt.sign({
                email: user.email,
                first_name: user.first_name,
                tickets: user.tickets,
                role: user.role,
                cart: user.cart,
                userID: user._id
            }, config.JWT_SECRET, {
                expiresIn: '7d'
            });
            res.cookie(config.JWT_COOKIE, token, {
                httpOnly: true
            }).send({
                status: 'success'
            });
        }
    })(req, res, next);
};

export const getCurrentUser = (req, res) => {
    res.send(new CurrentUserDTO(req.user));
};

export const authenticateWithGitHub = (req, res, next) => {
    passport.authenticate('github', {
        session: false
    }, (err, user, info) => {
        console.log('usurrio' + user)
        if (err) {
            return next(err);
        }
        if (user.password === "Sin contraseña.") {
            res.cookie('userId', user._id, {
                httpOnly: true,
                maxAge: 1 * 60 * 1000
            }).redirect('/completeProfile');
        } else {
            res.redirect('/products');
        }
    })(req, res, next);
};

export const getProfileUser = async (req, res) => {
    const user = new CurrentUserDTO(req.user);
    res.render('profile', {
        title: 'Perfil',
        user: user
    });
};