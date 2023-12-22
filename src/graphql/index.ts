import { ApolloServer } from "@apollo/server";
import { User } from "./User/index.js";
import { Product } from "./Product/index.js";
import { Review } from "./Review/index.js";
import { Comment } from "./Comment/index.js";
import { Notification } from "./Notification/index.js";
import { OrderItem } from "./OrderItem/index.js";
import { Order } from "./Order/index.js";

async function createApolloGraphqlServer() {
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
      Query: {
        ...User.userResolvers.userQueries,
        ...Product.productResolvers.productQueries,
        ...Review.reviewResolvers.reviewQueries,
        ...Comment.commentResolvers.commentQueries,
        ...Notification.notificationResolvers.notificationQueries,
        ...OrderItem.orderItemResolvers.orderItemQueries,
        ...Order.orderResolvers.orderQueries,
      },
      Mutation: {
        ...User.userResolvers.userMutations,
        ...Product.productResolvers.productMutations,
        ...Review.reviewResolvers.reviewMutations,
        ...Comment.commentResolvers.commentMutations,
        ...Notification.notificationResolvers.notificationMutations,
        ...OrderItem.orderItemResolvers.orderItemMutations,
        ...Order.orderResolvers.orderMutations,
      },
    },
  });
  await server.start();

  return server;
}

export default createApolloGraphqlServer;
