import cloudinary from "../config/cloudinary.js";
import { v4 as uuidv4 } from 'uuid';

// Upload image buffer to Cloudinary
export const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { 
                folder: "products",
                resource_type: "auto",
                use_filename: true,
                unique_filename: true,
                overwrite: true,
                public_id: `product_${uuidv4()}`
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return reject(error);
                }
                resolve(result);
            }
        );
        
        uploadStream.end(buffer);
    });
};
