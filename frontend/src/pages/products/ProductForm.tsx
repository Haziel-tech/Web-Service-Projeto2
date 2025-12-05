import React, { useEffect, useState } from "react";
import { productService, ProductDTO } from "../../services/product.service";
import { categoryService } from "../../services/category.service";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState<ProductDTO>({ name: "", price: 0, description: "", stock: 0 });
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    categoryService.list().then(r => setCategories(r));
    if (id) {
      productService.get(Number(id)).then(p => setForm(p));
    }
  }, [id]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (id) await productService.update(Number(id), form);
    else await productService.create(form);
    nav("/products");
  }

  return (
    <div className="container">
      <h2>{id ? "Editar" : "Novo"} Produto</h2>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <input className="input" placeholder="Nome" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="input" type="number" placeholder="Preço" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
        <input className="input" type="number" placeholder="Estoque" value={form.stock} onChange={e => setForm({ ...form, stock: Number(e.target.value) })} />
        <select className="input" value={(form as any).categoryId ?? ""} onChange={e => setForm({ ...form, categoryId: e.target.value ? Number(e.target.value) : undefined })}>
          <option value="">Sem categoria</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <textarea className="input" placeholder="Descrição" value={form.description ?? ""} onChange={e => setForm({ ...form, description: e.target.value })} />
        <div>
          <button className="btn" type="submit">Salvar</button>
          <button className="btn btn-ghost" type="button" onClick={() => nav("/products")}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}