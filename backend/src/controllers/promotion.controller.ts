import { Request, Response } from "express";
import { prisma } from "../prismaClient";

export async function listPromotions(req: Request, res: Response) {
  const promos = await prisma.promotion.findMany({ include: { product: true } });
  res.json(promos);
}

export async function createPromotion(req: Request, res: Response) {
  const { productId, discountPercent, startsAt, endsAt } = req.body;
  if (!productId || discountPercent == null || !startsAt || !endsAt) return res.status(400).json({ message: "Dados incompletos" });
  const promo = await prisma.promotion.create({
    data: {
      productId: Number(productId),
      discountPercent: Number(discountPercent),
      startsAt: new Date(startsAt),
      endsAt: new Date(endsAt)
    }
  });

  // Atualiza promoPrice do produto
  const product = await prisma.product.findUnique({ where: { id: Number(productId) } });
  if (product) {
    const promoPrice = Number((product.price * (1 - Number(discountPercent) / 100)).toFixed(2));
    await prisma.product.update({ where: { id: product.id }, data: { promoPrice } });
  }

  res.status(201).json(promo);
}

export async function deletePromotion(req: Request, res: Response) {
  const id = Number(req.params.id);
  const promo = await prisma.promotion.findUnique({ where: { id } });
  if (!promo) return res.status(404).json({ message: "Promoção não encontrada" });

  await prisma.product.update({ where: { id: promo.productId }, data: { promoPrice: null } });
  await prisma.promotion.delete({ where: { id } });
  res.json({ message: "Removida" });
}