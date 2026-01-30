import mongoose, { Schema } from "mongoose";

const FavouriteSchema = new Schema({
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
    notes: {
        type: String,
        default: ""
    }
}, { timestamps: true });

// Compound index to prevent duplicate favorites
// Use venueId for uniqueness since vendorId might be the same for mock venues
FavouriteSchema.index({ userId: 1, venueId: 1 }, { unique: true });

// Additional index for vendorId to help with queries
FavouriteSchema.index({ userId: 1, vendorId: 1 });

export const FavouriteModel = mongoose.model("Favourite", FavouriteSchema);
