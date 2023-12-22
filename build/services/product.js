var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// product.service.ts
import { prismaClient } from "../config/prismaClient.config.js";
class ProductService {
    static getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient.product.findMany();
        });
    }
    static getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient.product.findUnique({ where: { id } });
        });
    }
    static createProduct(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ownerId, title, description = "", category, price, instock, isPublished = true, productImageUrl = "", } = payload;
            const createdProduct = yield prismaClient.product.create({
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
            return createdProduct;
        });
    }
    static updateProduct(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, description, category, price, instock, isPublished, productImageUrl, } = payload;
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
        });
    }
    static deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient.product.delete({
                where: { id },
            });
        });
    }
}
export default ProductService;
