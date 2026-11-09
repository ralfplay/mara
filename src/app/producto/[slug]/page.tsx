import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";
import ProductMedia from "@/components/ProductMedia";
import { categories, getProduct, products } from "@/data/products";
import { siteConfig, whatsappUrl } from "@/lib/config";
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

  const categoryLabel = categories.find((c) => c.slug === product.category)?.label;
  const [firstWord, ...restOfName] = product.name.split(" ");
  // Sugerencias: piezas disponibles de las otras categorías.
  const related = products
    .filter((p) => p.category !== product.category && p.inStock)
    .slice(0, 4);

  return (
    <main className="flex-1">
      <nav
        aria-label="Ruta"
        className="caps flex flex-wrap gap-x-2.5 px-6 pt-5 text-muted-foreground md:px-12"
      >
        <Link href="/" className="py-2.5 hover:text-primary">
          Inicio
        </Link>
        <span aria-hidden="true" className="py-2.5">
          /
        </span>
        <Link
          href={`/catalogo?categoria=${product.category}`}
          className="py-2.5 hover:text-primary"
        >
          {categoryLabel}
        </Link>
        <span aria-hidden="true" className="py-2.5">
          /
        </span>
        <span aria-current="page" className="py-2.5 text-foreground">
          {product.name}
        </span>
      </nav>

      <section className="grid items-start gap-x-16 gap-y-10 px-6 pb-24 pt-6 md:grid-cols-[1.2fr_1fr] md:px-12">
        <ProductMedia
          product={product}
          priority
          sizes="(min-width: 768px) 55vw, 100vw"
          className="aspect-square"
        />
        <div className="flex flex-col gap-6 md:pt-4">
          <p className="eyebrow text-primary">
            {categoryLabel} · {product.inStock ? "Disponible" : "Agotado"}
          </p>
          <h1 className="display text-[clamp(3rem,5.6vw,5.25rem)] leading-[0.98]">
            {firstWord}{" "}
            {restOfName.length > 0 && (
              <em className="text-primary">{restOfName.join(" ")}</em>
            )}
          </h1>
          <p className="text-[1.75rem] font-normal">{formatPrice(product.price)}</p>
          <p className="max-w-md text-lg text-muted-foreground">
            {product.description}
          </p>
          <div className="mt-2 flex flex-col gap-4">
            <AddToCartButton slug={product.slug} inStock={product.inStock} />
            <a
              href={whatsappUrl(
                `Hola ${siteConfig.name}, tengo una consulta sobre ${product.name}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Consultar por WhatsApp
            </a>
          </div>
          <dl className="mt-4 border-b border-foreground">
            <div className="flex flex-col gap-x-6 gap-y-1 border-t border-foreground py-5 sm:flex-row">
              <dt className="caps w-28 shrink-0 pt-0.5">Entrega</dt>
              <dd className="text-muted-foreground">
                Delivery en {siteConfig.city} {siteConfig.deliveryHours}, recojo
                en tienda o envío a provincia con{" "}
                {siteConfig.carriers.join(" u ")}.
              </dd>
            </div>
            <div className="flex flex-col gap-x-6 gap-y-1 border-t border-foreground py-5 sm:flex-row">
              <dt className="caps w-28 shrink-0 pt-0.5">Pago</dt>
              <dd className="text-muted-foreground">
                Yape, Plin, transferencia o efectivo. Contraentrega solo con
                delivery en {siteConfig.city}.{" "}
                <Link href="/envios-y-pagos" className="text-primary underline">
                  Ver detalle
                </Link>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {related.length > 0 && (
        <section className="flex flex-col gap-10 border-t border-border bg-card px-6 py-20 md:px-12">
          <h2 className="display text-[clamp(2.125rem,3.6vw,3.25rem)] leading-[1.05]">
            Combínalo con
          </h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
