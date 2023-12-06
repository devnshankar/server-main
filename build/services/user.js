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
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
class UserService {
    static generateHash(salt, password) {
        const hashedPassword = createHmac("sha256", salt)
            .update(password)
            .digest("hex");
        return hashedPassword;
    }
    static decodeJWTToken(token) {
        return jwt.verify(token, JWT_SECRET);
    }
    static getUserToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield UserService.getUserByEmail(email);
            if (!user)
                throw new GraphQLError("User not found");
            const userSalt = user.salt;
            const usersHashPassword = UserService.generateHash(userSalt, password);
            if (usersHashPassword !== user.password)
                throw new GraphQLError("Incorrect Password");
            // generate token
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
                expiresIn: "30d",
            });
            return token;
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient.user.findMany();
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient.user.findUnique({ where: { email } });
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient.user.findUnique({ where: { id } });
        });
    }
    static createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName = "", email, password, phoneNumber, profileImageUrl, address, token = "", } = payload;
            const user = yield UserService.getUserByEmail(email);
            if (!!user)
                throw new GraphQLError("A user is already registered with the email", {
                    extensions: {
                        code: "USER_ALREADY_EXISTS",
                    },
                });
            // encrypt password
            const salt = randomBytes(32).toString("hex");
            const hashedPassword = UserService.generateHash(salt, password);
            return yield prismaClient.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    salt: salt,
                    phoneNumber,
                    profileImageUrl,
                    address,
                    token,
                },
            });
        });
    }
    static loginUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield UserService.getUserByEmail(email);
            if (!user)
                throw new GraphQLError("User doesn't exist with this email", {
                    extensions: {
                        code: "USER_DOESN'T_EXIST",
                    },
                });
            const userSalt = user.salt;
            const usersHashPassword = UserService.generateHash(userSalt, password);
            if (usersHashPassword !== user.password)
                throw new GraphQLError("The password doesn't matchd", {
                    extensions: {
                        code: "INCORRECT_PASSWORD",
                    },
                });
            const authToken = yield UserService.getUserToken({ email, password });
            return yield UserService.updateUser({
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
                address: user.address,
                token: authToken,
            });
        });
    }
    static updateUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, phoneNumber, email, password, profileImageUrl, address, token, } = payload;
            return prismaClient.user.update({
                where: { email },
                data: {
                    firstName,
                    lastName,
                    phoneNumber,
                    email,
                    password,
                    profileImageUrl,
                    address,
                    token,
                },
            });
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient.user.delete({
                where: { id },
            });
        });
    }
}
export default UserService;
