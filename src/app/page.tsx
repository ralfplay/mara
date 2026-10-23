import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/data/products";

const featured = products.slice(0, 4);

export default function Home() {
  return (
    <main className="flex-1">
      <section className="px-6 py-24 text-center md:px-12 md:py-36">
        <p className="mb-4 text-sm uppercase tracking-widest text-primary">
          Nueva colección
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-light leading-tight md:text-6xl">
          Accesorios con estilo para todos los días
        </h1>
        <Link
          href="/catalogo"
          className="mt-10 inline-block rounded-full bg-primary px-8 py-3 text-sm text-on-primary transition hover:bg-secondary"
        >
          Ver catálogo
        </Link>
      </section>

      <section className="px-6 pb-16 md:px-12">
        <h2 className="mb-8 text-center text-2xl font-light">Categorías</h2>
        <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/catalogo?categoria=${c.slug}`}
                className="block rounded-lg border border-border bg-card px-6 py-8 text-center transition hover:border-primary hover:text-primary"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-6 pb-24 md:px-12">
        <h2 className="mb-8 text-center text-2xl font-light">Destacados</h2>
        <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </ul>
      </section>
    </main>
  );
}
