var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// resolvers.comment.ts
import CommentService from "../../services/comment.js";
export const commentQueries = {
    getComment: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
        return CommentService.getCommentById(id);
    }),
    getAllComments: () => __awaiter(void 0, void 0, void 0, function* () {
        return CommentService.getAllComments();
    }),
};
export const commentMutations = {
    createComment: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        return CommentService.createComment(payload);
    }),
};
export const commentResolvers = {
    commentQueries,
    commentMutations,
};
