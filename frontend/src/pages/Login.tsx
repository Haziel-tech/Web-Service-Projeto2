import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("admin@super.com");
  const [password, setPassword] = useState("admin123");
  const { login } = useAuth();
  const nav = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(email, password);
      nav("/dashboard");
    } catch (err) {
      alert("Erro no login");
    }
  }

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h2>Login</h2>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <input className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
        <button className="btn" type="submit">Entrar</button>
      </form>
    </div>
  );
}