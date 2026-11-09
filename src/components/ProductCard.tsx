import Link from "next/link";
import ProductMedia from "@/components/ProductMedia";
import { formatPrice } from "@/lib/format";
import { categories, type Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const categoryLabel = categories.find((c) => c.slug === product.category)?.label;

  return (
    <li className="group relative flex flex-col gap-3">
      <ProductMedia
        product={product}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
      />
      <div className="flex items-baseline justify-between gap-3">
        <Link
          href={`/producto/${product.slug}`}
          className="display text-2xl leading-tight transition group-hover:text-primary after:absolute after:inset-0"
        >
          {product.name}
        </Link>
        <p className="whitespace-nowrap font-normal">{formatPrice(product.price)}</p>
      </div>
      <p className="-mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {categoryLabel}
      </p>
    </li>
  );
}
