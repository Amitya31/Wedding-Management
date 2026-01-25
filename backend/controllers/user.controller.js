import { VendorModel } from "../models/vendor.model.js";

export const filterProducts = async (req, res) => {
    try {
        const { vendorType, type, location, minRating } = req.query;

        const filter = {};

        if (vendorType) {
            filter.vendorType = vendorType;
        }

        if (type) {
            filter["details.type"] = type;
        }

        if (location) {
            filter.location = { $regex: location, $options: "i" };
        }

        if (minRating) {
            filter.averageRating = { $gte: Number(minRating) };
        }

        const products = await VendorModel.find(filter)
            .sort({ rating: -1 }) 
            .limit(50);            

        return res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to filter products",
            error: error.message
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await VendorModel.findById(id)
            .populate("owner", "username email Usertype");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch product",
            error: error.message
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await VendorModel.find()
            .sort({ createdAt: -1 })
            .limit(50)
            .populate("owner", "username Usertype");

        return res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message
        });
    }
};
