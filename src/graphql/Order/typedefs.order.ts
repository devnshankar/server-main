export const orderTypeDefs = `#graphql
scalar DateTime

type Order {
  id: ID!
  user: User
  products: [Product]
  createdAt: DateTime!
  updatedAt: DateTime!
  status: String
}

extend type Query {
  getOrder(id: ID!): Order
  getAllOrders: [Order]
}

extend type Mutation {
  createOrder(userId: ID!, productIds: [ID!]!): Order
  updateOrder(id: ID!, status: String!): Order
  deleteOrder(id: ID!): Order
}

`;
