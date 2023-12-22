var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// resolvers.product.js
import ProductService from "../../services/product.js";
const productQueries = {
    getProduct: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield ProductService.getProductById(id);
    }),
    getAllProducts: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield ProductService.getAllProducts();
    }),
};
const productMutations = {
    createProduct: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        return yield ProductService.createProduct(payload);
    }),
    updateProduct: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        return yield ProductService.updateProduct(payload);
    }),
    deleteProduct: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield ProductService.deleteProduct(id);
    }),
};
export const productResolvers = { productQueries, productMutations };
