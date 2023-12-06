import UserService, {
  CreateUserPayload,
  UpdateUserPayload,
  LoginUserPayload,
} from "../../services/user.js";

const queries = {
  getUser: async (_: any, { id }: { id: string }) => {
    return await UserService.getUserById(id);
  },

  getAllUsers: async () => {
    return await UserService.getAllUsers();
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    return await UserService.createUser(payload);
  },

  loginUser: async (_: any, payload: LoginUserPayload) => {
    return UserService.loginUser(payload);
  },

  updateUser: async (_: any, payload: UpdateUserPayload) => {
    return await UserService.updateUser(payload);
  },

  deleteUser: async (_: any, { id }: { id: string }) => {
    return await UserService.deleteUser(id);
  },
};

export const resolvers = { queries, mutations };
