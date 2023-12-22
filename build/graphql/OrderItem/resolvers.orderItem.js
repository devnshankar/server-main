var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// resolvers.orderItem.js
import OrderItemService from "../../services/orderItem.js";
const orderItemQueries = {
    getOrderItem: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield OrderItemService.getOrderItemById(id);
    }),
    getAllOrderItems: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield OrderItemService.getAllOrderItems();
    }),
};
const orderItemMutations = {
    createOrderItem: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        return yield OrderItemService.createOrderItem(payload);
    }),
    updateOrderItem: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        return yield OrderItemService.updateOrderItem(payload);
    }),
    deleteOrderItem: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield OrderItemService.deleteOrderItem(id);
    }),
};
export const orderItemResolvers = { orderItemQueries, orderItemMutations };
