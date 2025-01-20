import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload a file to Cloudinary
export const uploadOnCloudinary = async (localFilePath) => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log(`File uploaded successfully: ${result.secure_url}`);
    return result;
  } catch (error) {
    console.error(`Error uploading file to Cloudinary: ${error.message}`);
    throw error;
  }
};

// Function to delete a file from Cloudinary
export const destroyFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`File deleted successfully: ${publicId}`);
    return result;
  } catch (error) {
    console.error(`Error deleting file from Cloudinary: ${error.message}`);
    throw error;
  }
};
