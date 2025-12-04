import { Request, Response } from "express";
import { prisma } from "../prismaClient";

export async function listProducts(req: Request, res: Response) {
  const products = await prisma.product.findMany({ include: { category: true, promotions: true } });
  res.json(products);
}

export async function getProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  const p = await prisma.product.findUnique({ where: { id }, include: { category: true, promotions: true } });
  if (!p) return res.status(404).json({ message: "Produto não encontrado" });
  res.json(p);
}

export async function createProduct(req: Request, res: Response) {
  const { name, description, price, stock, imageUrl, categoryId } = req.body;
  if (!name || price == null) return res.status(400).json({ message: "Dados incompletos" });
  const p = await prisma.product.create({
    data: { name, description, price: Number(price), stock: Number(stock ?? 0), imageUrl, categoryId: categoryId ?? null }
  });
  res.status(201).json(p);
}

export async function updateProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { name, description, price, stock, imageUrl, categoryId, promoPrice } = req.body;
  const p = await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price: price == null ? undefined : Number(price),
      stock: stock == null ? undefined : Number(stock),
      imageUrl,
      categoryId: categoryId ?? undefined,
      promoPrice: promoPrice == null ? undefined : Number(promoPrice)
    }
  });
  res.json(p);
}

export async function deleteProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.product.delete({ where: { id } });
  res.json({ message: "Removido" });
}