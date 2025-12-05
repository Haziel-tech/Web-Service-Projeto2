import React, { useEffect, useState } from "react";
import { promotionService } from "../../services/promotion.service";
import { productService } from "../../services/product.service";
import { useNavigate } from "react-router-dom";

export default function PromotionForm() {
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({ productId: 0, discountPercent: 0, startsAt: "", endsAt: "" });
  const nav = useNavigate();

  useEffect(() => { productService.list().then(r => setProducts(r)); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await promotionService.create(form as any);
    nav("/promotions");
  }

  return (
    <div className="container">
      <h2>Nova Promoção</h2>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <select className="input" onChange={e => setForm({ ...form, productId: Number(e.target.value) })}>
          <option value={0}>Selecione produto</option>
          {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <input className="input" type="number" placeholder="Desconto %" onChange={e => setForm({ ...form, discountPercent: Number(e.target.value) })} />
        <input className="input" type="date" onChange={e => setForm({ ...form, startsAt: e.target.value })} />
        <input className="input" type="date" onChange={e => setForm({ ...form, endsAt: e.target.value })} />
        <button className="btn" type="submit">Criar Promoção</button>
      </form>
    </div>
  );
}