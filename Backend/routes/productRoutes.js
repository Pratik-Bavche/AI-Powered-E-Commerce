import express from 'express';
import { addProduct, listProduct, removeProduct } from '../controller/productController.js';
import adminAuth from '../middleware/adminAuth.js';

const productRoutes = express.Router();

productRoutes.post("/addproduct", addProduct);

productRoutes.get("/list", listProduct);

productRoutes.post("/remove/:id", adminAuth, removeProduct);

export default productRoutes;
