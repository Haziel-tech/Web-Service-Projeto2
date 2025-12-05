import React, { useEffect, useState } from "react";
import { promotionService } from "../services/promotion.service";
import { Link } from "react-router-dom";

export default function PromotionList() {
  const [promos, setPromos] = useState<any[]>([]);

  async function load() {
    const res = await promotionService.list();
    setPromos(res);
  }

  useEffect(() => { load(); }, []);

  async function remove(id: number) {
    if (!confirm("Remover promoção?")) return;
    await promotionService.remove(id);
    load();
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Promoções</h2>
        <Link to="/promotions/new" className="btn">Nova Promoção</Link>
      </div>
      <table className="table">
        <thead><tr><th>Produto</th><th>Desconto %</th><th>Período</th><th>Ações</th></tr></thead>
        <tbody>
          {promos.map(p => (
            <tr key={p.id}>
              <td>{p.product?.name}</td>
              <td>{p.discountPercent}%</td>
              <td>{new Date(p.startsAt).toLocaleDateString()} - {new Date(p.endsAt).toLocaleDateString()}</td>
              <td><button className="btn btn-danger" onClick={() => remove(p.id)}>Remover</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}