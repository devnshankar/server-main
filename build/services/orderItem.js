var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// services/orderItem.js
import { prismaClient } from "../config/prismaClient.config.js";
class OrderItemService {
    // ORDER ITEM SERVICE FUNCTION: FIND AND RETURN ALL ORDER ITEMS
    static getAllOrderItems() {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient.orderItem.findMany();
        });
    }
    // ORDER ITEM SERVICE FUNCTION: FIND AND RETURN UNIQUE ORDER ITEM WITH ID
    static getOrderItemById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient.orderItem.findUnique({ where: { id } });
        });
    }
    // ORDER ITEM SERVICE FUNCTION: CREATE AND RETURN NEW ORDER ITEM
    static createOrderItem(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, productId, quantity, price, productImageUrl } = payload;
            // const orderId = "";  //find order id when updating it while creating order
            return yield prismaClient.orderItem.create({
                data: {
                    user: { connect: { id: userId } },
                    product: { connect: { id: productId } },
                    quantity,
                    price,
                    productImageUrl
                    // order: { connect: { id: orderId } }, // Include the orderId in the create data
                },
                include: { user: true, product: true },
            });
        });
    }
    // ORDER ITEM SERVICE FUNCTION: UPDATE ORDER ITEM DETAILS
    static updateOrderItem(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, quantity } = payload;
            return prismaClient.orderItem.update({
                where: { id },
                data: {
                    quantity,
                },
            });
        });
    }
    // ORDER ITEM SERVICE FUNCTION: DELETE ORDER ITEM WITH UNIQUE ID
    static deleteOrderItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient.orderItem.delete({
                where: { id },
            });
        });
    }
}
export default OrderItemService;
