// queries.notification.ts
export const notificationQueries = `#graphql
  getNotification(id: ID!): Notification
  getAllNotifications: [Notification]
`;

