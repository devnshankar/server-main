import { createHmac, randomBytes } from "node:crypto";
import { prismaClient } from "../config/prismaClient.config.js";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

const JWT_SECRET: any = process.env.JWT_SECRET;

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  phoneNumber?: string;
  email: string;
  password: string;
  profileImageUrl?: string;
  address?: string;
  token?: string;
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  profileImageUrl?: string;
  address?: string;
  token?: string;
}

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

class UserService {
  private static generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
  }

  public static decodeJWTToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
  }

  public static async getUserToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const user = await UserService.getUserByEmail(email);
    if (!user) throw new GraphQLError("User not found");
    const userSalt = user.salt;
    const usersHashPassword = UserService.generateHash(userSalt, password);
    if (usersHashPassword !== user.password)
      throw new GraphQLError("Incorrect Password");
    // generate token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "30d",
    });
    return token;
  }

  public static async getAllUsers() {
    return prismaClient.user.findMany();
  }

  public static async getUserByEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }

  public static async getUserById(id: string) {
    return prismaClient.user.findUnique({ where: { id } });
  }

  public static async createUser(payload: CreateUserPayload) {
    const {
      firstName,
      lastName = "",
      email,
      password,
      phoneNumber,
      profileImageUrl,
      address,
      token = "",
    } = payload;

    const user = await UserService.getUserByEmail(email);
    if (!!user)
      throw new GraphQLError("A user is already registered with the email", {
        extensions: {
          code: "USER_ALREADY_EXISTS",
        },
      });

    // encrypt password
    const salt = randomBytes(32).toString("hex");
    const hashedPassword = UserService.generateHash(salt, password);

    return await prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        salt: salt,
        phoneNumber,
        profileImageUrl,
        address,
        token,
      },
    });
  }

  public static async loginUser(payload: LoginUserPayload) {
    const { email, password } = payload;

    const user = await UserService.getUserByEmail(email);
    if (!user)
      throw new GraphQLError("User doesn't exist with this email", {
        extensions: {
          code: "USER_DOESN'T_EXIST",
        },
      });

    const userSalt = user.salt;
    const usersHashPassword = UserService.generateHash(userSalt, password);
    if (usersHashPassword !== user.password)
      throw new GraphQLError("The password doesn't matchd", {
        extensions: {
          code: "INCORRECT_PASSWORD",
        },
      });

    const authToken = await UserService.getUserToken({ email, password });
    return await UserService.updateUser({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber!,
      email: user.email!,
      profileImageUrl: user.profileImageUrl!,
      address: user.address!,
      token: authToken,
    });
  }

  public static async updateUser(payload: UpdateUserPayload) {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      profileImageUrl,
      address,
      token,
    } = payload;


    return prismaClient.user.update({
      where: { email },
      data: {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        profileImageUrl,
        address,
        token,
      },
    });
  }

  public static async deleteUser(id: string) {
    return prismaClient.user.delete({
      where: { id },
    });
  }
}

export default UserService;
