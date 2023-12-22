// services/comment.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface CreateCommentPayload {
  productId: string;
  userId: string;
  content: string;
}

class CommentService {
  async createComment(payload: CreateCommentPayload) {
    const { productId, userId, content } = payload;

    return prisma.comment.create({
      data: {
        productId,
        userId,
        content,
      },
    });
  }

  async getCommentById(id: string) {
    return prisma.comment.findUnique({
      where: {
        id,
      },
    });
  }

  async getAllComments() {
    return prisma.comment.findMany();
  }
}

export default new CommentService();
