import { ReviewModel } from "../models/review.model.js";
import { VendorModel } from "../models/vendor.model.js";

export const createReview = async (req, res) => {
    try {
        console.log("Creating review with data:", req.body);
        console.log("User from middleware:", req.user);
        
        const { vendorId, reviewerName, rating, comment } = req.body;
        const userId = req.user.userId;
        
        // Handle both name and reviewerName for compatibility
        const name = reviewerName || req.body.name;
        
        // Handle both vendorId and venueId for compatibility
        const finalVendorId = vendorId || req.body.venueId;
        
        // Validate required fields
        if (!finalVendorId) {
            return res.status(400).json({
                success: false,
                message: "vendorId is required"
            });
        }
        
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: "reviewerName is required"
            });
        }
        
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "rating is required and must be between 1 and 5"
            });
        }
        
        if (!comment || comment.trim() === '') {
            return res.status(400).json({
                success: false,
                message: "comment is required"
            });
        }
        
        console.log("User ID:", userId, "Vendor ID:", finalVendorId, "Rating:", rating, "Name:", name);

        // For mock venues, we need to handle them differently
        let venue;
        
        // Check if finalVendorId is a number (for mock venues) or a valid ObjectId string
        const isNumericId = !isNaN(finalVendorId) && !isNaN(parseFloat(finalVendorId));
        const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(finalVendorId);
        
        if (isNumericId) {
            // This is a mock venue, create a mock venue object
            venue = {
                _id: finalVendorId,
                name: `Mock Venue ${finalVendorId}`,
                location: "Mock Location",
                contact: { phone: "Mock Phone", email: "mock@email.com" }
            };
        } else if (isValidObjectId) {
            // Try to find real vendor with valid ObjectId
            try {
                venue = await VendorModel.findById(finalVendorId);
                if (!venue) {
                    return res.status(404).json({
                        success: false,
                        message: "Vendor not found"
                    });
                }
            } catch (dbError) {
                return res.status(500).json({
                    success: false,
                    message: "Database error when finding vendor"
                });
            }
        } else {
            // This is a mock venue with string ID (like "test-123"), create a mock venue object
            venue = {
                _id: finalVendorId,
                name: `Mock Venue ${finalVendorId}`,
                location: "Mock Location",
                contact: { phone: "Mock Phone", email: "mock@email.com" }
            };
        }

        const review = await ReviewModel.create({
            userId,
            vendorId: venue._id,
            venueId: finalVendorId, // Use vendorId as venueId for consistency
            name,
            rating,
            comment,
            isVerified: false,
            helpful: 0
        });

        console.log("Review created:", review);

        return res.status(201).json({
            success: true,
            message: "Review submitted successfully!",
            review
        });

    } catch (error) {
        console.error("Review creation error:", error);
        
        return res.status(500).json({
            success: false,
            message: "Failed to submit review",
            error: error.message
        });
    }
};

export const getVenueReviews = async (req, res) => {
    try {
        const { venueId } = req.params;
        
        const reviews = await ReviewModel.find({ venueId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            reviews
        });

    } catch (error) {
        console.error("Get reviews error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch reviews",
            error: error.message
        });
    }
};

export const getUserReviews = async (req, res) => {
    try {
        const userId = req.user.userId;
        
        const reviews = await ReviewModel.find({ userId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            reviews
        });

    } catch (error) {
        console.error("Get user reviews error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch user reviews",
            error: error.message
        });
    }
};

export const updateReviewHelpful = async (req, res) => {
    try {
        const { reviewId } = req.params;
        
        const review = await ReviewModel.findByIdAndUpdate(
            reviewId,
            { $inc: { helpful: 1 } },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Review marked as helpful",
            review
        });

    } catch (error) {
        console.error("Update review helpful error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update review",
            error: error.message
        });
    }
};
