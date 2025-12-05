import React, { useEffect, useState } from "react";
import { cartService } from "../../services/cart.service";
import { orderService } from "../../services/order.service";

export default function Cart() {
  const [cart, setCart] = useState<any>(null);

  async function load() { setCart(await cartService.get()); }
  useEffect(() => { load(); }, []);

  async function checkout() {
    if (!confirm("Finalizar compra?")) return;
    await orderService.create();
    alert("Pedido criado!");
    load();
  }

  return (
    <div className="container">
      <h2>Carrinho</h2>
      {cart && cart.items.length > 0 ? (
        <>
          <ul>
            {cart.items.map((i:any)=>(
              <li key={i.id}>{i.product.name} x {i.quantity} - {(i.product.promoPrice ?? i.product.price).toFixed(2)}</li>
            ))}
          </ul>
          <button className="btn" onClick={checkout}>Finalizar Compra</button>
        </>
      ) : <p>Carrinho vazio</p>}
    </div>
  );
}