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
async function initServer() {
  //! ENV VARIABLES not found at the begining of docker_init error handler
  envVarManager();

  //! GRAPHQL SERVER CONFIG
  const server = await createApolloGraphqlServer();

  //! MONGODB CONNECTION CONFIG
  mongoConnect();

  //! PORT ALREADY IN USE ERROR HANDLER MIDDLEWARE
  portManager(app, server);

  //! CLOUDINARY CONFIG
  cloudinaryConfig();
}

//! NODE JS CLUSTERIZATION FOR PERFORMANCE OPTIMIZATION MIDDLEWARE
nodeClusterizer(initServer);
