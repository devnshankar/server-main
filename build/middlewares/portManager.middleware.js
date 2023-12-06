var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserService from "../services/user.js";
import { expressMiddleware } from "@apollo/server/express4";
let NODE_PORT = process.env.NODE_PORT || 8083;
export function portManager(app, server) {
    const serverListener = (port) => {
        const pubPort = parseInt(port.toString());
        app.use("/graphql", expressMiddleware(server, {
            context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
                const tokenWithBearer = req.headers["authorization"];
                const token = tokenWithBearer.replace(/^Bearer\s/, "");
                if (req.body.operationName === "CreateUser" ||
                    req.body.operationName === "LoginUser") {
                    return {};
                }
                if (!token) {
                    throw new Error("Authorization failed no token . Please log in again.");
                }
                try {
                    const user = UserService.decodeJWTToken(token);
                    const savedUser = yield UserService.getUserByEmail(user.email);
                    if (user && user.email === savedUser.email) {
                        return { user };
                    }
                    else {
                        throw new Error("Authorization failed. Invalid user.");
                    }
                }
                catch (error) {
                    console.error("Token decoding error:", error); // Log the error here
                    throw new Error("Authorization failed. Invalid token.");
                }
            }),
        }));
        const SERVER = app.listen(pubPort, "0.0.0.0", () => {
            console.log(`#  Server running | pid:${process.pid} | http://localhost:${port}/graphql`);
        });
        SERVER.on("error", (error) => {
            console.error(`Server error: ${error.message}`);
        });
    };
    serverListener(NODE_PORT);
}
