import { Router } from "express";
import { createOrder, listOrders } from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
router.use(authMiddleware);
router.post("/", createOrder);
router.get("/", listOrders);

export default router;