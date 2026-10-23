import Link from "next/link";
import CartLink from "@/components/CartLink";
import { siteConfig } from "@/lib/config";

export default function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border px-6 py-5 md:px-12">
      <Link href="/" className="text-2xl font-semibold tracking-[0.3em]">
        {siteConfig.name}
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link href="/catalogo" className="hover:text-primary">
          Catálogo
        </Link>
        <Link href="/envios-y-pagos" className="hover:text-primary">
          Envíos y pagos
        </Link>
        <CartLink />
      </nav>
    </header>
  );
}
