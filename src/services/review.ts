import { prismaClient } from "../config/prismaClient.config.js";
import { GraphQLError } from "graphql";

export interface CreateReviewPayload {
  productId: string;
  stars: number;
}

export interface UpdateReviewPayload {
  id: string;
  stars: number;
}

class ReviewService {
  public static async getReviewById(id: string) {
    return prismaClient.review.findUnique({ where: { id } });
  }

  public static async getAllReviews() {
    return prismaClient.review.findMany();
  }

  public static async createReview(payload: CreateReviewPayload) {
    const { productId, stars } = payload;
    return prismaClient.review.create({
      data: {
        product: { connect: { id: productId } },
        stars,
      },
    });
  }

  public static async updateReview(payload: UpdateReviewPayload) {
    const { id, stars } = payload;
    return prismaClient.review.update({
      where: { id },
      data: { stars },
    });
  }

  public static async deleteReview(id: string) {
    return prismaClient.review.delete({ where: { id } });
  }
}

export default ReviewService;
