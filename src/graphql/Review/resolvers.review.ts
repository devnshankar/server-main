import ReviewService, {
  CreateReviewPayload,
  UpdateReviewPayload,
} from "../../services/review.js";

const reviewQueries = {
  getReview: async (_: any, { id }: { id: string }) => {
    return await ReviewService.getReviewById(id);
  },

  getAllReviews: async () => {
    return await ReviewService.getAllReviews();
  },
};

const reviewMutations = {
  createReview: async (_: any, payload: CreateReviewPayload) => {
    return await ReviewService.createReview(payload);
  },

  updateReview: async (_: any, payload: UpdateReviewPayload) => {
    return await ReviewService.updateReview(payload);
  },

  deleteReview: async (_: any, { id }: { id: string }) => {
    return await ReviewService.deleteReview(id);
  },
};

export const reviewResolvers = { reviewQueries, reviewMutations };
