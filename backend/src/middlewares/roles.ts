import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";

export function requireRole(required: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: "Não autenticado" });
    if (req.user.role !== required && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Permissão negada" });
    }
    next();
  };
}