import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            name: String,
            price: Number,
            quantity: Number,
            total: Number
        }
    ],

    itemsTotal: { type: Number, required: true },

    deliveryCharges: { type: Number, default: 0 },

    couponId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon"
    },

    couponCode: String,
    couponValue: Number,

    finalAmount: { type: Number, required: true },

    paymentType: {
        type: String,
        enum: ["COD", "ONLINE"],
        default: "COD"
    },

    paymentStatus: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FAILED"],
        default: "PENDING"
    },

    // Razorpay related
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    // paymentId: String,

    orderStatus: {
        type: String,
        enum: ["PLACED", "CONFIRM", "SHIPPED", "DELIVERED", "CANCELLED"],
        default: "PLACED"
    }

}, { timestamps: true });

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;