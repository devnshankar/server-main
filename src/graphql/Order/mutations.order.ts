export const orderMutations = `#graphql
createOrder(userId: ID!, productIds: [ID!]!): Order
updateOrder(id: ID!, status: String!): Order
deleteOrder(id: ID!): Order
`;
