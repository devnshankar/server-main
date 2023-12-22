// resolvers.comment.ts
import CommentService, { CreateCommentPayload } from "../../services/comment.js";

export const commentQueries = {
  getComment: async (_: any, { id }: { id: string }) => {
    return CommentService.getCommentById(id);
  },

  getAllComments: async () => {
    return CommentService.getAllComments();
  },
};

export const commentMutations = {
  createComment: async (_: any, payload: CreateCommentPayload) => {
    return CommentService.createComment(payload);
  },
};


export const commentResolvers = {
  commentQueries,
  commentMutations,
};
