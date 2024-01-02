// product.service.ts
import { prismaClient } from "../config/prismaClient.config.js";

export interface CreateProductPayload {
  ownerId: string;
  title: string;
  description?: string;
  category: string;
  price: number;
  instock: number;
  isPublished?: boolean;
  productImageUrl?: string;
}

export interface UpdateProductPayload {
  id: string;
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  instock?: number;
  isPublished?: boolean;
  productImageUrl?: string;
}

class ProductService {
  public static async getAllProducts() {
    return prismaClient.product.findMany();
  }

  public static async getProductById(id: string) {
    return prismaClient.product.findUnique({ where: { id } });
  }

  public static async createProduct(payload: CreateProductPayload) {
    const {
      ownerId,
      title,
      description = "",
      category,
      price,
      instock,
      isPublished = true,
      productImageUrl,
    } = payload;
    // ERROR pay attentiion to this
    console.log(JSON.stringify(payload, null , 2))
    const createdProduct = await prismaClient.product.create({
      data: {
        title,
        description,
        category,
        price,
        instock,
        isPublished,
        productImageUrl,
        owner: { connect: { id: ownerId } },
      },
      include: { owner: true },
    });
    return createdProduct
  }

  public static async updateProduct(payload: UpdateProductPayload) {
    const {
      id,
      title,
      description,
      category,
      price,
      instock,
      isPublished,
      productImageUrl,
    } = payload;

    return prismaClient.product.update({
      where: { id },
      data: {
        title,
        description,
        category,
        price,
        instock,
        isPublished,
        productImageUrl,
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
