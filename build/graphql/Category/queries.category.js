// queries.category.ts
export const categoryQueries = `#graphql
  getCategory(id: ID!): Category
  getAllCategories: [Category]
`;
