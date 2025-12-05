import React, { useEffect, useState } from "react";
import { categoryService } from "../../services/category.service";

export default function CategoryList() {
  const [cats, setCats] = useState<any[]>([]);
  const [name, setName] = useState("");

  async function load() { setCats(await categoryService.list()); }
  useEffect(() => { load(); }, []);

  async function create() {
    if (!name) return alert("Nome requerido");
    await categoryService.create({ name });
    setName("");
    load();
  }

  async function remove(id: number) {
    if (!confirm("Remover categoria?")) return;
    await categoryService.remove(id);
    load();
  }

  return (
    <div className="container">
      <h2>Categorias</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Nova categoria" />
        <button className="btn" onClick={create}>Criar</button>
      </div>

      <ul>
        {cats.map(c => <li key={c.id}>{c.name} <button className="btn btn-danger" onClick={() => remove(c.id)}>Remover</button></li>)}
      </ul>
    </div>
  );
}