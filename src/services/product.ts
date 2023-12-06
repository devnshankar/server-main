import { prismaClient } from "../config/prismaClient.config.js";
import  cloudinary from "cloudinary";
export interface CreateProductPayload {
  title: string;
  description: string;
  price: number;
  productImageUrl?: string;
}

export interface UpdateProductPayload {
  id: string;
  title?: string;
  description?: string;
  price?: number;
  productImageUrl?: string;
}

class ProductService {
  public static async getAllProducts() {
    return prismaClient.product.findMany();
  }

  public static async getProductById(id: string) {
    return prismaClient.product.findUnique({ where: { id } });
  }

  public static async createProduct(
    ownerId: string,
    payload: CreateProductPayload
  ) {
    const { title, description, price, productImageUrl } = payload;

    // Upload product image to Cloudinary
    let cloudinaryUrl;
    if (productImageUrl) {
      const result = await cloudinary.v2.uploader.upload(productImageUrl);
      cloudinaryUrl = result.secure_url;
    }

    // Create product in the database
    return prismaClient.product.create({
      data: {
        title,
        description,
        price,
        productImageUrl: cloudinaryUrl,
        owner: { connect: { id: ownerId } }, // Connect the product to the owner
      },
    });
  }

  public static async updateProduct(id: string, payload: UpdateProductPayload) {
    const { title, description, price, productImageUrl } = payload;

    // Upload product image to Cloudinary
    let cloudinaryUrl;
    if (productImageUrl) {
      const result = await cloudinary.v2.uploader.upload(productImageUrl);
      cloudinaryUrl = result.secure_url;
    }

    // Update product in the database
    return prismaClient.product.update({
      where: { id },
      data: {
        title,
        description,
        price,
        productImageUrl: cloudinaryUrl,
      },
    });
  }

  public static async deleteProduct(id: string) {
    return prismaClient.product.delete({
      where: { id },
    });
  }
}

export default ProductService;
