import mongoose from "mongoose";
import ProductModel from "../../models/productModel.js";
import CategoryModel from "../../models/categoryModel.js";
import { deleteImageFromCloudinary } from "../../utils/cloudinaryHelper.js";


// 🔥 ADD PRODUCT
export const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            originalPrice,
            sellingPrice,
            stock,
            categoryId,
            status,
            tags
        } = req.body;

        // validation
        if (!name || !originalPrice || !sellingPrice || !categoryId) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing"
            });
        }

        // category check
        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        // discount calculate
        const discountPercentage =
            ((originalPrice - sellingPrice) / originalPrice) * 100;

        const images = req.uploadedImages || [];

        const product = await ProductModel.create({
            name: name.trim(),
            description,
            originalPrice,
            sellingPrice,
            discountPercentage,
            stock,
            categoryId,
            status,
            tags: tags ? tags.split(",") : [],
            images
        });

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// ✏️ UPDATE PRODUCT
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        let product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const {
            name,
            description,
            originalPrice,
            sellingPrice,
            stock,
            categoryId,
            status,
            tags
        } = req.body;

        // update fields
        if (name) product.name = name.trim();
        if (description) product.description = description;
        if (stock !== undefined) product.stock = stock;
        if (status !== undefined) product.status = status;

        if (tags) {
            product.tags = tags.split(",");
        }

        // category update
        if (categoryId) {
            const category = await CategoryModel.findById(categoryId);
            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found"
                });
            }
            product.categoryId = categoryId;
        }

        // price + discount update
        if (originalPrice) product.originalPrice = originalPrice;
        if (sellingPrice) product.sellingPrice = sellingPrice;

        if (originalPrice || sellingPrice) {
            product.discountPercentage =
                ((product.originalPrice - product.sellingPrice) /
                    product.originalPrice) * 100;
        }

        // 🔥 IMAGE UPDATE (MULTIPLE)
        if (req.uploadedImages && req.uploadedImages.length > 0) {

            // delete old images
            if (product.images && product.images.length > 0) {
                for (const img of product.images) {
                    await deleteImageFromCloudinary(img);
                }
            }

            // set new images
            product.images = req.uploadedImages;
        }

        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// ❌ DELETE PRODUCT
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // delete images
        if (product.images && product.images.length > 0) {
            for (const img of product.images) {
                await deleteImageFromCloudinary(img);
            }
        }

        await ProductModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// 📋 GET ALL PRODUCTS (with filter + pagination)
export const getAllProducts = async (req, res) => {
    try {
        let {
            page = 1,
            limit = 10,
            search = "",
            categoryId,
            minPrice,
            maxPrice
        } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        let query = {};

        // search
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        // category filter
        if (categoryId) {
            query.categoryId = categoryId;
        }

        // price filter
        if (minPrice || maxPrice) {
            query.sellingPrice = {};
            if (minPrice) query.sellingPrice.$gte = Number(minPrice);
            if (maxPrice) query.sellingPrice.$lte = Number(maxPrice);
        }

        const products = await ProductModel.find(query)
            .populate("categoryId", "name")
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await ProductModel.countDocuments(query);

        return res.status(200).json({
            success: true,
            count: products.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: products
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// 🔍 GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await ProductModel.findById(id)
            .populate("categoryId", "name");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};