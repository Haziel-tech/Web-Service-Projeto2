import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import bcrypt from "bcrypt";

export async function listUsers(req: Request, res: Response) {
  const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, cpf: true, role: true, createdAt: true } });
  res.json(users);
}

export async function getUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  const { password, ...rest } = user;
  res.json(rest);
}

export async function updateUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { name, email, cpf, password, role } = req.body;
  const data: any = {};
  if (name) data.name = name;
  if (email) data.email = email;
  if (cpf) data.cpf = cpf;
  if (role) data.role = role;
  if (password) data.password = await bcrypt.hash(password, 10);
  const user = await prisma.user.update({ where: { id }, data });
  const { password: pwd, ...rest } = user;
  res.json(rest);
}

export async function deleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.user.delete({ where: { id } });
  res.json({ message: "Removido" });
}