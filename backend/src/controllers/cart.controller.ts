import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { AuthRequest } from "../middlewares/auth";

export async function getCart(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  let cart = await prisma.cart.findUnique({ where: { userId }, include: { items: { include: { product: true } } } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId }, include: { items: { include: { product: true } } } });
  }
  res.json(cart);
}

export async function addToCart(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const { productId, quantity } = req.body;
  if (!productId) return res.status(400).json({ message: "productId requerido" });

  let cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) cart = await prisma.cart.create({ data: { userId } });

  const existing = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId: Number(productId) } });
  if (existing) {
    await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: existing.quantity + (quantity ?? 1) } });
  } else {
    await prisma.cartItem.create({ data: { cartId: cart.id, productId: Number(productId), quantity: quantity ?? 1 } });
  }

  const updated = await prisma.cart.findUnique({ where: { id: cart.id }, include: { items: { include: { product: true } } } });
  res.json(updated);
}

export async function removeFromCart(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const { itemId } = req.params;
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) return res.status(404).json({ message: "Carrinho não encontrado" });
  await prisma.cartItem.delete({ where: { id: Number(itemId) } });
  const updated = await prisma.cart.findUnique({ where: { id: cart.id }, include: { items: { include: { product: true } } } });
  res.json(updated);
}