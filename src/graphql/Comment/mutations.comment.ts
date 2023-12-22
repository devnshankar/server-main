// mutations.comment.ts
import CommentService, {
  CreateCommentPayload,
} from "../../services/comment.js";

export const commentMutations = `#graphql
  createComment(
    productId: ID!
    userId: ID!
    content: String!
  ): Comment
`;

export const commentMutationsResolvers = {
  createComment: async (_: any, payload: CreateCommentPayload) => {
    return CommentService.createComment(payload);
  },
};
