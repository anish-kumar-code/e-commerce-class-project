import CartModel from "../../models/cartModel.js";



// =====================================================
// ADD TO CART
// =====================================================
export const addToCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;

        const qty = Number(quantity) || 1;

        let cart = await CartModel.findOne({ userId });

        // if cart not exist create
        if (!cart) {
            cart = await CartModel.create({
                userId,
                items: [{ productId, quantity: qty }]
            });

            return res.status(201).json({
                success: true,
                message: "Product added to cart",
                data: cart
            });
        }

        // check existing product
        const itemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += qty;
        } else {
            cart.items.push({
                productId,
                quantity: qty
            });
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            data: cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// =====================================================
// GET CART ITEMS
// =====================================================
export const getCartItems = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await CartModel.findOne({ userId }).populate("items.productId");

        if (!cart) {
            return res.status(200).json({
                success: true,
                items: [],
                grandTotal: 0
            });
        }

        let grandTotal = 0;

        cart.items.forEach(item => {
            const product = item.productId;

            const productPrice = product.salePrice || product.price || 0;

            grandTotal += productPrice * item.quantity;
        });

        return res.status(200).json({
            success: true,
            totalItems: cart.items.length,
            grandTotal,
            data: cart.items
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




// =====================================================
// UPDATE CART ITEM QUANTITY
// =====================================================
export const updateCartQuantity = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, action } = req.body;

        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const itemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        if (action === "increase") {
            cart.items[itemIndex].quantity += 1;
        }

        if (action === "decrease") {
            cart.items[itemIndex].quantity -= 1;

            if (cart.items[itemIndex].quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            }
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart quantity updated",
            data: cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




// =====================================================
// REMOVE SINGLE CART ITEM
// =====================================================
export const removeCartItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;

        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            item => item.productId.toString() !== productId
        );

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Item removed from cart",
            data: cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




// =====================================================
// CLEAR FULL CART
// =====================================================
export const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;

        await CartModel.findOneAndDelete({ userId });

        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};