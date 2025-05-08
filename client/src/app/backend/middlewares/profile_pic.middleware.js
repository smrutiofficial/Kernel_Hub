import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from"multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile_pic",
    allowedFormats: ["jpeg", "jpg", "png", "gif"],
    transformation: [
      { width: 1000, crop: "scale" },
      { quality: 35 },
      { fetch_format: "auto" },
    ],
  },
});

// Initialize multer with Cloudinary storage
const upload = multer({
  storage: storage,
  limits: { fileSize: 2.5 * 1024 * 1024 }, // Limit file size to 500KB
});

module.exports = { upload };
