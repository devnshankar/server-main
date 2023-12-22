// productTypeDefs.js
export const productTypeDefs = `#graphql
  scalar DateTime

  type Product {
    id: ID!
    title: String!
    description: String!
    category: String!
    price: Int!
    instock: Int!
    isPublished: Boolean!
    owner: User!
    ownerId: String!
    productImageUrl: String
    reviews: [Review]
    comments: [Comment]
    cart: [OrderItem]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    getProduct(id: ID!): Product
    getAllProducts: [Product]
  }

  extend type Mutation {
    createProduct(
      title: String!
      description: String!
      category: String!
      price: Int!
      instock: Int!
      ownerId: ID!
      productImageUrl: String
    ): Product

    updateProduct(
      id: ID!
      title: String
      description: String
      category: String
      price: Int
      instock: Int
      productImageUrl: String
    ): Product

    deleteProduct(id: ID!): Product
  }
`;
