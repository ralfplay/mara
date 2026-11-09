import { Suspense } from "react";
import type { Metadata } from "next";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/data/products";

export const metadata: Metadata = {
  title: "Catálogo",
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
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-b border-border pb-6">
        <CategoryFilter current={current} />
        <p className="caps text-muted-foreground">
          {visible.length} {visible.length === 1 ? "pieza" : "piezas"}
        </p>
      </div>
      <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </ul>
    </>
  );
}

export default function CatalogPage({ searchParams }: PageProps<"/catalogo">) {
  return (
    <main className="flex-1">
      <section className="on-ink flex flex-wrap items-end justify-between gap-x-12 gap-y-5 bg-ink px-6 pb-14 pt-16 text-on-ink md:px-12">
        <div className="flex flex-col gap-3.5">
          <p className="eyebrow text-gold">Colección completa</p>
          <h1 className="display text-[clamp(3.25rem,7vw,6.5rem)] leading-[0.95]">
            El <em className="text-gold">catálogo</em>
          </h1>
        </div>
        <p className="max-w-sm text-on-ink-muted">
          Aretes, collares y pulseras. Toca una pieza para ver el detalle y
          agregarla a tu carrito.
        </p>
      </section>
      <section className="px-6 pb-24 pt-10 md:px-12">
        <Suspense fallback={<p className="text-muted-foreground">Cargando…</p>}>
          <CatalogContent searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
}
