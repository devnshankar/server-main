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
import { Product } from "./Product/index.js";
import { Review } from "./Review/index.js";
import { Comment } from "./Comment/index.js";
import { Notification } from "./Notification/index.js";
import { OrderItem } from "./OrderItem/index.js";
import { Order } from "./Order/index.js";
function createApolloGraphqlServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new ApolloServer({
            typeDefs: `#graphql
      ${User.userTypeDefs}
      ${Product.productTypeDefs}
      ${Review.reviewTypeDefs}
      ${Comment.commentTypeDefs}
      ${Notification.notificationTypeDefs}
      ${OrderItem.orderItemTypeDefs}
      ${Order.orderTypeDefs}

      type Query {
        ${User.userQueries}
        ${Product.productQueries}
        ${Review.reviewQueries}
        ${Comment.commentQueries}
        ${Notification.notificationQueries}
        ${OrderItem.orderItemQueries}
        ${Order.orderQueries}
      }
      
      type Mutation {
        ${User.userMutations}
        ${Product.productMutations}
        ${Review.reviewMutations}
        ${Comment.commentMutations}
        ${Notification.notificationMutations}
        ${OrderItem.orderItemMutations}
        ${Order.orderMutations}
      }
    `,
            resolvers: {
                Query: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, User.userResolvers.userQueries), Product.productResolvers.productQueries), Review.reviewResolvers.reviewQueries), Comment.commentResolvers.commentQueries), Notification.notificationResolvers.notificationQueries), OrderItem.orderItemResolvers.orderItemQueries), Order.orderResolvers.orderQueries),
                Mutation: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, User.userResolvers.userMutations), Product.productResolvers.productMutations), Review.reviewResolvers.reviewMutations), Comment.commentResolvers.commentMutations), Notification.notificationResolvers.notificationMutations), OrderItem.orderItemResolvers.orderItemMutations), Order.orderResolvers.orderMutations),
            },
        });
        yield server.start();
        return server;
    });
}
export default createApolloGraphqlServer;
