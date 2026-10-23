import Link from "next/link";
import { siteConfig, whatsappUrl, instagramUrl } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-3 border-t border-border px-6 py-8 text-sm md:px-12">
      <div className="flex flex-wrap justify-center gap-6">
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
          WhatsApp
        </a>
        <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
          Instagram
        </a>
        <Link href="/envios-y-pagos" className="hover:text-primary">
          Envíos y pagos
        </Link>
      </div>
      <p>© 2026 {siteConfig.name}. Todos los derechos reservados.</p>
    </footer>
  );
}
