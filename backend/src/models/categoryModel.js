import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    image: { type: String },
    status: { type: Boolean, default: true }
}, { timestamps: true });

const CategoryModel = mongoose.model("Category", categorySchema);
export default CategoryModel;