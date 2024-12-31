import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Debugging log to verify the environment variables
console.log("Cloudinary Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);
console.log("Cloudinary API Secret:", process.env.CLOUDINARY_API_SECRET); 

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});
console.log("Cloudinary API Key:", process.env.CLOUDINARY_CLOUD_API_KEY);

export default cloudinary.v2;
