import { FavouriteModel } from "../models/favourite.model.js";
import { VendorModel } from "../models/vendor.model.js";

export const addToFavourites = async (req, res) => {
    try {
        console.log("Adding to favourite with data:", req.body);
        console.log("User from middleware:", req.user);
        
        // Validate request body
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is required"
            });
        }
        
        const { venueId, venueType, notes } = req.body;
        const userId = req.user.userId;
        
        // Validate required fields
        if (!venueId || !venueType) {
            return res.status(400).json({
                success: false,
                message: "venueId and venueType are required"
            });
        }
        
        console.log("User ID:", userId, "Venue ID:", venueId, "Venue Type:", venueType);

        // For mock venues, we need to handle them differently
        // Check if it's a mock venue (numeric ID from frontend mock data)
        let venue;
        let vendorIdToUse;
        
        if (venueId && !isNaN(venueId)) {
            // This is a mock venue, create a mock vendor object
            vendorIdToUse = venueId; // Use the same ID for both vendorId and venueId for mock venues
            venue = {
                _id: venueId,
                name: `Mock Venue ${venueId}`,
                location: "Mock Location",
                contact: { phone: "Mock Phone", email: "mock@email.com" }
            };
            console.log("Using mock venue for venue ID:", venueId);
        } else {
            // Try to find real vendor
            venue = await VendorModel.findById(venueId);
            if (!venue) {
                console.log("Venue not found for ID:", venueId);
                return res.status(404).json({
                    success: false,
                    message: "Venue not found"
                });
            }
            vendorIdToUse = venue._id;
        }

        // Check if already in favourites using both venueId and vendorId
        const existingFavourite = await FavouriteModel.findOne({
            userId,
            $or: [
                { venueId: venueId.toString() },
                { venueId: venueId },
                { vendorId: vendorIdToUse.toString() },
                { vendorId: vendorIdToUse }
            ]
        });

        if (existingFavourite) {
            console.log("Venue already in favourites");
            return res.status(200).json({
                success: true,
                message: "Venue already in favourites"
            });
        }

        const favourite = await FavouriteModel.create({
            userId,
            vendorId: vendorIdToUse,
            venueId,
            venueType,
            notes: notes || ""
        });

        console.log("Favourite created:", favourite);

        return res.status(201).json({
            success: true,
            message: "Added to favourites successfully",
            favourite
        });

    } catch (error) {
        console.error("Add to favourites error:", error);
        
        // Handle duplicate key error specifically
        if (error.code === 11000) {
            console.log("Duplicate key error detected");
            return res.status(400).json({
                success: false,
                message: "Venue already in favourites"
            });
        }
        
        return res.status(500).json({
            success: false,
            message: "Failed to add to favourites",
            error: error.message
        });
    }
};

export const getFavourites = async (req, res) => {
    try {
        const userId = req.user.userId;
        
        const favourites = await FavouriteModel.find({ userId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            favourites
        });

    } catch (error) {
        console.error("Get favourites error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch favourites",
            error: error.message
        });
    }
};

export const removeFromFavourites = async (req, res) => {
    try {
        const { favouriteId } = req.params;
        const userId = req.user.userId;

        const favourite = await FavouriteModel.findOneAndDelete({
            _id: favouriteId,
            userId: userId
        });

        if (!favourite) {
            return res.status(404).json({
                success: false,
                message: "Favourite not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Removed from favourites successfully"
        });

    } catch (error) {
        console.error("Remove from favourites error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to remove from favourites",
            error: error.message
        });
    }
};

export const removeFromFavouritesByVenue = async (req, res) => {
    try {
        const { venueId } = req.query; // Get from query parameters instead
        const userId = req.user.userId;

        console.log('Removing from favorites - venueId:', venueId, 'type:', typeof venueId, 'userId:', userId);

        // First, let's see what favorites exist for this user
        const existingFavorites = await FavouriteModel.find({ userId });
        console.log('User favorites:', existingFavorites.map(f => ({ 
            venueId: f.venueId, 
            venueIdType: typeof f.venueId,
            _id: f._id 
        })));

        // Try different comparison approaches
        let favourite = null;
        
        // Method 1: Direct string comparison
        favourite = await FavouriteModel.findOneAndDelete({
            userId: userId,
            venueId: venueId.toString()
        });
        
        console.log('Method 1 result:', favourite);
        
        // If not found, try method 2: Direct comparison without toString
        if (!favourite) {
            favourite = await FavouriteModel.findOneAndDelete({
                userId: userId,
                venueId: venueId
            });
            console.log('Method 2 result:', favourite);
        }
        
        // If still not found, try method 3: Number comparison
        if (!favourite && !isNaN(venueId)) {
            favourite = await FavouriteModel.findOneAndDelete({
                userId: userId,
                venueId: parseInt(venueId)
            });
            console.log('Method 3 result:', favourite);
        }

        console.log('Final deleted favourite:', favourite);

        if (!favourite) {
            return res.status(404).json({
                success: false,
                message: "Favourite not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Removed from favourites successfully"
        });

    } catch (error) {
        console.error("Remove from favourites by venue error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to remove from favourites",
            error: error.message
        });
    }
};
