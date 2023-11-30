var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApolloServer } from "@apollo/server";
import { User } from "./User/index.js";
function createApolloGraphqlServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new ApolloServer({
            typeDefs: `
      ${User.typeDefs}
      type Query {
        ${User.queries}

      }
      type Mutation {
        ${User.mutations}
      }
    `,
            resolvers: {
                Query: Object.assign({}, User.resolvers.queries),
                Mutation: Object.assign({}, User.resolvers.mutations),
            },
        });
        yield server.start();
        return server;
    });
}
export default createApolloGraphqlServer;
