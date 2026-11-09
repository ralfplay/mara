import Link from "next/link";
import CartLink from "@/components/CartLink";
import { instagramUrl, siteConfig } from "@/lib/config";

export default function Header() {
  return (
    <>
      <p className="on-primary bg-primary px-5 py-2.5 text-center text-xs font-normal uppercase tracking-[0.14em] text-on-primary">
        Contraentrega en {siteConfig.city} · Envíos a todo el país con{" "}
        {siteConfig.carriers.join(" y ")}
      </p>
      <header className="on-ink grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 border-b border-ink-border bg-ink px-6 py-4 text-on-ink md:grid-cols-[1fr_auto_1fr] md:px-12 md:py-5">
        <Link
          href="/"
          aria-label={`${siteConfig.name}, inicio`}
          className="display pl-[0.42em] text-3xl font-medium tracking-[0.42em] hover:text-gold md:order-2 md:text-[2.125rem]"
        >
          {siteConfig.name}
        </Link>
        <div className="caps flex items-center justify-end gap-8 md:order-3">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden py-3 hover:text-gold md:block"
          >
            Instagram
          </a>
          <CartLink />
        </div>
        <nav
          aria-label="Principal"
          className="caps col-span-2 flex gap-8 md:order-1 md:col-span-1"
        >
          <Link href="/catalogo" className="py-3 hover:text-gold">
            Catálogo
          </Link>
          <Link href="/envios-y-pagos" className="py-3 hover:text-gold">
            Envíos y pagos
          </Link>
        </nav>
      </header>
    </>
  );
}
