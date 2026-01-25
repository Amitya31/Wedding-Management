import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { Schema } from "mongoose";

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:[8,"Password should be atleast 8 characters"]
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    usertype:{
        type:String,
        enum:["user","vendor"],
        required:true,
        default:"user"
    },
},{timestamps:true})

UserSchema.pre('save', async function(){
    if(!this.isModified("password")) return ;
    this.password = await bcrypt.hash(this.password, 10);
})

UserSchema.methods.generateToken = function(){
    return jwt.sign({userId:this._id,role:this.usertype},process.env.SECRETKEY,{expiresIn:"7d"})
}

export const UserModel = mongoose.model("User",UserSchema);


