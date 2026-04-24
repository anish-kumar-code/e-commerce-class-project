import multer from "multer";
import { uploadToCloudinary } from "../config/cloudinary.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PNG, JPG, JPEG files are allowed"), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter
});

export const uploadMultipleImages = (fieldName, count) => {
    return (req, res, next) => {
        const uploader = upload.array(fieldName, count);

        uploader(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ success: false, message: err.message });
            }

            try {
                if (!req.files || req.files.length === 0) {
                    req.uploadedImages = [];
                    return next();
                    // return res.status(400).json({
                    //     success: false,
                    //     message: "No files uploaded"
                    // });
                }

                const uploadedImages = [];

                for (const file of req.files) {
                    const result = await uploadToCloudinary(file.buffer, {
                        folder: "shopkart-ecommerce"
                    });

                    uploadedImages.push(result.secure_url);
                }

                req.uploadedImages = uploadedImages;

                next();
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
        });
    };
};