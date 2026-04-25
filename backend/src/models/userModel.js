import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, default: ""},

    email: { type: String, required: true, unique: true},

    mobile: { type: String },

    password: { type: String, required: true, select: false },

    otp: { type: Number, default: ""},
    otpExpiry: { type: Date, default: ""},
    isVerified: { type: Boolean, default: false },

    isBlocked: { type: Boolean, default: false },

    status: { type: Boolean, default: true },

    profileImg: { type: String, default: ""}

}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);
export default UserModel;