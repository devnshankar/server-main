// typedefs.comment.ts
export const commentTypeDefs = `#graphql
  type Comment {
    id: ID!
    product: Product
    user: User
    content: String!
    createdAt: DateTime!
  }

  extend type Query {
    getComment(id: ID!): Comment
    getAllComments: [Comment]
  }

  extend type Mutation {
    createComment(
      productId: ID!
      userId: ID!
      content: String!
    ): Comment
  }
`;
