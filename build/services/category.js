var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// services/category.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default class CategoryService {
    static getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.category.findUnique({
                where: { id },
            });
        });
    }
    static getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.category.findMany();
        });
    }
    static createCategory(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.category.create({
                data: {
                    name: payload.name,
                },
            });
        });
    }
}
