import cloudinary from "../config/cloudinary.js"; // Ensure the path is correct

export const uploadToCloudinary = async (filePath) => {
  try {
    // Debug: Log the file path
    console.log("Uploading file to Cloudinary from path:", filePath);

    // Upload the file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: "blog-images", // Optional: Specify a folder for organization
    });

    // Debug: Log the upload result
    console.log("Upload Result:", uploadResult);

    // Return the Cloudinary URL and public ID
    return {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  } catch (error) {
    // Debug: Log the error details
    console.error("Error while uploading to Cloudinary:", error);

    // Re-throw with a detailed message
    throw new Error("Error while uploading to Cloudinary: " + error.message);
  }
};
