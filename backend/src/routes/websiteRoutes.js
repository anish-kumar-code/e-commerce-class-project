import express from "express";
import { changePassword, loginUser, resetForgotPassword, sendForgotPasswordOtp, sendRegisterOtp, updateProfile, verifyRegisterOtp } from "../controller/website/userAuthController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { uploadMultipleImages } from "../middlewares/uploadMiddleware.js";
import { addToWishlist, getWishlistItems, removeWishlistItem } from "../controller/website/userWishlistController.js";
import { addToCart, clearCart, getCartItems, removeCartItem, updateCartQuantity } from "../controller/website/userCartController.js";



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

export default WebRouter;