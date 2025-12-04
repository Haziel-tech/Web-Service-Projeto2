import { Router } from "express";
import { listPromotions, createPromotion, deletePromotion } from "../controllers/promotion.controller";
import { authMiddleware } from "../middlewares/auth";
import { requireRole } from "../middlewares/roles";

const router = Router();
router.get("/", listPromotions);
router.post("/", authMiddleware, requireRole("EMPLOYEE"), createPromotion);
router.delete("/:id", authMiddleware, requireRole("EMPLOYEE"), deletePromotion);

export default router;
