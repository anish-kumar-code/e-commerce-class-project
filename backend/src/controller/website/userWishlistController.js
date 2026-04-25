import WishlistModel from "../../models/wishlistModel.js";



// ===============================================
// ADD TO WISHLIST
// ===============================================
export const addToWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        const existingItem = await WishlistModel.findOne({ userId, productId });

        if (existingItem) {
            return res.status(400).json({
                success: false,
                message: "Product already in wishlist"
            });
        }

        const wishlistItem = await WishlistModel.create({
            userId,
            productId
        });

        return res.status(201).json({
            success: true,
            message: "Product added to wishlist",
            data: wishlistItem
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// ===============================================
// GET ALL WISHLIST ITEMS
// ===============================================
export const getWishlistItems = async (req, res) => {
    try {
        const userId = req.user._id;

        const wishlistItems = await WishlistModel.find({ userId })
            .populate({
                path: "productId"
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: wishlistItems.length,
            data: wishlistItems
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// ===============================================
// REMOVE FROM WISHLIST
// ===============================================
export const removeWishlistItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;

        const deletedItem = await WishlistModel.findOneAndDelete({
            userId,
            productId
        });

        if (!deletedItem) {
            return res.status(404).json({
                success: false,
                message: "Wishlist item not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product removed from wishlist"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};