export const categoryTypeDefs = `#graphql
  type Category {
    id: ID!
    name: String!
    createdAt: DateTime!
    products: [Product]
  }

  extend type Query {
    getCategory(id: ID!): Category
    getAllCategories: [Category]
  }

  extend type Mutation {
    createCategory(name: String!): Category
  }
`;
