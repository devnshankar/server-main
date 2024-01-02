// services/orderItem.js
import { prismaClient } from "../config/prismaClient.config.js";
import { GraphQLError } from "graphql";

export interface CreateOrderItemPayload {
  userId: string;  //id of the user trying to add the product to it's cart
  productId: string;  //id of the product being added to the cart
  quantity: number;
  price: number;
  productImageUrl: string;
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
    const { userId, productId, quantity, price , productImageUrl } = payload;

    // const orderId = "";  //find order id when updating it while creating order
    return await prismaClient.orderItem.create({
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
