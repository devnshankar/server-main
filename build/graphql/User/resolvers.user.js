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
const userQueries = {
    getUser: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield UserService.getUser(id);
    }),
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield UserService.getAllUsers();
    }),
};
const userMutations = {
    createUser: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        return yield UserService.createUser(payload);
    }),
    loginUser: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        return UserService.loginUser(payload);
    }),
    updateUser: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        return yield UserService.updateUser(payload);
    }),
    deleteUser: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield UserService.deleteUser(id);
    }),
};
export const userResolvers = { userQueries, userMutations };
