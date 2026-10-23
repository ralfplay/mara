"use client";

import { useState } from "react";
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
        className="mt-8 cursor-not-allowed rounded-full bg-muted px-8 py-3 text-sm text-muted-foreground"
      >
        Agotado
      </button>
    );
  }

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => {
          add(slug);
          setAdded(true);
        }}
        className="cursor-pointer rounded-full bg-primary px-8 py-3 text-sm text-on-primary transition hover:bg-secondary"
      >
        Agregar al carrito
      </button>
      <p role="status" className="mt-3 text-sm text-primary">
        {added ? "Agregado. Puedes verlo en el carrito." : ""}
      </p>
    </div>
  );
}
