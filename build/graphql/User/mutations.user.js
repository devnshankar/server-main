export const userMutations = `#graphql
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
`;
