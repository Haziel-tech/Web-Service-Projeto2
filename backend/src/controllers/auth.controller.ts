import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES } from "../config/jwt";

export async function register(req: Request, res: Response) {
  const { name, email, cpf, password, role } = req.body;
  if (!email || !password || !name || !cpf) return res.status(400).json({ message: "Dados incompletos" });
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(400).json({ message: "E-mail já cadastrado" });
  const cpfExists = await prisma.user.findUnique({ where: { cpf } });
  if (cpfExists) return res.status(400).json({ message: "CPF já cadastrado" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, cpf, password: hashed, role: role || "CUSTOMER" }
  });
  const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  return res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Dados incompletos" });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Credenciais inválidas" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Credenciais inválidas" });
  const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
}