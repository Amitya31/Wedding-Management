import { ContactModel } from "../models/contact.model.js";
import { VendorModel } from "../models/vendor.model.js";

export const createContact = async (req, res) => {
    try {
        console.log("Creating contact with data:", req.body);
        console.log("User from middleware:", req.user);
        
        // Validate request body
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is required"
            });
        }
        
        const { venueId, venueType, contactType, message, contactPhone, contactEmail } = req.body;
        const userId = req.user.userId;
        
        // Validate required fields
        if (!venueId || !contactType) {
            return res.status(400).json({
                success: false,
                message: "venueId and contactType are required"
            });
        }
        
        // For message type, contactEmail is required
        if (contactType === 'message' && !contactEmail) {
            return res.status(400).json({
                success: false,
                message: "contactEmail is required for message requests"
            });
        }
        
        // For call type, contactPhone is required
        if (contactType === 'call' && !contactPhone) {
            return res.status(400).json({
                success: false,
                message: "contactPhone is required for call requests"
            });
        }
        
        console.log("User ID:", userId, "Venue ID:", venueId, "Contact Type:", contactType, "Venue Type:", venueType);

        // For mock venues, we need to handle them differently
        let venue;
        
        // Check if venueId is a number (for mock venues) or a valid ObjectId string
        const isNumericId = !isNaN(venueId) && !isNaN(parseFloat(venueId));
        const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(venueId);
        
        if (isNumericId) {
            // This is a mock venue, create a mock venue object
            venue = {
                _id: venueId,
                name: `Mock ${venueType || 'Service'} ${venueId}`,
                location: "Mock Location",
                contact: { phone: "Mock Phone", email: "mock@email.com" }
            };
        } else if (isValidObjectId) {
            // Try to find real vendor with valid ObjectId
            try {
                venue = await VendorModel.findById(venueId);
                if (!venue) {
                    return res.status(404).json({
                        success: false,
                        message: "Venue not found"
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
                _id: venueId,
                name: `Mock ${venueType || 'Service'} ${venueId}`,
                location: "Mock Location",
                contact: { phone: "Mock Phone", email: "mock@email.com" }
            };
        }

        // Customize message based on service type
        let customizedMessage = message || "";
        if (venueType) {
            customizedMessage = `[${venueType.charAt(0).toUpperCase() + venueType.slice(1)} Service Inquiry] ${customizedMessage}`;
        }

        const contact = await ContactModel.create({
            userId,
            vendorId: venue._id,
            venueId,
            venueType,
            contactType,
            message: customizedMessage,
            contactPhone: contactPhone || contactEmail,
            contactEmail,
            status: "pending"
        });

        console.log("Contact created:", contact);

        return res.status(201).json({
            success: true,
            message: `${contactType === 'call' ? 'Call request' : 'Message'} sent successfully!`,
            contact
        });

    } catch (error) {
        console.error("Contact creation error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send contact request",
            error: error.message
        });
    }
};

export const getUserContacts = async (req, res) => {
    try {
        const userId = req.user.userId;
        
        const contacts = await ContactModel.find({ userId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            contacts
        });

    } catch (error) {
        console.error("Get contacts error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch contacts",
            error: error.message
        });
    }
};

export const updateContactStatus = async (req, res) => {
    try {
        const { contactId } = req.params;
        const { status, response } = req.body;

        const contact = await ContactModel.findOneAndUpdate(
            { _id: contactId },
            { status, response },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact updated successfully",
            contact
        });

    } catch (error) {
        console.error("Update contact error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update contact",
            error: error.message
        });
    }
};
