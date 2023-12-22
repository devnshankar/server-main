var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import OrderService from "../../services/order.js";
const orderQueries = {
    getOrder: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield OrderService.getOrderById(id);
    }),
    getAllOrders: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield OrderService.getAllOrders();
    }),
};
const orderMutations = {
    createOrder: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        return yield OrderService.createOrder(payload);
    }),
    updateOrder: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        return yield OrderService.updateOrder(payload);
    }),
    deleteOrder: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield OrderService.deleteOrder(id);
    }),
};
export const orderResolvers = {
    orderQueries,
    orderMutations,
};
