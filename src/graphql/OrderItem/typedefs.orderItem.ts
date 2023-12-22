// typedefs.orderItem.js
export const orderItemTypeDefs = `#graphql
  type OrderItem {
    id: ID!
    user: User
    product: Product
    quantity: Int
    order: Order
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    getOrderItem(id: ID!): OrderItem
    getAllOrderItems: [OrderItem]
  }

  extend type Mutation {
    createOrderItem(
      userId: String!
      productId: String!
      quantity: Int!
    ): OrderItem

    updateOrderItem(
      id: ID!
      quantity: Int
    ): OrderItem

    deleteOrderItem(id: ID!): OrderItem
  }
`;
