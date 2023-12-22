import { v2 as cloudinary } from "cloudinary";
import { resolve } from "node:path";

export const cloudinaryConfig = async () => {
  cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: 'auto',
}
