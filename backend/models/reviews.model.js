import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    vendorId: {
        type: Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },

    comment: {
        type: String
    },

    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
}, { timestamps: true });

ReviewSchema.index({ userId: 1, vendorId: 1 }, { unique: true });

export const ReviewModel = mongoose.model("Review",ReviewSchema)
