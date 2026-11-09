import type { Metadata } from "next";
import { instagramUrl, siteConfig, whatsappUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "Envíos y pagos",
  description: `Formas de pago, delivery en ${siteConfig.city} y envíos a provincias con ${siteConfig.carriers.join(" y ")}.`,
};

const payments = [
  {
    name: "Yape y Plin",
    text: "Te enviamos el número por WhatsApp y nos mandas la captura del pago.",
  },
  {
    name: "Transferencia",
    text: "Te pasamos los datos de la cuenta por WhatsApp para que hagas el depósito.",
  },
  {
    name: "Contraentrega",
    text: `Solo con delivery en ${siteConfig.city}: pagas al recibir tu pedido. Lo confirmamos por WhatsApp.`,
  },
  {
    name: "Efectivo",
    text: "Pagas en efectivo al recibir el pedido o al recogerlo en tienda.",
  },
];

const shipping = [
  {
    name: `Delivery en ${siteConfig.city}`,
    text: `Entregamos ${siteConfig.deliveryHours}. Coordinamos por WhatsApp la zona y el costo.`,
  },
  {
    name: "Envío a provincias",
    text: `Enviamos a todo el país con ${siteConfig.carriers.join(" u ")}. Coordinamos por WhatsApp el costo y el tiempo de llegada según tu destino.`,
  },
  {
    name: "Recojo en tienda",
    text: "Te avisamos por WhatsApp cuando tu pedido esté listo para recoger.",
  },
];

const steps = [
  "Elige tus productos y agrégalos al carrito.",
  "Completa tus datos y envía el pedido por WhatsApp.",
  "Confirmamos disponibilidad, envío y forma de pago contigo.",
  "Pagas y coordinamos la entrega de tu pedido.",
];

function Section({
  title,
  items,
}: {
  title: string;
  items: { name: string; text: string }[];
}) {
  return (
    <section className="flex flex-wrap gap-x-20 gap-y-6">
      <h2 className="display flex-[1_1_16rem] text-[clamp(2.125rem,3.6vw,3.25rem)] leading-[1.05]">
        {title}
      </h2>
      <ul className="flex-[2_1_30rem] border-b border-foreground">
        {items.map((i) => (
          <li
            key={i.name}
            className="flex flex-col gap-x-8 gap-y-1 border-t border-foreground py-5 sm:flex-row"
          >
            <h3 className="caps w-48 shrink-0 pt-0.5">{i.name}</h3>
            <p className="text-muted-foreground">{i.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ShippingAndPaymentsPage() {
  return (
    <main className="flex-1">
      <section className="on-ink flex flex-wrap items-end justify-between gap-x-12 gap-y-5 bg-ink px-6 pb-14 pt-16 text-on-ink md:px-12">
        <div className="flex flex-col gap-3.5">
          <p className="eyebrow text-gold">Información</p>
          <h1 className="display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95]">
            Envíos y <em className="text-gold">pagos</em>
          </h1>
        </div>
        <p className="max-w-sm text-on-ink-muted">
          Todos los pedidos se confirman por WhatsApp. No cobramos nada en la
          web.
        </p>
      </section>

      <div className="flex flex-col gap-20 px-6 py-20 md:px-12">
        <section className="flex flex-wrap gap-x-20 gap-y-6">
          <h2 className="display flex-[1_1_16rem] text-[clamp(2.125rem,3.6vw,3.25rem)] leading-[1.05]">
            Cómo comprar
          </h2>
          <ol className="flex-[2_1_30rem] border-b border-foreground">
            {steps.map((s, i) => (
              <li
                key={s}
                className="flex items-baseline gap-6 border-t border-foreground py-5"
              >
                <span
                  aria-hidden="true"
                  className="display w-12 shrink-0 text-4xl italic text-primary"
                >
                  0{i + 1}
                </span>
                <span className="text-lg">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <Section title="Formas de pago" items={payments} />
        <Section title="Entregas" items={shipping} />
      </div>

      <section className="on-primary flex flex-col items-center gap-5 bg-primary px-6 py-20 text-center text-on-primary md:px-12">
        <h2 className="display text-[clamp(2.375rem,4.4vw,4rem)] italic">
          ¿Tienes dudas?
        </h2>
        <p>Escríbenos y te ayudamos con tu pedido.</p>
        <div className="mt-2 flex flex-wrap justify-center gap-4">
          <a
            href={whatsappUrl("Hola MARA, tengo una consulta.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-ink text-on-ink hover:bg-secondary"
          >
            Escribir por WhatsApp
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn border border-on-primary hover:bg-on-primary hover:text-primary"
          >
            Ver Instagram
          </a>
        </div>
      </section>
    </main>
  );
}
