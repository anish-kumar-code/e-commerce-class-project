
import bcrypt from "bcryptjs";
import sendOtpMail from "../../utils/sendOtpMail.js";
import generateToken from "../../utils/generateToken.js";
import otpGenerator from "../../utils/otpGenerator.js";
import UserModel from "../../models/userModel.js";
import { deleteImageFromCloudinary } from "../../utils/cloudinaryHelper.js";


// ============================================
// SEND REGISTER OTP
// ============================================
export const sendRegisterOtp = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const existingUser = await UserModel.findOne({ email });

        if (existingUser && existingUser.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        const otp = otpGenerator();
        const hashedTempPassword = await bcrypt.hash(password, 10);

        let user = await UserModel.findOne({ email });

        if (!user) {
            user = new UserModel({
                email,
                password: hashedTempPassword,
                otp,
                otpExpiry: Date.now() + 10 * 60 * 1000,
                isVerified: false
            });
        } else {
            user.password = hashedTempPassword;
            user.otp = otp;
            user.otpExpiry = Date.now() + 10 * 60 * 1000;
        }

        await user.save();

        await sendOtpMail(email, otp, "User");

        res.status(200).json({
            success: true,
            message: "OTP sent to email"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ============================================
// VERIFY REGISTER OTP AND CREATE USER
// ============================================
export const verifyRegisterOtp = async (req, res) => {
    try {
        const { email, otp, name, mobile } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.otp != otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        user.name = name;
        user.mobile = mobile;
        user.otp = undefined;
        user.otpExpiry = undefined;
        user.isVerified = true;

        await user.save();

        res.status(201).json({
            success: true,
            message: "Registration successful"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ============================================
// LOGIN USER
// ============================================
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email }).select("+password");

        if (!user || !user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email Id or Password is wrong"
            });
        }

        if (user.isBlocked) {
            return res.status(403).json({
                success: false,
                message: "Account blocked by admin"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Email Id or Password is wrong"
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ============================================
// SEND FORGOT PASSWORD OTP
// ============================================
export const sendForgotPasswordOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email not found"
            });
        }

        const otp = otpGenerator();

        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;

        await user.save();

        await sendOtpMail(email, otp, user.name || "User");

        res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ============================================
// VERIFY OTP AND RESET PASSWORD
// ============================================
export const resetForgotPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await UserModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.otp != otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = undefined;
        user.otpExpiry = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successful"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ============================================
// UPDATE PROFILE
// ============================================
export const updateProfile = async (req, res) => {

    try {
        const userId = req.user._id;

        const { name, mobile } = req.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // update normal fields
        if (name) user.name = name.trim();
        if (mobile) user.mobile = mobile.trim();

        // update profile image if uploaded
        if (req.uploadedImages && req.uploadedImages.length > 0) {

            // old image delete from cloudinary
            if (user.profileImg) {
                await deleteImageFromCloudinary(user.profileImg);
            }

            // new image save
            user.profileImg = req.uploadedImages[0];
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ============================================
// CHANGE PASSWORD
// ============================================
export const changePassword = async (req, res) => {
    try {
        const userId = req.user._id;

        const { oldPassword, newPassword } = req.body;

        const user = await UserModel.findById(userId).select("+password");

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password incorrect"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};