import cloudinary from "../config/cloudinary.js";

export const deleteFromCloudinary = async (imageUrl) => {
    const publicId = imageUrl
        .split("/")
        .slice(-1)[0]
        .split(".")[0];

    return await cloudinary.uploader.destroy(`products/${publicId}`);
};
