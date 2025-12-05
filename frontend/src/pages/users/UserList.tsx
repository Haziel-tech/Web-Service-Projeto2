import React, { useEffect, useState } from "react";
import { userService } from "../../services/user.service";

export default function UserList() {
  const [users, setUsers] = useState<any[]>([]);

  async function load() { setUsers(await userService.list()); }
  useEffect(() => { load(); }, []);

  return (
    <div className="container">
      <h2>Usuários</h2>
      <table className="table">
        <thead><tr><th>Nome</th><th>Email</th><th>CPF</th><th>Role</th></tr></thead>
        <tbody>
          {users.map(u => <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.cpf}</td><td>{u.role}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}