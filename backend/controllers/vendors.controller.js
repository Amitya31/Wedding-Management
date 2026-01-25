import fs from "fs";
import { VendorModel } from "../models/vendor.model.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import { deleteFromCloudinary } from "../utils/cloudinaryDelete.js";


export const CreateProduct = async (req, res) => {
    try {
        const { name, location, vendorType, details, contact } = req.body;

        if (!name || !location || !vendorType || !details) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const parsedDetails = JSON.parse(details)

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one image is required"
            });
        }        


        const imageUrls = [];

        for (const file of req.files) {
            const result = await uploadToCloudinary(file.buffer);
            imageUrls.push(result.secure_url);
        }


        const product = await VendorModel.create({
            owner: req.user.userId,
            name,
            location,
            vendorType,
            details:parsedDetails,
            contact, 
            images: imageUrls
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Image upload failed",
            error: error.message
        });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await VendorModel.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Ownership check
        if (product.owner.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this product"
            });
        }

        // Delete images from Cloudinary
        for (const imageUrl of product.images) {
            await deleteFromCloudinary(imageUrl);
        }

        await product.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete product",
            error: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, vendorType, details, contact } = req.body;

        const product = await VendorModel.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Ownership check
        if (product.owner.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to update this product"
            });
        }

        // Update basic fields (only if provided)
        if (name) product.name = name;
        if (location) product.location = location;
        if (vendorType) product.vendorType = vendorType;
        if (contact) product.contact = contact;

        // Parse and update details
        if (details) {
            try {
                product.details = JSON.parse(details);
            } catch {
                return res.status(400).json({
                    success: false,
                    message: "Invalid details JSON format"
                });
            }
        }

        // If new images uploaded → replace old ones
        if (req.files && req.files.length > 0) {
            // Delete old images
            for (const imageUrl of product.images) {
                await deleteFromCloudinary(imageUrl);
            }

            // Upload new images
            const imageUrls = [];
            for (const file of req.files) {
                const result = await uploadToCloudinary(file.buffer);
                imageUrls.push(result.secure_url);
            }

            product.images = imageUrls;
        }

        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update product",
            error: error.message
        });
    }
};

