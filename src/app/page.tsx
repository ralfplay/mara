import Link from "next/link";
import ProductArt from "@/components/ProductArt";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/data/products";
import { instagramUrl, siteConfig, whatsappUrl } from "@/lib/config";

const featured = products.slice(0, 4);

const steps = [
  {
    title: "Elige tus piezas",
    text: "Explora el catálogo y agrega al carrito lo que te guste.",
  },
  {
    title: "Envía tu pedido por WhatsApp",
    text: "Completa tus datos y se abre el chat con el resumen listo para enviar.",
  },
  {
    title: "Recíbelo donde estés",
    text: `Delivery en ${siteConfig.city} ${siteConfig.deliveryHours}, recojo en tienda o envío con ${siteConfig.carriers.join(" u ")}.`,
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <section className="on-ink flex flex-wrap items-center gap-x-16 gap-y-12 bg-ink px-6 pt-16 text-on-ink md:px-12 md:pt-20">
        <div className="flex min-w-0 flex-[1_1_26rem] flex-col gap-7 pb-4 md:pb-20">
          <p className="eyebrow text-gold">Nueva colección · {siteConfig.city}</p>
          <h1 className="display text-[clamp(3rem,7vw,6.5rem)] leading-[0.98]">
            Detalles que <em className="text-gold">se quedan</em> contigo.
          </h1>
          <p className="max-w-md text-lg text-on-ink-muted">
            Aretes, collares y pulseras para todos los días. Elige tus piezas y
            haz tu pedido por WhatsApp en un minuto.
          </p>
          <div className="mt-2 flex flex-wrap gap-4">
            <Link href="/catalogo" className="btn btn-gold">
              Ver catálogo
            </Link>
            <a
              href={whatsappUrl(`Hola ${siteConfig.name}, tengo una consulta.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-gold"
            >
              Escríbenos
            </a>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="flex min-w-0 flex-[1_1_20rem] items-end justify-center gap-4 md:gap-6"
        >
          <div className="flex h-[22rem] w-full max-w-[26rem] items-center justify-center rounded-t-full border border-b-0 border-gold bg-[#2a1e17] lg:h-[37rem]">
            <svg
              viewBox="0 0 240 240"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="h-auto w-3/5 text-gold"
            >
              <circle cx="120" cy="120" r="44" />
              <circle cx="120" cy="120" r="64" strokeDasharray="2 6" />
              <circle cx="120" cy="120" r="100" strokeOpacity="0.4" />
              <path d="M120 20v24M120 196v24M20 120h24M196 120h24M49 49l17 17M174 174l17 17M191 49l-17 17M66 174l-17 17" />
            </svg>
          </div>
          <div className="flex h-56 w-2/5 max-w-[11rem] items-center justify-center rounded-t-full bg-primary lg:h-96">
            <svg
              viewBox="0 0 120 120"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="h-auto w-3/5 text-on-ink"
            >
              <path d="M74 28a34 34 0 1 0 0 64a40 40 0 0 1 0-64Z" />
            </svg>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-12 px-6 py-20 md:px-12 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <h2 className="display text-[clamp(2.375rem,4.4vw,4rem)]">
            Tres formas de <em className="text-primary">brillar</em>
          </h2>
          <p className="max-w-sm text-muted-foreground">
            Cada categoría reúne piezas livianas, fáciles de combinar y pensadas
            para usarse a diario.
          </p>
        </div>
        <ul className="grid gap-7 sm:grid-cols-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/catalogo?categoria=${c.slug}`}
                className="group flex flex-col gap-5"
              >
                <div className="flex h-72 items-center justify-center rounded-t-full bg-ink-soft md:h-[28rem]">
                  <ProductArt
                    category={c.slug}
                    className="w-[46%] transition duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-foreground pb-3.5">
                  <span className="display text-[2.125rem]">{c.label}</span>
                  <span className="caps text-primary">
                    {products.filter((p) => p.category === c.slug).length} piezas →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-12 border-y border-border bg-card px-6 py-20 md:px-12 md:py-24">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <div className="flex flex-col gap-2.5">
            <p className="eyebrow text-primary">Destacados</p>
            <h2 className="display text-[clamp(2.125rem,3.6vw,3.25rem)] leading-[1.05]">
              Los favoritos de la temporada
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="caps border-b border-primary pb-1.5 pt-3 text-primary hover:border-secondary hover:text-secondary"
          >
            Ver todo el catálogo
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </ul>
      </section>

      <section className="flex flex-wrap gap-x-20 gap-y-12 px-6 py-20 md:px-12 md:py-24">
        <div className="flex flex-[1_1_20rem] flex-col gap-5">
          <p className="eyebrow text-primary">Cómo pedir</p>
          <h2 className="display text-[clamp(2.375rem,4.4vw,4rem)]">
            Simple, como debe ser.
          </h2>
          <p className="max-w-sm text-muted-foreground">
            Sin registros ni contraseñas. Armas tu carrito y nos envías el
            pedido por WhatsApp; ahí coordinamos el pago y la entrega.
          </p>
          <Link
            href="/envios-y-pagos"
            className="caps self-start border-b border-primary pb-1.5 pt-3 text-primary hover:border-secondary hover:text-secondary"
          >
            Ver envíos y pagos
          </Link>
        </div>
        <ol className="flex flex-[2_1_30rem] flex-col border-b border-foreground">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-6 border-t border-foreground py-7 md:gap-8">
              <span
                aria-hidden="true"
                className="display w-14 shrink-0 text-[2.75rem] italic text-primary"
              >
                0{i + 1}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="display text-[1.75rem] font-medium leading-tight">
                  {s.title}
                </h3>
                <p className="text-muted-foreground">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="on-primary flex flex-col items-center gap-6 bg-primary px-6 py-20 text-center text-on-primary md:px-12">
        <p className="eyebrow">Síguenos</p>
        <h2 className="display break-all text-[clamp(2.25rem,5.4vw,5rem)] italic">
          @{siteConfig.instagramUser}
        </h2>
        <p className="max-w-md">
          Novedades, combinaciones y piezas nuevas en nuestro Instagram.
        </p>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn mt-2 bg-ink text-on-ink hover:bg-secondary"
        >
          Ver Instagram
        </a>
      </section>
    </main>
  );
}
