
import NotificationService, {
  CreateNotificationPayload,
} from "../../services/notification.js";

export const notificationMutations = {
  createNotification: async (_: any, payload: CreateNotificationPayload) => {
    return NotificationService.createNotification(payload);
  },

  deleteNotification: async (_: any, { id }: { id: string }) => {
    return NotificationService.deleteNotification(id);
  },
};

export const notificationQueries = {
  getNotification: async (_: any, { id }: { id: string }) => {
    return NotificationService.getNotificationById(id);
  },

  getAllNotifications: async () => {
    return NotificationService.getAllNotifications();
  },
};

export const notificationResolvers = {
  notificationQueries,
  notificationMutations,
};
