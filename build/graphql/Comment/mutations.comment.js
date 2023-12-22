var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// mutations.comment.ts
import CommentService from "../../services/comment.js";
export const commentMutations = `#graphql
  createComment(
    productId: ID!
    userId: ID!
    content: String!
  ): Comment
`;
export const commentMutationsResolvers = {
    createComment: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        return CommentService.createComment(payload);
    }),
};
