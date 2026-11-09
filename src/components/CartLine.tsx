"use client";

import Link from "next/link";
import ProductArt from "@/components/ProductArt";
import { MAX_QUANTITY } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/use-cart";
import type { Product } from "@/data/products";

const qtyButton =
  "flex h-full w-11 cursor-pointer items-center justify-center text-xl transition hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-foreground";

export default function CartLine({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) {
  const { setQty, remove } = useCart();

  return (
    <li className="flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-foreground py-6">
      <div
        aria-hidden="true"
        className="flex h-28 w-24 shrink-0 items-center justify-center bg-ink-soft"
      >
        <ProductArt slug={product.slug} category={product.category} className="w-3/5" />
      </div>
      <div className="flex min-w-40 flex-1 flex-col gap-1">
        <Link
          href={`/producto/${product.slug}`}
          className="display text-3xl leading-tight hover:text-primary"
        >
          {product.name}
        </Link>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {formatPrice(product.price)} c/u
        </p>
        <button
          type="button"
          aria-label={`Quitar ${product.name} del carrito`}
          onClick={() => remove(product.slug)}
          className="min-h-11 cursor-pointer self-start text-sm underline hover:text-primary"
        >
          Quitar
        </button>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex h-12 items-center border border-foreground">
          <button
            type="button"
            aria-label={`Quitar una unidad de ${product.name}`}
            disabled={quantity <= 1}
            onClick={() => setQty(product.slug, quantity - 1)}
            className={qtyButton}
          >
            −
          </button>
          <span aria-live="polite" className="w-9 text-center font-normal">
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
        <p className="w-24 text-right text-lg font-normal">
          {formatPrice(product.price * quantity)}
        </p>
      </div>
    </li>
  );
}
