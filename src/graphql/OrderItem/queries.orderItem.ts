// queries.orderItem.js
export const orderItemQueries = `#graphql
  getOrderItem(id: ID!): OrderItem
  getAllOrderItems: [OrderItem]
`;
