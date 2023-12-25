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
    // USER SERVICE FUNCTION: GENERATE HASHED PASSWORD
    static generateHash(salt, password) {
        const hashedPassword = createHmac("sha256", salt)
            .update(password)
            .digest("hex");
        return hashedPassword;
    }
    // USER SERVICE FUNCTION: DECODE JWT TOKEN AND RETURN DATA WRAPPED INSIDE
    static decodeJWTToken(token) {
        return jwt.verify(token, JWT_SECRET);
    }
    // USER SERVICE FUNCTION: VERIFY USER CREDENTIAL, GENERATE AND RETURN JWT TOKEN
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
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
                expiresIn: "30d",
            });
            return token;
        });
    }
    // USER SERVICE FUNCTION: FIND AND RETURN ALL USERS
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient.user.findMany({});
        });
    }
    // USER SERVICE FUNCTION: FIND AND RETURN UNIQUE USER WITH EMAIL
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient.user.findUnique({
                where: { email },
                include: { products: true },
            });
        });
    }
    // USER SERVICE FUNCTION: FIND AND RETURN UNIQUE USER WITH ID
    static getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient.user.findUnique({
                where: { id },
                include: { products: true },
            });
        });
    }
    // USER SERVICE FUNCTION: CREATE AND RETURN NEW USER
    static createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password, token = "", phoneNumber, address, profileImageUrl, } = payload;
            // console.log(lastName);
            const stringifiedLastName = lastName ? lastName.toString() : "";
            // console.log(
            //   JSON.stringify({ firstName, lastName, email, password }, null, 2)
            // );
            const user = yield UserService.getUserByEmail(email);
            if (!!user)
                throw new GraphQLError("A user is already registered with the email", {
                    extensions: {
                        code: "USER_ALREADY_EXISTS",
                    },
                });
            const salt = randomBytes(32).toString("hex");
            const hashedPassword = UserService.generateHash(salt, password);
            return yield prismaClient.user.create({
                data: {
                    firstName,
                    lastName: stringifiedLastName,
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
    // USER SERVICE FUNCTION: VERIFY USER CREDENTIAL, GENERATE NEW TOKEN, UPDATE AND RETURN USER
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
                throw new GraphQLError("The password doesn't match", {
                    extensions: {
                        code: "INCORRECT_PASSWORD",
                    },
                });
            const authToken = yield UserService.getUserToken({ email, password });
            // console.log(authToken);
            // console.log("user retrieved from database", user);
            yield UserService.updateUser({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: authToken,
                phoneNumber: user.phoneNumber,
                address: user.address,
                profileImageUrl: user.profileImageUrl,
            });
            return yield UserService.getUser(user.id);
        });
    }
    // USER SERVICE FUNCTION: UPDATE USER CREDENTIAL
    static updateUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password, token, phoneNumber, address, profileImageUrl, } = payload;
            const updatedUserData = {
                firstName,
                lastName,
                email,
                password,
                token,
                phoneNumber,
                address,
                profileImageUrl: profileImageUrl !== undefined ? profileImageUrl : null,
            };
            // console.log("updatedUserData", updatedUserData);
            yield prismaClient.user.update({
                where: { email },
                data: updatedUserData,
            });
            return yield UserService.getUserByEmail(email);
        });
    }
    // USER SERVICE FUNCTION: DELETE USER WITH UNIQUE ID
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient.user.delete({
                where: { id },
            });
        });
    }
}
export default UserService;
