import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import ProductArt from "@/components/ProductArt";
import type { Product } from "@/data/products";

// Hasta tener las fotos reales, se muestra un dibujo de línea en vez de una imagen rota.
const hasImage = (src: string) =>
  fs.existsSync(path.join(process.cwd(), "public", src));

export default function ProductMedia({
  product,
  sizes,
  priority = false,
  className = "aspect-[4/5]",
}: {
  product: Product;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-ink-soft ${className}`}
    >
      {hasImage(product.image) ? (
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <ProductArt slug={product.slug} category={product.category} />
      )}
      {!product.inStock && (
        <span className="absolute left-3 top-3 bg-background px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-foreground">
          Agotado
        </span>
      )}
    </div>
  );
}
