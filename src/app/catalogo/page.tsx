import { Suspense } from "react";
import type { Metadata } from "next";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/data/products";

export const metadata: Metadata = {
  title: "Catálogo | MARA",
  description: "Aretes, collares y pulseras MARA.",
};

async function CatalogContent({
  searchParams,
}: {
  searchParams: PageProps<"/catalogo">["searchParams"];
}) {
  const { categoria } = await searchParams;
  const value = Array.isArray(categoria) ? categoria[0] : categoria;
  // Una categoría inexistente se ignora y se muestran todos los productos.
  const current = categories.find((c) => c.slug === value)?.slug;
  const visible = current
    ? products.filter((p) => p.category === current)
    : products;

  return (
    <>
      <CategoryFilter current={current} />
      <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
        {visible.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </ul>
    </>
  );
}

export default function CatalogPage({ searchParams }: PageProps<"/catalogo">) {
  return (
    <main className="flex-1 px-6 py-12 md:px-12">
      <h1 className="mb-8 text-center text-3xl font-light">Catálogo</h1>
      <Suspense
        fallback={<p className="text-center text-muted-foreground">Cargando…</p>}
      >
        <CatalogContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
