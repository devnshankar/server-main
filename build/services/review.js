var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prismaClient } from "../config/prismaClient.config.js";
class ReviewService {
    static getReviewById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient.review.findUnique({ where: { id } });
        });
    }
    static getAllReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient.review.findMany();
        });
    }
    static createReview(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { productId, stars } = payload;
            return prismaClient.review.create({
                data: {
                    product: { connect: { id: productId } },
                    stars,
                },
            });
        });
    }
    static updateReview(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, stars } = payload;
            return prismaClient.review.update({
                where: { id },
                data: { stars },
            });
        });
    }
    static deleteReview(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient.review.delete({ where: { id } });
        });
    }
}
export default ReviewService;
