// services/orderItem.js
import { prismaClient } from "../config/prismaClient.config.js";
import { GraphQLError } from "graphql";

export interface CreateOrderItemPayload {
  userId: string;
  productId: string;
  quantity: number;
}

export interface UpdateOrderItemPayload {
  id: string;
  quantity?: number;
}

class OrderItemService {
  // ORDER ITEM SERVICE FUNCTION: FIND AND RETURN ALL ORDER ITEMS
  public static async getAllOrderItems() {
    return prismaClient.orderItem.findMany();
  }

  // ORDER ITEM SERVICE FUNCTION: FIND AND RETURN UNIQUE ORDER ITEM WITH ID
  public static async getOrderItemById(id: string) {
    return prismaClient.orderItem.findUnique({ where: { id } });
  }

  // ORDER ITEM SERVICE FUNCTION: CREATE AND RETURN NEW ORDER ITEM
  public static async createOrderItem(payload: CreateOrderItemPayload) {
    const { userId, productId, quantity } = payload;

    // Replace this with your actual logic to get the orderId
    const orderId = await prismaClient.order.findFirst({
      where: {
        userId: userId,
        status: "OPEN", // Add conditions based on your order model
      },
      select: {
        id: true,
      },
    });

    if (!orderId) {
      // You may want to handle the case where there is no open order for the user
      throw new Error("No open order found for the user");
    }

    return await prismaClient.orderItem.create({
      data: {
        userId,
        productId,
        quantity,
        orderId: orderId.id, // Include the orderId in the create data
      },
    });
  }
  
  // ORDER ITEM SERVICE FUNCTION: UPDATE ORDER ITEM DETAILS
  public static async updateOrderItem(payload: UpdateOrderItemPayload) {
    const { id, quantity } = payload;

    return prismaClient.orderItem.update({
      where: { id },
      data: {
        quantity,
      },
    });
  }

  // ORDER ITEM SERVICE FUNCTION: DELETE ORDER ITEM WITH UNIQUE ID
  public static async deleteOrderItem(id: string) {
    return prismaClient.orderItem.delete({
      where: { id },
    });
  }
}

export default OrderItemService;
