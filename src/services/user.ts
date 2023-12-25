import { createHmac, randomBytes } from "node:crypto";
import { prismaClient } from "../config/prismaClient.config.js";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

const JWT_SECRET: any = process.env.JWT_SECRET;

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token?: string;
  phoneNumber?: string;
  address?: string;
  profileImageUrl?: string;
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  token?: string;
  phoneNumber?: string;
  address?: string;
  profileImageUrl?: string;
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
  // USER SERVICE FUNCTION: GENERATE HASHED PASSWORD
  private static generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
  }

  // USER SERVICE FUNCTION: DECODE JWT TOKEN AND RETURN DATA WRAPPED INSIDE
  public static decodeJWTToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
  }

  // USER SERVICE FUNCTION: VERIFY USER CREDENTIAL, GENERATE AND RETURN JWT TOKEN
  public static async getUserToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const user = await UserService.getUserByEmail(email);
    if (!user) throw new GraphQLError("User not found");
    const userSalt = user.salt;
    const usersHashPassword = UserService.generateHash(userSalt, password);
    if (usersHashPassword !== user.password)
      throw new GraphQLError("Incorrect Password");
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "30d",
    });
    return token;
  }

  // USER SERVICE FUNCTION: FIND AND RETURN ALL USERS
  public static async getAllUsers() {
    return prismaClient.user.findMany({

    });
  }

  // USER SERVICE FUNCTION: FIND AND RETURN UNIQUE USER WITH EMAIL
  public static async getUserByEmail(email: string) {
    return prismaClient.user.findUnique({
      where: { email },
      include: { products: true },
    });
  }

  // USER SERVICE FUNCTION: FIND AND RETURN UNIQUE USER WITH ID
  public static async getUser(id: string) {
    return prismaClient.user.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  // USER SERVICE FUNCTION: CREATE AND RETURN NEW USER
  public static async createUser(payload: CreateUserPayload) {
    const {
      firstName,
      lastName,
      email,
      password,
      token = "",
      phoneNumber,
      address,
      profileImageUrl,
    } = payload;
    // console.log(lastName);
    const stringifiedLastName: string = lastName ? lastName.toString() : "";
    // console.log(
    //   JSON.stringify({ firstName, lastName, email, password }, null, 2)
    // );
    const user = await UserService.getUserByEmail(email);
    if (!!user)
      throw new GraphQLError("A user is already registered with the email", {
        extensions: {
          code: "USER_ALREADY_EXISTS",
        },
      });
    const salt = randomBytes(32).toString("hex");
    const hashedPassword = UserService.generateHash(salt, password);
    return await prismaClient.user.create({
      data: {
        firstName,
        lastName: stringifiedLastName,
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

  // USER SERVICE FUNCTION: VERIFY USER CREDENTIAL, GENERATE NEW TOKEN, UPDATE AND RETURN USER
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
      throw new GraphQLError("The password doesn't match", {
        extensions: {
          code: "INCORRECT_PASSWORD",
        },
      });
    const authToken = await UserService.getUserToken({ email, password });
    // console.log(authToken);
    // console.log("user retrieved from database", user);
    await UserService.updateUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email!,
      token: authToken,
      phoneNumber: user.phoneNumber!,
      address: user.address!,
      profileImageUrl: user.profileImageUrl!,
    });
    return await UserService.getUser(user.id);
  }

  // USER SERVICE FUNCTION: UPDATE USER CREDENTIAL
  public static async updateUser(payload: UpdateUserPayload) {
    const {
      firstName,
      lastName,
      email,
      password,
      token,
      phoneNumber,
      address,
      profileImageUrl,
    } = payload;

    const updatedUserData: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      token?: string;
      phoneNumber?: string | null;
      address?: string | null;
      profileImageUrl?: string | null;
    } = {
      firstName,
      lastName,
      email,
      password,
      token,
      phoneNumber,
      address,
      profileImageUrl: profileImageUrl !== undefined ? profileImageUrl : null,
    };

    // console.log("updatedUserData", updatedUserData);
  

    await prismaClient.user.update({
      where: { email },
      data: updatedUserData,
    });

    return await UserService.getUserByEmail(email!);
  }

  // USER SERVICE FUNCTION: DELETE USER WITH UNIQUE ID
  public static async deleteUser(id: string) {
    return prismaClient.user.delete({
      where: { id },
    });
  }
}

export default UserService;
