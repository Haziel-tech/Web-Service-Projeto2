import { Router } from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cart.controller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
router.use(authMiddleware);
router.get("/", getCart);
router.post("/add", addToCart);
router.delete("/item/:itemId", removeFromCart);

export default router;