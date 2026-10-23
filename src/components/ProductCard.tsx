import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/data/products";

// Hasta tener las fotos reales, se muestra un recuadro en vez de una imagen rota.
const hasImage = (src: string) =>
  fs.existsSync(path.join(process.cwd(), "public", src));

export default function ProductCard({ product }: { product: Product }) {
  return (
    <li>
      <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
        {hasImage(product.image) && (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover"
          />
        )}
        {!product.inStock && (
          <span className="absolute left-2 top-2 rounded-full bg-secondary px-3 py-1 text-xs text-on-primary">
            Agotado
          </span>
        )}
      </div>
      <p className="mt-3 text-sm">{product.name}</p>
      <p className="text-sm text-primary">{formatPrice(product.price)}</p>
    </li>
  );
}
