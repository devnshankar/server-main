var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mongoConnect } from "./config/mongodb.config.js";
import createApolloGraphqlServer from "./graphql/index.js";
import { nodeClusterizer } from "./middlewares/nodeClusterizer.middleware.js";
import { envVarManager } from "./middlewares/envVarManager.middleware.js";
import { portManager } from "./middlewares/portManager.middleware.js";
import { cloudinaryConfig } from "./config/cloudinary.config.js";
//middlewares
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
// Main server function block
function initServer() {
    return __awaiter(this, void 0, void 0, function* () {
        //! ENV VARIABLES not found at the begining of docker_init error handler
        envVarManager();
        //! GRAPHQL SERVER CONFIG
        const server = yield createApolloGraphqlServer();
        //! MONGODB CONNECTION CONFIG
        mongoConnect();
        //! PORT ALREADY IN USE ERROR HANDLER MIDDLEWARE
        portManager(app, server);
        //! CLOUDINARY CONFIG
        cloudinaryConfig();
    });
}
//! NODE JS CLUSTERIZATION FOR PERFORMANCE OPTIMIZATION MIDDLEWARE
nodeClusterizer(initServer);
