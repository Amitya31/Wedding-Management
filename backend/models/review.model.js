import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema({
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
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    helpful: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export const ReviewModel = mongoose.model("Review", ReviewSchema);
