import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

export function envVarManager() {
  // Get the directory path of the current module
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  // Specify the path to the .env file
  const envPath = path.resolve(__dirname, "../../.env");
  // Check if the .env file exists before attempting to load it
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  } else {
    console.warn(
      "No .env file found. Using environment variables from the system."
    );
  }
}
