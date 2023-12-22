// index.ts
import { commentTypeDefs } from "./typedefs.comment.js";
import { commentQueries } from "./queries.comment.js";
import { commentMutations } from "./mutations.comment.js";
import { commentResolvers } from "./resolvers.comment.js";
export const Comment = {
    commentTypeDefs,
    commentQueries,
    commentMutations,
    commentResolvers,
};
