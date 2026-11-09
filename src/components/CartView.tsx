"use client";

import Link from "next/link";
import CartLine from "@/components/CartLine";
import OrderForm from "@/components/OrderForm";
import { cartTotal } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/use-cart";
import { getProduct } from "@/data/products";

export default function CartView() {
  const { ready, items } = useCart();

  if (!ready) return null;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-start gap-6 border-t border-foreground pt-8">
        <p className="text-lg text-muted-foreground">Tu carrito está vacío.</p>
        <Link href="/catalogo" className="btn btn-ink">
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-[1.3fr_1fr]">
      <div className="flex flex-col gap-6">
        <ul>
          {items.map((item) => {
            const product = getProduct(item.slug);
            return product ? (
              <CartLine key={item.slug} product={product} quantity={item.quantity} />
            ) : null;
          })}
        </ul>
        <p className="flex items-baseline justify-between gap-6 border-y border-foreground py-7">
          <span className="caps tracking-[0.24em]">Total</span>
          <span className="display text-5xl">{formatPrice(cartTotal(items))}</span>
        </p>
        <p className="text-muted-foreground">
          El costo de envío se coordina por WhatsApp según tu destino.
        </p>
        <Link
          href="/catalogo"
          className="caps self-start border-b border-primary pb-1.5 pt-3 text-primary hover:border-secondary hover:text-secondary"
        >
          ← Seguir comprando
        </Link>
      </div>
      <OrderForm />
    </div>
  );
}
