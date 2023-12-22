// services/notification.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Interface for Notification Payload
export interface CreateNotificationPayload {
  userId: string;
  title: string;
  description: string;
}

class NotificationService {
  // Notification Service Function: Create and return new notification
  public static async createNotification(payload: CreateNotificationPayload) {
    const { userId, title, description } = payload;
    try {
      const createdNotification = await prisma.notification.create({
        data: {
          userId,
          title,
          description,
        },
      });

      return createdNotification;
    } catch (error) {
      throw new Error("Failed to create notification");
    }
  }

  // Notification Service Function: Delete notification with unique ID
  public static async deleteNotification(id: string) {
    try {
      const deletedNotification = await prisma.notification.delete({
        where: {
          id,
        },
      });

      return deletedNotification;
    } catch (error) {
      throw new Error("Failed to delete notification");
    }
  }

  // Notification Service Function: Retrieve notification by ID
  public static async getNotificationById(id: string) {
    try {
      const notification = await prisma.notification.findUnique({
        where: {
          id,
        },
      });

      return notification;
    } catch (error) {
      throw new Error("Failed to retrieve notification");
    }
  }

  // Notification Service Function: Retrieve all notifications
  public static async getAllNotifications() {
    try {
      const notifications = await prisma.notification.findMany();

      return notifications;
    } catch (error) {
      throw new Error("Failed to retrieve all notifications");
    }
  }
}

export default NotificationService;
