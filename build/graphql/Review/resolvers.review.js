var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ReviewService from "../../services/review.js";
const reviewQueries = {
    getReview: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield ReviewService.getReviewById(id);
    }),
    getAllReviews: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield ReviewService.getAllReviews();
    }),
};
const reviewMutations = {
    createReview: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        return yield ReviewService.createReview(payload);
    }),
    updateReview: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        return yield ReviewService.updateReview(payload);
    }),
    deleteReview: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield ReviewService.deleteReview(id);
    }),
};
export const reviewResolvers = { reviewQueries, reviewMutations };
