import { BookingModel } from "../models/booking.model.js";
import { VendorModel } from "../models/vendor.model.js";

export const createBooking = async (req, res) => {
    try {
        console.log("Creating booking with data:", req.body);
        console.log("User from middleware:", req.user);
        
        const {
            venueId,
            venueType,
            eventType,
            eventDate,
            guestCount,
            budget,
            specialRequests,
            contactPhone,
            contactEmail,
            // Decorator specific fields
            decorationTheme,
            venueLocation,
            setupTime,
            // Caterer specific fields
            cuisinePreference,
            dietaryRestrictions,
            menuType,
            serviceStyle,
            // Artist specific fields
            performanceDuration,
            musicPreferences,
            equipmentNeeded,
            danceStyle,
            numberOfDancers,
            practiceSessions,
            mehendiType,
            mehendiDesign,
            handsToCover,
            photographyPackage,
            photographyStyle,
            deliveryTime,
            // Accessories & Makeup specific fields
            serviceType,
            trialDate,
            customizationNeeds,
            deliveryDate
        } = req.body;

        const userId = req.user.userId;
        console.log("User ID:", userId, "Venue ID:", venueId, "Venue Type:", venueType);

        // Validate required fields - guestCount is not required for artists and accessories-makeup
        const baseRequiredFields = ['venueId', 'venueType', 'eventType', 'eventDate', 'budget', 'contactPhone', 'contactEmail'];
        const isVenueOrCaterer = venueType === 'venue' || venueType === 'caterer';
        const requiredFields = isVenueOrCaterer ? [...baseRequiredFields, 'guestCount'] : baseRequiredFields;
        
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')} are required`
            });
        }

        // Additional validation for guestCount when provided
        if (guestCount && isVenueOrCaterer && guestCount < 1) {
            return res.status(400).json({
                success: false,
                message: "Guest count must be at least 1 for venues and caterers"
            });
        }

        // For mock venues, we need to handle them differently
        let vendor;
        
        // Check if venueId is a number (for mock venues) or a valid ObjectId string
        const isNumericId = !isNaN(venueId) && !isNaN(parseFloat(venueId));
        const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(venueId);
        
        if (isNumericId) {
            // This is a mock venue, create a mock vendor object
            vendor = {
                _id: venueId,
                name: `Mock ${venueType || 'Service'} ${venueId}`,
                location: venueLocation || "Mock Location",
                contact: { phone: "Mock Phone", email: "mock@email.com" }
            };
        } else if (isValidObjectId) {
            // Try to find real vendor with valid ObjectId
            try {
                vendor = await VendorModel.findById(venueId);
                if (!vendor) {
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
            vendor = {
                _id: venueId,
                name: `Mock ${venueType || 'Service'} ${venueId}`,
                location: venueLocation || "Mock Location",
                contact: { phone: "Mock Phone", email: "mock@email.com" }
            };
        }

        // Calculate total price based on service type
        let totalPrice = budget;
        let advanceAmount = totalPrice * 0.3; // 30% advance
        let balanceAmount = totalPrice - advanceAmount;

        // Create customized special requests based on service type
        let customizedSpecialRequests = specialRequests || "";
        
        if (venueType === 'decorator') {
            if (decorationTheme) customizedSpecialRequests += `\nDecoration Theme: ${decorationTheme}`;
            if (setupTime) customizedSpecialRequests += `\nSetup Time: ${setupTime}`;
        } else if (venueType === 'caterer') {
            if (cuisinePreference) customizedSpecialRequests += `\nCuisine Preference: ${cuisinePreference}`;
            if (dietaryRestrictions) customizedSpecialRequests += `\nDietary Restrictions: ${dietaryRestrictions}`;
            if (menuType) customizedSpecialRequests += `\nMenu Type: ${menuType}`;
            if (serviceStyle) customizedSpecialRequests += `\nService Style: ${serviceStyle}`;
        } else if (venueType === 'artist') {
            // Artist specific fields
            if (performanceDuration) customizedSpecialRequests += `\nPerformance Duration: ${performanceDuration}`;
            if (musicPreferences) customizedSpecialRequests += `\nMusic Preferences: ${musicPreferences}`;
            if (equipmentNeeded) customizedSpecialRequests += `\nEquipment Needed: ${equipmentNeeded}`;
            if (danceStyle) customizedSpecialRequests += `\nDance Style: ${danceStyle}`;
            if (numberOfDancers) customizedSpecialRequests += `\nNumber of Dancers: ${numberOfDancers}`;
            if (practiceSessions) customizedSpecialRequests += `\nPractice Sessions: ${practiceSessions}`;
            if (mehendiType) customizedSpecialRequests += `\nMehendi Type: ${mehendiType}`;
            if (mehendiDesign) customizedSpecialRequests += `\nMehendi Design: ${mehendiDesign}`;
            if (handsToCover) customizedSpecialRequests += `\nHands to Cover: ${handsToCover}`;
            if (photographyPackage) customizedSpecialRequests += `\nPhotography Package: ${photographyPackage}`;
            if (photographyStyle) customizedSpecialRequests += `\nPhotography Style: ${photographyStyle}`;
            if (deliveryTime) customizedSpecialRequests += `\nDelivery Time: ${deliveryTime}`;
        } else if (venueType === 'accessories-makeup') {
            // Accessories & Makeup specific fields
            if (serviceType) customizedSpecialRequests += `\nService Type: ${serviceType}`;
            if (trialDate) customizedSpecialRequests += `\nTrial Date: ${trialDate}`;
            if (customizationNeeds) customizedSpecialRequests += `\nCustomization Needs: ${customizationNeeds}`;
            if (deliveryDate) customizedSpecialRequests += `\nDelivery Date: ${deliveryDate}`;
        }

        const booking = await BookingModel.create({
            userId,
            vendorId: vendor._id,
            venueId,
            venueType,
            eventType,
            eventDate: new Date(eventDate),
            // Handle guestCount based on service type
            guestCount: isVenueOrCaterer ? (guestCount || 1) : 0,
            budget: totalPrice,
            specialRequests: customizedSpecialRequests,
            contactPhone,
            contactEmail,
            totalPrice,
            advancePaid: 0,
            balanceAmount: totalPrice,
            paymentStatus: "pending"
        });

        console.log("Booking created:", booking);

        return res.status(201).json({
            success: true,
            message: `${venueType} booking created successfully`,
            booking
        });

    } catch (error) {
        console.error("Booking creation error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create booking",
            error: error.message
        });
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const userId = req.user.userId;
        
        const bookings = await BookingModel.find({ userId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            bookings
        });

    } catch (error) {
        console.error("Get bookings error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch bookings",
            error: error.message
        });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;

        const booking = await BookingModel.findOneAndUpdate(
            { _id: bookingId },
            { status },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Booking status updated successfully",
            booking
        });

    } catch (error) {
        console.error("Update booking error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update booking",
            error: error.message
        });
    }
};
