import { AuthRequest } from "../middlewares/auth";
import { prisma } from "../prismaClient";
import { Response } from "express";

export async function createOrder(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const cart = await prisma.cart.findUnique({ where: { userId }, include: { items: { include: { product: true } } } });
  if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Carrinho vazio" });

  let total = 0;
  const itemsData = cart.items.map((ci: { product: { promoPrice: any; price: any; }; quantity: number; productId: any; }) => {
    const price = ci.product.promoPrice ?? ci.product.price;
    total += price * ci.quantity;
    return {
      productId: ci.productId,
      quantity: ci.quantity,
      price
    };
  });

  const order = await prisma.order.create({
    data: {
      userId,
      total,
      items: { create: itemsData },
      status: "PAID"
    },
    include: { items: true }
  });

  // esvazia carrinho
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  res.status(201).json(order);
}

export async function listOrders(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user!.role === "ADMIN") {
    const all = await prisma.order.findMany({ include: { items: true, user: true } });
    return res.json(all);
  }
  const orders = await prisma.order.findMany({ where: { userId }, include: { items: true } });
  res.json(orders);
}