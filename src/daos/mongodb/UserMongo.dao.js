import mongoose from "mongoose";
import { userModel } from './models/users.model.js'
import config from "../../config.js";

export default class UserDAO {

    // MONGOOSE
    connection = mongoose.connect( config.MONGO_URL );

    async createUser(info) {
        try {
            const result = await userModel.create(info);
            return result;
        } catch (error) {
            throw new Error("Error al registrar el usurio - DAO. Error original: " + error.message);
        }
    };

    async getUserByEmailOrNameOrId(identifier) {
        try {
            const conditions = [{
                    email: identifier
                },
                {
                    first_name: identifier
                }
            ];
            if (mongoose.Types.ObjectId.isValid(identifier)) {
                conditions.push({
                    _id: identifier
                });
            }
            const result = await userModel.findOne({
                $or: conditions
            });
            return result;
        } catch (error) {
            throw new Error("Error al obtener el usuario por Email, Nombre o ID - DAO. Error original: " + error.message);
        }
    };

    async updateUser(uid, updateUser) {
        try {
            let result = await userModel.updateOne({
                _id: uid
            }, {
                $set: updateUser
            });
            let userUpdate = await userModel.findOne({
                _id: uid
            });
            return userUpdate;
        } catch (error) {
            throw new Error("Error al actualizar el usuario. Error original: " + error.message);
        }
    };
}