import { Router } from "express";
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth";
import { requireRole } from "../middlewares/roles";

const router = Router();
router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", authMiddleware, requireRole("EMPLOYEE"), createProduct);
router.put("/:id", authMiddleware, requireRole("EMPLOYEE"), updateProduct);
router.delete("/:id", authMiddleware, requireRole("ADMIN"), deleteProduct);

export default router;