import mongoose, { Schema } from "mongoose";

const ContactSchema = new Schema({
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
    contactType: {
        type: String,
        enum: ["call", "message"],
        required: true
    },
    message: {
        type: String,
        required: function() {
            return this.contactType === 'message';
        }
    },
    contactPhone: {
        type: String,
        required: function() {
            return this.contactType === 'call';
        }
    },
    contactEmail: {
        type: String,
        required: function() {
            return this.contactType === 'message';
        }
    },
    status: {
        type: String,
        enum: ["pending", "responded", "closed"],
        default: "pending"
    },
    response: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export const ContactModel = mongoose.model("Contact", ContactSchema);
