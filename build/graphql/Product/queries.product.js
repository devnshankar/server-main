// queries.product.js
export const productQueries = `#graphql
  getProduct(id: ID!): Product
  getAllProducts: [Product]
`;
