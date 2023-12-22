// queries.comment.ts
export const commentQueries = `#graphql
  getComment(id: ID!): Comment
  getAllComments: [Comment]
`;
