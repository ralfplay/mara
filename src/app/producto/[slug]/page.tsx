import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AddToCartButton from "@/components/AddToCartButton";
import { categories, getProduct, products } from "@/data/products";
import { formatPrice } from "@/lib/format";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/producto/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({
  params,
}: PageProps<"/producto/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const hasImage = fs.existsSync(path.join(process.cwd(), "public", product.image));
  const categoryLabel = categories.find((c) => c.slug === product.category)?.label;

  return (
    <main className="flex-1 px-6 py-12 md:px-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href={`/catalogo?categoria=${product.category}`}
          className="text-sm text-primary hover:text-secondary"
        >
          ← {categoryLabel}
        </Link>
        <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
            {hasImage && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            )}
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-primary">
              {categoryLabel}
            </p>
            <h1 className="mt-2 text-3xl font-light">{product.name}</h1>
            <p className="mt-4 text-2xl text-primary">{formatPrice(product.price)}</p>
            <p className="mt-6 text-muted-foreground">{product.description}</p>
            <p className="mt-6 text-sm">
              {product.inStock ? "Disponible" : "Agotado"}
            </p>
            <AddToCartButton slug={product.slug} inStock={product.inStock} />
          </div>
        </div>
      </div>
    </main>
  );
}
