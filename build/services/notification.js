var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// services/notification.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
class NotificationService {
    // Notification Service Function: Create and return new notification
    static createNotification(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, title, description } = payload;
            try {
                const createdNotification = yield prisma.notification.create({
                    data: {
                        userId,
                        title,
                        description,
                    },
                });
                return createdNotification;
            }
            catch (error) {
                throw new Error("Failed to create notification");
            }
        });
    }
    // Notification Service Function: Delete notification with unique ID
    static deleteNotification(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedNotification = yield prisma.notification.delete({
                    where: {
                        id,
                    },
                });
                return deletedNotification;
            }
            catch (error) {
                throw new Error("Failed to delete notification");
            }
        });
    }
    // Notification Service Function: Retrieve notification by ID
    static getNotificationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = yield prisma.notification.findUnique({
                    where: {
                        id,
                    },
                });
                return notification;
            }
            catch (error) {
                throw new Error("Failed to retrieve notification");
            }
        });
    }
    // Notification Service Function: Retrieve all notifications
    static getAllNotifications() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifications = yield prisma.notification.findMany();
                return notifications;
            }
            catch (error) {
                throw new Error("Failed to retrieve all notifications");
            }
        });
    }
}
export default NotificationService;
