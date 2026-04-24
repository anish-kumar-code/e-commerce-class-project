import express from "express";

import {uploadMultipleImages} from "../middlewares/uploadMiddleware.js"
import { addCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from "../controller/admin/categoryController.js";
import { addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controller/admin/productController.js";

const WebRouter = express.Router();

// Admin Category Routes
WebRouter.post("/category/add", uploadMultipleImages("image", 1), addCategory);
WebRouter.patch("/category/update/:id", uploadMultipleImages("image", 1), updateCategory);
WebRouter.delete("/category/delete/:id", deleteCategory);
WebRouter.get("/category/all", getAllCategories);
WebRouter.get("/category/:id", getSingleCategory);

// Admin Product Routes
WebRouter.post("/product/add", uploadMultipleImages("images", 5), addProduct);
WebRouter.put("/product/update/:id", uploadMultipleImages("images", 5), updateProduct);
WebRouter.delete("/product/delete/:id", deleteProduct);
WebRouter.get("/product/all", getAllProducts);
WebRouter.get("/product/:id", getSingleProduct);

export default WebRouter;