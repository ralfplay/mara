import Link from "next/link";
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
        <Link href="/carrito" aria-label="Carrito" className="hover:text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2M9 20.5h.01M17 20.5h.01"
            />
          </svg>
        </Link>
      </nav>
    </header>
  );
}
