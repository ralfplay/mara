"use client";

import Link from "next/link";
import CartLine from "@/components/CartLine";
import { cartTotal } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/use-cart";
import { getProduct } from "@/data/products";

export default function CartView() {
  const { ready, items } = useCart();

  if (!ready) return null;

  if (items.length === 0) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">Tu carrito está vacío.</p>
        <Link
          href="/catalogo"
          className="mt-6 inline-block rounded-full bg-primary px-8 py-3 text-sm text-on-primary transition hover:bg-secondary"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <ul className="border-t border-border">
        {items.map((item) => {
          const product = getProduct(item.slug);
          return product ? (
            <CartLine key={item.slug} product={product} quantity={item.quantity} />
          ) : null;
        })}
      </ul>
      <p className="mt-6 flex justify-between text-lg">
        <span>Total</span>
        <span className="text-primary">{formatPrice(cartTotal(items))}</span>
      </p>
    </div>
  );
}
