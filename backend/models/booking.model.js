import mongoose, { Schema } from "mongoose";

const BookingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    vendorId: {
        type: Schema.Types.Mixed, // Can be ObjectId or string for mock venues
        required: true
    },
    venueId: {
        type: Schema.Types.Mixed, // Can be ObjectId or string for mock venues
        required: true
    },
    venueType: {
        type: String,
        enum: ["venue", "decorator", "caterer", "artist", "accessories", "accessories-makeup"],
        required: true
    },
    eventType: {
        type: String,
        enum: ["wedding", "reception", "engagement", "sangeet", "mehndi", "other"],
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    guestCount: {
        type: Number,
        required: false, // Made optional, validation handled in controller
        min: 0
    },
    budget: {
        type: Number,
        required: true
    },
    specialRequests: {
        type: String,
        default: ""
    },
    contactPhone: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "completed"],
        default: "pending"
    },
    totalPrice: {
        type: Number,
        required: true
    },
    advancePaid: {
        type: Number,
        default: 0
    },
    balanceAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "partial", "paid", "refunded"],
        default: "pending"
    }
}, { timestamps: true });

export const BookingModel = mongoose.model("Booking", BookingSchema);
