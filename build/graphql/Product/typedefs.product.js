export const typeDefs = `#graphql
scalar DateTime
  type Product {
    id: ID!
    title: String!
    description: String!
    price: Float!
    productImageUrl: String
    owner: User
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    getAllProducts: [Product]
    getProductById(id: ID!): Product
  }

  extend type Mutation {
    createProduct(title: String!, description: String!, price: Float!, productImageUrl: String): Product
    updateProduct(id: ID!, title: String, description: String, price: Float, productImageUrl: String): Product
    deleteProduct(id: ID!): Product
  }
`;
