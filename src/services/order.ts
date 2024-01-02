import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface CreateOrderPayload {
  userId: string;
  productIds: string[];
}

export interface UpdateOrderPayload {
  id: string;
  status: string;
}

class OrderService {
  public static async createOrder(payload: CreateOrderPayload) {
    const { userId, productIds } = payload;
    try {
      const createdOrder = await prisma.order.create({
        data: {
          user: { connect: { id: userId } },
          // products: { connect: productIds.map((id) => ({ id })) },
          status: "Pending", // Provide the default status or set it based on your business logic
        },
      });

      return createdOrder;
    } catch (error) {
      throw new Error("Failed to create order");
    }
  }

  public static async updateOrder(payload: UpdateOrderPayload) {
    const { id, status } = payload;
    try {
      const updatedOrder = await prisma.order.update({
        where: { id },
        data: { status },
      });

      return updatedOrder;
    } catch (error) {
      throw new Error("Failed to update order");
    }
  }

  public static async deleteOrder(id: string) {
    try {
      const deletedOrder = await prisma.order.delete({
        where: { id },
      });

      return deletedOrder;
    } catch (error) {
      throw new Error("Failed to delete order");
    }
  }

  public static async getOrderById(id: string) {
    try {
      const order = await prisma.order.findUnique({
        where: { id },
      });

      return order;
    } catch (error) {
      throw new Error("Failed to retrieve order");
    }
  }

  public static async getAllOrders() {
    try {
      const orders = await prisma.order.findMany();

      return orders;
    } catch (error) {
      throw new Error("Failed to retrieve all orders");
    }
  }
}

export default OrderService;
