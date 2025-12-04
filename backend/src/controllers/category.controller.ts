import { Request, Response } from "express";
import { prisma } from "../prismaClient";

export async function listCategories(req: Request, res: Response) {
  const cats = await prisma.category.findMany();
  res.json(cats);
}

export async function createCategory(req: Request, res: Response) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Nome obrigatório" });
  const cat = await prisma.category.create({ data: { name } });
  res.status(201).json(cat);
}

export async function deleteCategory(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.category.delete({ where: { id } });
  res.json({ message: "Deletado" });
}