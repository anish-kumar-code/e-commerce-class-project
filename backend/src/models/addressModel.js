import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        trim: true
    },

    receiverName: {
        type: String,
        required: true,
        trim: true
    },

    receiverMobileNo: {
        type: String,
        required: true,
        trim: true
    },

    addressLine1: {
        type: String,
        required: true,
        trim: true
    },

    addressLine2: {
        type: String,
        trim: true
    },

    landmark: {
        type: String,
        trim: true
    },

    city: {
        type: String,
        required: true,
        trim: true
    },

    pincode: {
        type: String,
        required: true,
        trim: true
    },

    tag: {
        type: String,
        enum: ["Home", "Office", "Friend's Home"],
        default: "Home"
    },

    isDefault: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const AddressModel = mongoose.model("Address", addressSchema);
export default AddressModel;