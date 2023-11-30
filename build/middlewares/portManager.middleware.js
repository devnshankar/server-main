var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { expressMiddleware } from "@apollo/server/express4";
import UserService from "../services/user.js";
var NODE_PORT = process.env.NODE_PORT || 8083;
export function portManager(app, server) {
    const serverListener = (port) => {
        const pubPort = parseInt(port.toString());
        app.use("/graphql", expressMiddleware(server, {
            context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
                //@ts-ignore
                const token = req.headers['token'];
                try {
                    const user = UserService.decodeJWTToken(token);
                    return { user };
                }
                catch (error) {
                    return {};
                }
            }),
        }));
        const SERVER = app.listen(pubPort, "0.0.0.0", () => {
            console.log(`#  Server running | pid:${process.pid} | http://localhost:${port}/graphql`);
        });
        SERVER.on("error", (error) => {
            const err = JSON.parse(JSON.stringify(error));
            if (err.code === "EADDRINUSE") {
                console.error(`Port ${port} is already in use. Trying a different port.`);
                const newPort = parseInt(port.toString(), 10) + 2;
                serverListener(newPort);
            }
            else {
                console.error(`Error starting server on port ${port}: ${error.message}`);
            }
        });
    };
    serverListener(NODE_PORT);
}
