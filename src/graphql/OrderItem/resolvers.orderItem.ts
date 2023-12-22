// resolvers.orderItem.js
import OrderItemService, {
  CreateOrderItemPayload,
  UpdateOrderItemPayload,
} from "../../services/orderItem.js";

const orderItemQueries = {
  getOrderItem: async (_: any, { id }: { id: string }) => {
    return await OrderItemService.getOrderItemById(id);
  },

  getAllOrderItems: async () => {
    return await OrderItemService.getAllOrderItems();
  },
};

const orderItemMutations = {
  createOrderItem: async (_: any, payload: CreateOrderItemPayload) => {
    return await OrderItemService.createOrderItem(payload);
  },

  updateOrderItem: async (_: any, payload: UpdateOrderItemPayload) => {
    return await OrderItemService.updateOrderItem(payload);
  },

  deleteOrderItem: async (_: any, { id }: { id: string }) => {
    return await OrderItemService.deleteOrderItem(id);
  },
};

export const orderItemResolvers = { orderItemQueries, orderItemMutations };
