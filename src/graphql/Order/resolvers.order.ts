import OrderService, {
  CreateOrderPayload,
  UpdateOrderPayload,
} from "../../services/order.js";

const orderQueries = {
  getOrder: async (_: any, { id }: { id: string }) => {
    return await OrderService.getOrderById(id);
  },

  getAllOrders: async () => {
    return await OrderService.getAllOrders();
  },
};

const orderMutations = {
  createOrder: async (_: any, payload: CreateOrderPayload) => {
    return await OrderService.createOrder(payload);
  },

  updateOrder: async (_: any, payload: UpdateOrderPayload) => {
    return await OrderService.updateOrder(payload);
  },

  deleteOrder: async (_: any, { id }: { id: string }) => {
    return await OrderService.deleteOrder(id);
  },
};

export const orderResolvers = {
  orderQueries,
  orderMutations,
};
