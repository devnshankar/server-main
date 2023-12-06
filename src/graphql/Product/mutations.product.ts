export const mutations = `#graphql
  createProduct(title: String!, description: String!, price: Float!, productImageUrl: String): Product
  updateProduct(id: ID!, title: String, description: String, price: Float, productImageUrl: String): Product
  deleteProduct(id: ID!): Product
`;
