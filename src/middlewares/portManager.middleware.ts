import express from "express";
import UserService from "../services/user.js";
import { expressMiddleware } from "@apollo/server/express4";
import * as jwt from "jsonwebtoken"; // Import your JwtPayload type

let NODE_PORT: string | number = process.env.NODE_PORT || 8083;

export function portManager(app: express.Express, server: any) {
  const serverListener = (port: string | number) => {
    const pubPort = parseInt(port.toString());
    app.use(
      "/graphql",
      expressMiddleware(server, {
        context: async ({ req }) => {
          const tokenWithBearer = req.headers["authorization"];
          const token = tokenWithBearer!.replace(/^Bearer\s/, "");
          if (
            req.body.operationName === "CreateUser" ||
            req.body.operationName === "LoginUser"
          ) {
            return {};
          }

          if (!token) {
            throw new Error(
              "Authorization failed no token . Please log in again."
            );
          }

          try {
            const user = UserService.decodeJWTToken(
              token as string
            ) as jwt.JwtPayload;

            const savedUser = await UserService.getUserByEmail(user.email);
            if (user && user.email === savedUser!.email) {
              return { user };
            } else {
              throw new Error("Authorization failed. Invalid user.");
            }
          } catch (error) {
            console.error("Token decoding error:", error); // Log the error here
            throw new Error("Authorization failed. Invalid token.");
          }
        },
      })
    );

    const SERVER = app.listen(pubPort, "0.0.0.0", () => {
      console.log(
        `#  Server running | pid:${process.pid} | http://localhost:${port}/graphql`
      );
    });

    SERVER.on("error", (error) => {
      console.error(`Server error: ${error.message}`);
    });
  };

  serverListener(NODE_PORT);
}
