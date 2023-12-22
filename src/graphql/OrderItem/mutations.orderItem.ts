// mutations.orderItem.js
export const orderItemMutations = `#graphql
    createOrderItem(userId: String!, productId: String!, quantity: Int!): OrderItem
    updateOrderItem(id: ID!,quantity: Int): OrderItem
    deleteOrderItem(id: ID!): OrderItem
`;
