import React, { useEffect, useState } from "react";
import { productService, ProductDTO } from "../../services/product.service";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ProductList() {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const nav = useNavigate();
  const { user } = useAuth();

  async function load() {
    const res = await productService.list();
    setProducts(res);
  }

  useEffect(() => { load(); }, []);

  async function remove(id?: number) {
    if (!id) return;
    if (!confirm("Remover produto?")) return;
    await productService.remove(id);
    load();
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Produtos</h2>
        <div>
          <Link to="/products/new" className="btn">Novo Produto</Link>
        </div>
      </div>

      <table className="table">
        <thead><tr><th>Nome</th><th>Preço</th><th>Promo</th><th>Estoque</th><th>Ações</th></tr></thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price.toFixed(2)}</td>
              <td>{p.promoPrice ? p.promoPrice.toFixed(2) : "-"}</td>
              <td>{p.stock}</td>
              <td>
                <button className="btn" onClick={() => nav(`/products/edit/${p.id}`)}>Editar</button>{" "}
                {user?.role === "ADMIN" && <button className="btn btn-danger" onClick={() => remove(p.id)}>Remover</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}