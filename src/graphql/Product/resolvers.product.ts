// resolvers.product.js
import ProductService, {
  CreateProductPayload,
  UpdateProductPayload,
} from "../../services/product.js";

const productQueries = {
  getProduct: async (_: any, { id }: { id: string }) => {
    return await ProductService.getProductById(id);
  },

  getAllProducts: async () => {
    return await ProductService.getAllProducts();
  },
};

const productMutations = {
  createProduct: async (_: any, payload: CreateProductPayload) => {
    return await ProductService.createProduct(payload);
  },

  updateProduct: async (_: any, payload: UpdateProductPayload) => {
    return await ProductService.updateProduct(payload);
  },

  deleteProduct: async (_: any, { id }: { id: string }) => {
    return await ProductService.deleteProduct(id);
  },
};

export const productResolvers = { productQueries, productMutations };
