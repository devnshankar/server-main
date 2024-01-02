// mutations.orderItem.js
export const orderItemMutations = `#graphql
    createOrderItem(userId: String!, productId: String!, quantity: Int!, price: Int!, productImageUrl: String!): OrderItem
    updateOrderItem(id: ID!,quantity: Int): OrderItem
    deleteOrderItem(id: ID!): OrderItem
`;
