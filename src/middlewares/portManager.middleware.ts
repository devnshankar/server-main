import express from "express";
import dotenv from "dotenv";
import { expressMiddleware } from "@apollo/server/express4";
import UserService from "../services/user.js";

var NODE_PORT: string | number = process.env.NODE_PORT || 8083;
export function portManager(app: express.Express, server: any) {
  const serverListener = (port: string | number) => {
    const pubPort = parseInt(port.toString());
    app.use(
      "/graphql",
      expressMiddleware(server, {
        context: async ({ req }) => {
          //@ts-ignore
          const token = req.headers['token']
          try {
            const user = UserService.decodeJWTToken(token as string);
            return {user}

          } catch (error) {
            return { }
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
      const err = JSON.parse(JSON.stringify(error));
      if (err.code === "EADDRINUSE") {
        console.error(
          `Port ${port} is already in use. Trying a different port.`
        );
        const newPort = parseInt(port.toString(), 10) + 2;
        serverListener(newPort);
      } else {
        console.error(
          `Error starting server on port ${port}: ${error.message}`
        );
      }
    });
  };

  serverListener(NODE_PORT);
}
