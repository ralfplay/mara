import Link from "next/link";
import { siteConfig, whatsappUrl, instagramUrl } from "@/lib/config";

const heading = "mb-2 text-xs font-normal uppercase tracking-[0.24em] text-gold";
const link = "py-2 hover:text-gold";

export default function Footer() {
  return (
    <footer className="on-ink flex flex-col gap-12 border-t border-ink-border bg-ink px-6 pb-8 pt-16 text-on-ink-muted md:px-12">
      <div className="flex flex-wrap justify-between gap-x-16 gap-y-10">
        <div className="flex min-w-64 flex-1 flex-col gap-4">
          <span className="display text-4xl tracking-[0.42em] text-on-ink">
            {siteConfig.name}
          </span>
          <p className="max-w-xs">
            Accesorios con estilo para todos los días, desde {siteConfig.city}.
          </p>
        </div>
        <div className="flex flex-col text-[0.9375rem]">
          <span className={heading}>Tienda</span>
          <Link href="/catalogo" className={link}>
            Catálogo
          </Link>
          <Link href="/envios-y-pagos" className={link}>
            Envíos y pagos
          </Link>
          <Link href="/carrito" className={link}>
            Carrito
          </Link>
        </div>
        <div className="flex flex-col text-[0.9375rem]">
          <span className={heading}>Contacto</span>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={link}>
            WhatsApp
          </a>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={link}>
            Instagram @{siteConfig.instagramUser}
          </a>
          <span className="py-2">Entregas {siteConfig.deliveryHours}</span>
        </div>
      </div>
      <p className="border-t border-ink-border pt-6 text-sm tracking-wide">
        © 2026 {siteConfig.name}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
