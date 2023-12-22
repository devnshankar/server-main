var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
class OrderService {
    static createOrder(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, productIds } = payload;
            try {
                const createdOrder = yield prisma.order.create({
                    data: {
                        user: { connect: { id: userId } },
                        products: { connect: productIds.map((id) => ({ id })) },
                        status: "Pending", // Provide the default status or set it based on your business logic
                    },
                });
                return createdOrder;
            }
            catch (error) {
                throw new Error("Failed to create order");
            }
        });
    }
    static updateOrder(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, status } = payload;
            try {
                const updatedOrder = yield prisma.order.update({
                    where: { id },
                    data: { status },
                });
                return updatedOrder;
            }
            catch (error) {
                throw new Error("Failed to update order");
            }
        });
    }
    static deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedOrder = yield prisma.order.delete({
                    where: { id },
                });
                return deletedOrder;
            }
            catch (error) {
                throw new Error("Failed to delete order");
            }
        });
    }
    static getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield prisma.order.findUnique({
                    where: { id },
                });
                return order;
            }
            catch (error) {
                throw new Error("Failed to retrieve order");
            }
        });
    }
    static getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield prisma.order.findMany();
                return orders;
            }
            catch (error) {
                throw new Error("Failed to retrieve all orders");
            }
        });
    }
}
export default OrderService;
