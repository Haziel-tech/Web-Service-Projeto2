import React, { useEffect, useState } from "react";
import { orderService } from "../../services/order.service";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);

  async function load() { setOrders(await orderService.list()); }
  useEffect(() => { load(); }, []);

  return (
    <div className="container">
      <h2>Pedidos</h2>
      <ul>
        {orders.map(o => (
          <li key={o.id}>Pedido #{o.id} - Total: {o.total.toFixed(2)} - Status:{o.status}</li>
        ))}
      </ul>
    </div>
  );
}