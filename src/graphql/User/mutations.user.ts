export const mutations = `#graphql
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

    loginUser(
        email: String!
        password: String!
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
`;
