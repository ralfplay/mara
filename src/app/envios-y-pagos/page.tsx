import type { Metadata } from "next";
import { instagramUrl, whatsappUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "Envíos y pagos",
  description:
    "Formas de pago, delivery en la ciudad y envíos a provincias de MARA.",
};

// TODO: reemplazar las descripciones de ejemplo por los datos reales de la tienda
// (zonas de delivery, empresa y tiempos de envío a provincias, datos de pago).
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
    text: "Pagas al recibir tu pedido, según la zona. Lo confirmamos por WhatsApp.",
  },
  {
    name: "Efectivo",
    text: "Pagas en efectivo al recibir el pedido o al recogerlo en tienda.",
  },
];

const shipping = [
  {
    name: "Delivery en la ciudad",
    text: "Coordinamos por WhatsApp la zona, el costo y el horario de entrega.",
  },
  {
    name: "Envío a provincias",
    text: "Enviamos a todo el país. Coordinamos por WhatsApp la empresa de transporte, el costo y el tiempo de llegada.",
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
    <section className="mt-12">
      <h2 className="text-2xl font-light">{title}</h2>
      <ul className="mt-4 divide-y divide-border border-y border-border">
        {items.map((i) => (
          <li key={i.name} className="py-4">
            <h3 className="text-primary">{i.name}</h3>
            <p className="mt-1 text-muted-foreground">{i.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ShippingAndPaymentsPage() {
  return (
    <main className="flex-1 px-6 py-12 md:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center text-3xl font-light">Envíos y pagos</h1>
        <p className="mt-4 text-center text-muted-foreground">
          Todos los pedidos se confirman por WhatsApp. No cobramos nada en la
          web.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-light">Cómo comprar</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-6">
            {steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </section>

        <Section title="Formas de pago" items={payments} />
        <Section title="Entregas" items={shipping} />

        <section className="mt-12 text-center">
          <h2 className="text-2xl font-light">¿Tienes dudas?</h2>
          <p className="mt-2 text-muted-foreground">
            Escríbenos y te ayudamos con tu pedido.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href={whatsappUrl("Hola MARA, tengo una consulta.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full bg-primary px-8 text-sm text-on-primary transition hover:bg-secondary"
            >
              Escribir por WhatsApp
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-primary px-8 text-sm text-primary transition hover:bg-primary hover:text-on-primary"
            >
              Ver Instagram
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
