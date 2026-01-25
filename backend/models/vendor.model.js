import mongoose, { Schema } from "mongoose";

const VendorSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true
    },
    vendorType:{
        type: String,
        enum: ["decorator", "accessories", "venue", "artist",],
        required: true
    },
    subType:{
        type: String,
    },
    images:{
        type:[String],
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    details:{
        type:Schema.Types.Mixed,
        required:true,
    },
    averageRating:{
        type:Number,
    }
    

},{timestamps:true})

export const VendorModel = mongoose.model("Vendor",VendorSchema);