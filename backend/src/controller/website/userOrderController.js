import crypto from "crypto";
import OrderModel from "../../models/orderModel.js";
import ProductModel from "../../models/productModel.js";
// import CouponModel from "../../models/couponModel.js";
import CartModel from "../../models/cartModel.js";
import razorpayInstance from "../../utils/razorpayInstance.js";

// =============================
// CREATE USER ORDER (COD + ONLINE)
// =============================
export const createUserOrder = async (req, res) => {
    try {
        const userId = req.user._id;

        const {
            items,
            deliveryCharges = 0,
            couponCode = "",
            paymentType
        } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order items are required"
            });
        }

        if (!paymentType) {
            return res.status(400).json({
                success: false,
                message: "Payment type is required"
            });
        }

        let orderItems = [];
        let itemsTotal = 0;

        // =============================
        // VALIDATE PRODUCTS
        // =============================
        for (const item of items) {
            const product = await ProductModel.findById(item.productId);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product not found`
                });
            }

            const quantity = Number(item.quantity);

            const total = product.sellingPrice * quantity;

            orderItems.push({
                productId: product._id,
                name: product.name,
                price: product.sellingPrice,
                quantity,
                total
            });

            itemsTotal += total;
        }

        // =============================
        // COUPON VALIDATION
        // =============================
        let couponId = null;
        let couponValue = 0;
        let appliedCouponCode = "";

        // if (couponCode) {
        //     const coupon = await CouponModel.findOne({ code: couponCode });

        //     if (coupon) {
        //         couponId = coupon._id;
        //         appliedCouponCode = coupon.code;

        //         if (coupon.discountType === "PERCENTAGE") {
        //             couponValue = Math.floor((itemsTotal * coupon.discountValue) / 100);
        //         } else {
        //             couponValue = coupon.discountValue;
        //         }
        //     }
        // }

        // =============================
        // FINAL AMOUNT
        // =============================
        const finalAmount = itemsTotal + deliveryCharges - couponValue;

        // =============================
        // COD ORDER
        // =============================
        if (paymentType === "COD") {
            const newOrder = await OrderModel.create({
                userId,
                items: orderItems,
                itemsTotal,
                deliveryCharges,
                couponId,
                couponCode: appliedCouponCode,
                couponValue,
                finalAmount,
                paymentType: "COD",
                paymentStatus: "PENDING",
                orderStatus: "PLACED"
            });

            // await CartModel.findOneAndDelete({ userId });

            return res.status(201).json({
                success: true,
                message: "COD Order placed successfully",
                order: newOrder
            });
        }

        // =============================
        // ONLINE ORDER -> CREATE RAZORPAY ORDER
        // =============================
        if (paymentType === "ONLINE") {
            const razorpayOrder = await razorpayInstance.orders.create({
                amount: finalAmount * 100,
                currency: "INR",
                receipt: `receipt_${Date.now()}`
            });

            const newOrder = await OrderModel.create({
                userId,
                items: orderItems,
                itemsTotal,
                deliveryCharges,
                couponId,
                couponCode: appliedCouponCode,
                couponValue,
                finalAmount,
                paymentType: "ONLINE",
                paymentStatus: "PENDING",
                razorpayOrderId: razorpayOrder.id,
                orderStatus: "PLACED"
            });

            return res.status(201).json({
                success: true,
                message: "Razorpay order created",
                orderId: newOrder._id,
                razorpayOrderId: razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                razorpayKey: process.env.RAZORPAY_KEY_ID
            });
        }

        return res.status(400).json({
            success: false,
            message: "Invalid payment type"
        });

    } catch (error) {
        console.log("Create User Order Error", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// =============================
// GET MY ORDERS
// =============================
export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user._id;

        const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            totalOrders: orders.length,
            orders
        });

    } catch (error) {
        console.log("Get My Orders Error", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// =============================
// GET SINGLE ORDER DETAILS
// =============================
export const getSingleOrderDetails = async (req, res) => {
    try {
        const userId = req.user._id;
        const { orderId } = req.params;

        const order = await OrderModel.findOne({ _id: orderId, userId });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        console.log("Get Single Order Error", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// =============================
// CANCEL ORDER
// =============================
export const cancelMyOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { orderId } = req.params;

        const order = await OrderModel.findOne({ _id: orderId, userId });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (order.orderStatus === "DELIVERED") {
            return res.status(400).json({
                success: false,
                message: "Delivered order cannot be cancelled"
            });
        }

        order.orderStatus = "CANCELLED";
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully"
        });

    } catch (error) {
        console.log("Cancel Order Error", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};