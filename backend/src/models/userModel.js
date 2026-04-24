import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    mobile: { type: String },

    password: { type: String, required: true, select: false },

    isVerified: { type: Boolean, default: false },

    isBlocked: { type: Boolean, default: false },

    status: { type: Boolean, default: true },

    profileImg: { type: String }

}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);
export default UserModel;