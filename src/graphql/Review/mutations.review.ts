export const reviewMutations = `#graphql
createReview(productId: ID!, stars: Int!): Review
updateReview(id: ID!, stars: Int!): Review
deleteReview(id: ID!): Review
`;