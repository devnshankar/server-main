// typedefs.notification.ts
export const notificationTypeDefs = `#graphql
  scalar DateTime
  
  type Notification {
    id: ID!
    user: User
    title: String
    description: String
    createdAt: DateTime!
  }

  extend type Query {
    getNotification(id: ID!): Notification
    getAllNotifications: [Notification]
  }

  extend type Mutation {
    createNotification(
      userId: ID!
      title: String
      description: String
    ): Notification

    deleteNotification(id: ID!): Notification
  }
`;
