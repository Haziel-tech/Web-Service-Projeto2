import { Router } from "express";
import { listUsers, getUser, updateUser, deleteUser } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth";
import { requireRole } from "../middlewares/roles";

const router = Router();
router.use(authMiddleware);
router.get("/", requireRole("EMPLOYEE"), listUsers);
router.get("/:id", requireRole("EMPLOYEE"), getUser);
router.put("/:id", requireRole("EMPLOYEE"), updateUser);
router.delete("/:id", requireRole("ADMIN"), deleteUser);

export default router;