import { Router } from "express";
import { listCategories, createCategory, deleteCategory } from "../controllers/category.controller";
import { authMiddleware } from "../middlewares/auth";
import { requireRole } from "../middlewares/roles";

const router = Router();
router.get("/", listCategories);
router.post("/", authMiddleware, requireRole("EMPLOYEE"), createCategory);
router.delete("/:id", authMiddleware, requireRole("ADMIN"), deleteCategory);

export default router;