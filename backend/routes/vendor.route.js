import { CreateProduct, deleteProduct, updateProduct, getVendorProducts } from "../controllers/vendors.controller.js";
import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()
router.get('/products', protect, authorizeRoles, getVendorProducts);
router.post('/create',upload.array("images", 5),protect,authorizeRoles,CreateProduct);
router.put(
    "/update/:id",
    upload.array("images", 5),
    protect,
    authorizeRoles,
    updateProduct
);

router.delete(
    "/delete/:id",
    protect,
    authorizeRoles,
    deleteProduct
);


export default router;