// mutations.product.js
export const productMutations = `#graphql
    createProduct(
        ownerId: String!
        title: String!
        description: String
        category: String!
        price: Int!
        instock: Int
        isPublished: Boolean
        productImageUrl: String
    ): Product

    updateProduct(
        id: ID!
        title: String
        description: String
        category: String
        price: Int
        instock: Int
        isPublished: Boolean
        productImageUrl: String
    ): Product

    deleteProduct(id: ID!): Product
`;
