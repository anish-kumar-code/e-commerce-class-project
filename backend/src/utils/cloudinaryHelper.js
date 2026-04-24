import { v2 as cloudinary } from "cloudinary";

export const getPublicIdFromUrl = (url) => {
    try {
        const parts = url.split("/");
        const fileName = parts[parts.length - 1]; // abc123.jpg
        const publicId = fileName.split(".")[0];

        return `shopkart-ecommerce/${publicId}`;
    } catch (error) {
        return null;
    }
};

export const deleteImageFromCloudinary = async (imageUrl) => {
    try {
        if (!imageUrl) return;

        const parts = imageUrl.split("/");
        const fileName = parts.pop(); // abc123.jpg
        const publicId = fileName.split(".")[0];

        await cloudinary.uploader.destroy(`shopkart-ecommerce/${publicId}`);

    } catch (error) {
        console.log("Delete Image Error:", error.message);
    }
};