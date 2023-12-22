var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// services/comment.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
class CommentService {
    createComment(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { productId, userId, content } = payload;
            return prisma.comment.create({
                data: {
                    productId,
                    userId,
                    content,
                },
            });
        });
    }
    getCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.comment.findUnique({
                where: {
                    id,
                },
            });
        });
    }
    getAllComments() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.comment.findMany();
        });
    }
}
export default new CommentService();
