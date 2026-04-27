import express from "express";
import { changePassword, loginUser, resetForgotPassword, sendForgotPasswordOtp, sendRegisterOtp, updateProfile, verifyRegisterOtp } from "../controller/website/userAuthController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { uploadMultipleImages } from "../middlewares/uploadMiddleware.js";
import { addToWishlist, getWishlistItems, removeWishlistItem } from "../controller/website/userWishlistController.js";
import { addToCart, clearCart, getCartItems, removeCartItem, updateCartQuantity } from "../controller/website/userCartController.js";
import { cancelMyOrder, createUserOrder, getMyOrders, getSingleOrderDetails } from "../controller/website/userOrderController.js";
import { failedRazorpayPayment, verifyRazorpayPayment } from "../controller/website/userPaymentController.js";
import { addNewAddress, deleteAddress, getMyAddresses, getSingleAddress, makeDefaultAddress, updateAddress } from "../controller/website/userAddressController.js";



const WebRouter = express.Router();

// User Auth
WebRouter.post("/register/sendotp", sendRegisterOtp);
WebRouter.post("/register/verifyotp", verifyRegisterOtp);
WebRouter.post("/user/login", loginUser);
WebRouter.patch("/user/profile", isAuth, uploadMultipleImages("profileImg", 1), updateProfile);
WebRouter.patch("/user/changepassword", isAuth, changePassword);

WebRouter.post("/user/forgetpassword/sendotp", sendForgotPasswordOtp);
WebRouter.post("/user/forgetpassword/verifyotp", resetForgotPassword);

// Wishlist
WebRouter.post("/wishlist/add", isAuth, addToWishlist)
WebRouter.get("/wishlist/all", isAuth, getWishlistItems)
WebRouter.delete("/wishlist/delete/:productId", isAuth, removeWishlistItem)

// Cart
WebRouter.post("/cart/add", isAuth, addToCart)
WebRouter.get("/cart/all", isAuth, getCartItems)
WebRouter.patch("/cart/quantity", isAuth, updateCartQuantity)
WebRouter.delete("/cart/delete/:productId", isAuth, removeCartItem)
WebRouter.delete("/cart/clear", isAuth, clearCart)

// ================= ORDER =================

// create order (COD + ONLINE)
WebRouter.post("/order/create", isAuth, createUserOrder);

// get all my orders
WebRouter.get("/order/all", isAuth, getMyOrders);

// get single order details
WebRouter.get("/order/details/:orderId", isAuth, getSingleOrderDetails);

// cancel my order
WebRouter.patch("/order/cancel/:orderId", isAuth, cancelMyOrder);


// ================= PAYMENT =================

// verify razorpay payment after success
WebRouter.post("/payment/verify", isAuth, verifyRazorpayPayment);

// mark payment failed if popup closed / failed
WebRouter.post("/payment/failed", isAuth, failedRazorpayPayment);

// ================= ADDRESS =================
WebRouter.post("/address/add", isAuth, addNewAddress);
WebRouter.get("/address/all", isAuth, getMyAddresses);
WebRouter.get("/address/details/:addressId", isAuth, getSingleAddress);
WebRouter.patch("/address/update/:addressId", isAuth, updateAddress);
WebRouter.delete("/address/delete/:addressId", isAuth, deleteAddress);
WebRouter.patch("/address/default/:addressId", isAuth, makeDefaultAddress);

export default WebRouter;