import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export const isAuth = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        token = token.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await UserModel.findById(decoded.id);

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};