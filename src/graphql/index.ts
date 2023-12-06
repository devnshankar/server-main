import { ApolloServer } from "@apollo/server";
import { User } from "./User/index.js";
import { Product } from "./Product/index.js";

async function createApolloGraphqlServer() {
  const server = new ApolloServer({
    typeDefs: `#graphql
      ${User.typeDefs}
      ${Product.typeDefs}
      type Query {
        ${User.queries}
        ${Product.queries}
      }
      type Mutation {
        ${User.mutations}
        ${Product.mutations}
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Product.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Product.resolvers.mutations,
      },
    },
  });
  await server.start();

  return server;
}

export default createApolloGraphqlServer;
