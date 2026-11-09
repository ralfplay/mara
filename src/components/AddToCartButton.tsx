"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/use-cart";

export default function AddToCartButton({
  slug,
  inStock,
}: {
  slug: string;
  inStock: boolean;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  if (!inStock) {
    return (
      <button
        type="button"
        disabled
        className="btn cursor-not-allowed bg-muted text-muted-foreground"
      >
        Agotado
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          add(slug);
          setAdded(true);
        }}
        className="btn btn-ink font-medium"
      >
        Agregar al carrito
      </button>
      <p role="status" className="empty:hidden">
        {added && (
          <>
            Agregado.{" "}
            <Link href="/carrito" className="text-primary underline">
              Ver carrito
            </Link>
          </>
        )}
      </p>
    </>
  );
}
