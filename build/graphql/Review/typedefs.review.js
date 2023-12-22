export const reviewTypeDefs = `#graphql
type Review {
  id: ID!
  product: Product
  stars: Int!
}

extend type Query {
  getReview(id: ID!): Review
  getAllReviews: [Review]
}

extend type Mutation {
  createReview(productId: ID!, stars: Int!): Review
  updateReview(id: ID!, stars: Int!): Review
  deleteReview(id: ID!): Review
}
`;
