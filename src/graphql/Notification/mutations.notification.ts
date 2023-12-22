// mutations.notification.ts
export const notificationMutations = `#graphql
  createNotification(
    userId: ID!
    title: String
    description: String
  ): Notification

  deleteNotification(id: ID!): Notification
`;