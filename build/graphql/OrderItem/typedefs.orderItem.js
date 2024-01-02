// typedefs.orderItem.js
export const orderItemTypeDefs = `#graphql
  type OrderItem {
    id: ID!
    userId: String!
    user: User
    productId: String!
    product: Product
    quantity: Int
    productImageUrl: String
    price: Int!
    # orderId: String!
    # order: Order
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
      productImageUrl: String
      price: Int!
      # orderId: String!
    ): OrderItem

    updateOrderItem(
      id: ID!
      quantity: Int
    ): OrderItem

    deleteOrderItem(id: ID!): OrderItem
  }
`;
