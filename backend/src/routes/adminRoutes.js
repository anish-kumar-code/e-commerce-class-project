import express from "express";

import {uploadMultipleImages} from "../middlewares/uploadMiddleware.js"
import { addCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from "../controller/admin/categoryController.js";
import { addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controller/admin/productController.js";

const AdminRouter = express.Router();

// Admin Category Routes
AdminRouter.post("/category/add", uploadMultipleImages("image", 1), addCategory);
AdminRouter.patch("/category/update/:id", uploadMultipleImages("image", 1), updateCategory);
AdminRouter.delete("/category/delete/:id", deleteCategory);
AdminRouter.get("/category/all", getAllCategories);
AdminRouter.get("/category/:id", getSingleCategory);

// Admin Product Routes
AdminRouter.post("/product/add", uploadMultipleImages("images", 5), addProduct);
AdminRouter.patch("/product/update/:id", uploadMultipleImages("images", 5), updateProduct);
AdminRouter.delete("/product/delete/:id", deleteProduct);
AdminRouter.get("/product/all", getAllProducts);
AdminRouter.get("/product/:id", getSingleProduct);

export default AdminRouter;