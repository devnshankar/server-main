import ProductService, {
  CreateProductPayload,
  UpdateProductPayload,
} from "../../services/product.js";

const queries = {
  getAllProducts: async () => {
    return await ProductService.getAllProducts();
  },

  getProductById: async (_: any, { id }: { id: string }) => {
    return await ProductService.getProductById(id);
  },
};

const mutations = {
  createProduct: async (
    _: any,
    { ownerId, payload }: { ownerId: string; payload: CreateProductPayload }
  ) => {
    return await ProductService.createProduct(ownerId, payload);
  },

  updateProduct: async (
    _: any,
    { id, payload }: { id: string; payload: UpdateProductPayload }
  ) => {
    return await ProductService.updateProduct(id, payload);
  },

  deleteProduct: async (_: any, { id }: { id: string }) => {
    return await ProductService.deleteProduct(id);
  },
};

export const resolvers = { queries, mutations };
