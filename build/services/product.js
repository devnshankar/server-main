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
import cloudinary from "cloudinary";
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
    static createProduct(ownerId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, price, productImageUrl } = payload;
            // Upload product image to Cloudinary
            let cloudinaryUrl;
            if (productImageUrl) {
                const result = yield cloudinary.v2.uploader.upload(productImageUrl);
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
        });
    }
    static updateProduct(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, price, productImageUrl } = payload;
            // Upload product image to Cloudinary
            let cloudinaryUrl;
            if (productImageUrl) {
                const result = yield cloudinary.v2.uploader.upload(productImageUrl);
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
