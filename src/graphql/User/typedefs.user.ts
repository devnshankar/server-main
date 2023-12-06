export const typeDefs = `#graphql
scalar DateTime
  type User {
    id: ID!
    firstName: String!
    lastName: String
    email: String!
    password: String!
    phoneNumber: String
    salt: String!
    profileImageUrl: String
    address: String
    token: String
    products: [Product]
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  
  extend type Query {
    getUser(id: ID!): User
    getAllUsers: [User]
  }

  extend type Mutation {
    createUser(
      firstName: String!
      lastName: String
      email: String!
      password: String!
      salt: String
      phoneNumber: String
      profileImageUrl: String
      address: String
      token: String
    ): User

    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
      phoneNumber: String
      profileImageUrl: String
      address: String
      token: String
    ): User
    
    deleteUser(id: ID!): User

    loginUser(
      email: String!
      password: String!
    ): User
  }
`;
