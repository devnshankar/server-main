export const userTypeDefs = `#graphql
scalar DateTime
type User {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  salt: String!
  token: String
  phoneNumber: String
  address: String
  profileImageUrl: String
  products: [Product]
  cart: [OrderItem]
  notifications: [Notification]
  orders: [Order]
  comments: [Comment]
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
      lastName: String!
      email: String!
      password: String!
      salt: String
      token: String
      phoneNumber: String
      address: String
      profileImageUrl: String
    ): User

    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
      token: String
      phoneNumber: String
      address: String
      profileImageUrl: String
    ): User
    
    loginUser(
      email: String!
      password: String!
    ): User
    
    deleteUser(id: ID!): User
  }
`;
