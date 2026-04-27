import crypto from "crypto";
import OrderModel from "../../models/orderModel.js";
import CartModel from "../../models/cartModel.js";




// =============================
// VERIFY RAZORPAY PAYMENT
// =============================
export const verifyRazorpayPayment = async (req, res) => {
    try {
        const userId = req.user._id;

        const {
            orderId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (!orderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "All payment details are required"
            });
        }

        const order = await OrderModel.findOne({ _id: orderId, userId });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            order.paymentStatus = "FAILED";
            await order.save();

            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }

        order.paymentStatus = "SUCCESS";
        order.razorpayOrderId = razorpay_order_id;
        order.razorpayPaymentId = razorpay_payment_id;
        order.razorpaySignature = razorpay_signature;
        order.orderStatus = "CONFIRM";

        await order.save();

        await CartModel.findOneAndDelete({ userId });

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            order
        });

    } catch (error) {
        console.log("Verify Payment Error", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




// =============================
// PAYMENT FAILED
// =============================
export const failedRazorpayPayment = async (req, res) => {
    try {
        const userId = req.user._id;
        const { orderId } = req.body;

        const order = await OrderModel.findOne({ _id: orderId, userId });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        order.paymentStatus = "FAILED";
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Payment marked as failed"
        });

    } catch (error) {
        console.log("Payment Failed Error", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};