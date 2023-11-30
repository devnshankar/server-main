var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserService from "../../services/user.js";
const queries = {
    getUserToken: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield UserService.getUserToken({
            email: payload.email,
            password: payload.password,
        });
        return token;
    }),
    getCurrentLoggedInUser: (_, parameters, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (context && context.user) {
            const id = context.user.id;
            const user = yield UserService.getUserById(id);
            return user;
        }
        throw new Error("I don't know you brother");
    }),
};
const mutations = {
    createUser: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield UserService.createUser(payload);
        return res.id;
    }),
};
export const resolvers = { queries, mutations };
