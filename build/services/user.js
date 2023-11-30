var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createHmac, randomBytes } from "node:crypto";
import { prismaClient } from "../config/prismaClient.config.js";
import JWT from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
class UserService {
    static generateHash(salt, password) {
        const hashedPassword = createHmac("sha256", salt)
            .update(password)
            .digest("hex");
        return hashedPassword;
    }
    static decodeJWTToken(token) {
        return JWT.verify(token, JWT_SECRET);
    }
    static getUserToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield UserService.getUserByEmail(email);
            if (!user)
                throw new Error("user not found");
            const userSalt = user.salt;
            const usersHashPassword = UserService.generateHash(userSalt, password);
            if (usersHashPassword !== user.password)
                throw new Error("Incorrect Password");
            // generate token
            const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
            return token;
        });
    }
    static createUser(payload) {
        const { firstName, lastName, email, password } = payload;
        const salt = randomBytes(32).toString("hex");
        const hashedPassword = UserService.generateHash(salt, password);
        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password: hashedPassword,
            },
        });
    }
    static getUserByEmail(email) {
        return prismaClient.user.findUnique({ where: { email } });
    }
    static getUserById(id) {
        return prismaClient.user.findUnique({ where: { id } });
    }
}
export default UserService;
