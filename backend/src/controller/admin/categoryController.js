import CategoryModel from "../../models/categoryModel.js";
import { deleteImageFromCloudinary } from "../../utils/cloudinaryHelper.js";



// 🔥 ADD CATEGORY
export const addCategory = async (req, res) => {
    console.log("Working category controller")
    try {

        const { name, status } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }

        // check duplicate
        const existing = await CategoryModel.findOne({ name: name.trim() });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            });
        }

        const image = req.uploadedImages ? req.uploadedImages[0] : "";

        const category = await CategoryModel.create({
            name: name.trim(),
            image,
            status
        });

        return res.status(201).json({
            success: true,
            message: "Category added successfully",
            data: category
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// ✏️ UPDATE CATEGORY
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;

        let category = await CategoryModel.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        // duplicate check (exclude current)
        if (name) {
            const existing = await CategoryModel.findOne({
                name: name.trim(),
                _id: { $ne: id }
            });

            if (existing) {
                return res.status(400).json({
                    success: false,
                    message: "Category name already exists"
                });
            }

            category.name = name.trim();
        }

        // update image if new uploaded
        if (req.uploadedImages && req.uploadedImages.length > 0) {

            // delete old image
            if (category.image) {
                await deleteImageFromCloudinary(category.image);
            }

            category.image = req.uploadedImages[0];
        }

        if (typeof status !== "undefined") {
            category.status = status;
        }

        await category.save();

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// ❌ DELETE CATEGORY
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await CategoryModel.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        // delete image
        if (category.image) {
            await deleteImageFromCloudinary(category.image);
        }

        await CategoryModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// 📋 GET ALL CATEGORY
export const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// 🔍 GET SINGLE CATEGORY
export const getSingleCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await CategoryModel.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: category
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};