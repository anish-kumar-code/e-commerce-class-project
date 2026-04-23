import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },

    images: [{ type: String }],

    description: { type: String },

    rating: { type: Number, default: 0 },

    originalPrice: { type: Number, required: true },

    sellingPrice: { type: Number, required: true },

    discountPercentage: { type: Number },

    stock: { type: Number, default: 0 },

    tags: [{ type: String }],

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

    status: { type: Boolean, default: true }

}, { timestamps: true });

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;