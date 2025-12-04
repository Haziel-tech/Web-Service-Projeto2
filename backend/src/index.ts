import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
import promotionRoutes from "./routes/promotion.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import { prisma } from "./prismaClient";
import bcrypt from "bcrypt";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/promotions", promotionRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

const PORT = process.env.PORT ?? 4000;

async function seedAdmin() {
  const admin = await prisma.user.findUnique({ where: { email: "admin@super.com" } });
  if (!admin) {
    const hashed = await bcrypt.hash("admin123", 10);
    await prisma.user.create({ data: { name: "Admin", email: "admin@super.com", cpf: "00000000000", password: hashed, role: "ADMIN" } });
    console.log("Usuário admin criado: admin@super.com / admin123");
  }
}

app.listen(PORT, async () => {
  await seedAdmin();
  console.log(`Server rodando em http://localhost:${PORT}`);
});