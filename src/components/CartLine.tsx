"use client";

import Link from "next/link";
import { MAX_QUANTITY } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/use-cart";
import type { Product } from "@/data/products";

const qtyButton =
  "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-lg transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground";

export default function CartLine({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) {
  const { setQty, remove } = useCart();

  return (
    <li className="flex flex-col gap-4 border-b border-border py-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Link
          href={`/producto/${product.slug}`}
          className="hover:text-primary"
        >
          {product.name}
        </Link>
        <p className="text-sm text-muted-foreground">
          {formatPrice(product.price)} c/u
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`Quitar una unidad de ${product.name}`}
            disabled={quantity <= 1}
            onClick={() => setQty(product.slug, quantity - 1)}
            className={qtyButton}
          >
            −
          </button>
          <span aria-live="polite" className="w-8 text-center">
            {quantity}
          </span>
          <button
            type="button"
            aria-label={`Agregar una unidad de ${product.name}`}
            disabled={quantity >= MAX_QUANTITY}
            onClick={() => setQty(product.slug, quantity + 1)}
            className={qtyButton}
          >
            +
          </button>
        </div>
        <p className="w-24 text-right text-primary">
          {formatPrice(product.price * quantity)}
        </p>
        <button
          type="button"
          onClick={() => remove(product.slug)}
          className="min-h-11 cursor-pointer px-2 text-sm underline hover:text-primary"
        >
          Quitar
        </button>
      </div>
    </li>
  );
}
