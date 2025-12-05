import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="container">
      <div className="header">
        <h2>Dashboard</h2>
        <div>
          <span style={{ marginRight: 8 }}>{user?.name} ({user?.role})</span>
          <button className="btn" onClick={() => logout()}>Sair</button>
        </div>
      </div>

      <div className="nav" style={{ marginBottom: 16 }}>
        <Link to="/products" className="btn">Produtos</Link>
        <Link to="/categories" className="btn">Categorias</Link>
        <Link to="/promotions" className="btn">Promoções</Link>
        <Link to="/users" className="btn">Usuários</Link>
        <Link to="/cart" className="btn">Carrinho</Link>
        <Link to="/orders" className="btn">Pedidos</Link>
      </div>

      <div>
        <h3>Visão rápida</h3>
        <p>Este dashboard é um ponto de partida. Você pode criar uma página administrativa com gráficos de vendas e estoque.</p>
      </div>
    </div>
  );
}