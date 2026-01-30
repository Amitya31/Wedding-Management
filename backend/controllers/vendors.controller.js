import fs from "fs";
import { VendorModel } from "../models/vendor.model.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";


export const getVendorProducts = async (req, res) => {
    try {
        const products = await VendorModel.find({ owner: req.user.userId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch vendor products",
            error: error.message
        });
    }
};

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
            try {
                const result = await uploadToCloudinary(file.buffer);
                imageUrls.push(result.secure_url);
            } catch (error) {
                console.error('Error uploading to Cloudinary:', error);
                return res.status(500).json({
                    success: false,
                    message: "Failed to upload images to Cloudinary"
                });
            }
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

        console.log('Delete product request - ID:', id);
        console.log('User from middleware:', req.user);

        const product = await VendorModel.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        console.log('Product found:', product);
        console.log('Product owner:', product.owner);
        console.log('Product owner type:', typeof product.owner);
        console.log('User ID:', req.user.userId);
        console.log('User ID type:', typeof req.user.userId);
        console.log('Comparison:', product.owner.toString(), '===', req.user.userId.toString(), product.owner.toString() === req.user.userId.toString());

        // Ownership check
        if (product.owner.toString() !== req.user.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this product"
            });
        }

        // Note: Cloudinary images are not deleted automatically to prevent accidental data loss
        // In production, you might want to implement Cloudinary image deletion here

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

        console.log('Update product request - ID:', id);
        console.log('User from middleware:', req.user);

        const product = await VendorModel.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        console.log('Product found:', product);
        console.log('Product owner:', product.owner);
        console.log('User ID:', req.user.userId);
        console.log('Comparison:', product.owner.toString(), '===', req.user.userId.toString(), product.owner.toString() === req.user.userId.toString());

        // Ownership check
        if (product.owner.toString() !== req.user.userId.toString()) {
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
            // Note: Old Cloudinary images are not deleted automatically to prevent accidental data loss
            // In production, you might want to implement Cloudinary image deletion here

            // Upload new images to Cloudinary
            const imageUrls = [];
            for (const file of req.files) {
                try {
                    const result = await uploadToCloudinary(file.buffer);
                    imageUrls.push(result.secure_url);
                } catch (error) {
                    console.error('Error uploading to Cloudinary:', error);
                    return res.status(500).json({
                        success: false,
                        message: "Failed to upload images to Cloudinary"
                    });
                }
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

