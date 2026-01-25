import { Router } from "express";
import { filterProducts,getAllProducts,getProductById } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router= Router()

router.get('/product/filter',protect,filterProducts)
router.get("/products", protect, getAllProducts);
router.get("/product/:id", protect, getProductById);

export default router;