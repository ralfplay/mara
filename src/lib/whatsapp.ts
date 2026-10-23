import { cartTotal, type CartItem } from "@/lib/cart";
import { siteConfig } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import { getProduct } from "@/data/products";

export const deliveryOptions = [
  { value: "delivery", label: "Delivery en la ciudad" },
  { value: "provincia", label: "Envío a provincia" },
  { value: "recojo", label: "Recojo en tienda" },
] as const;

export const paymentOptions = [
  { value: "yape", label: "Yape" },
  { value: "plin", label: "Plin" },
  { value: "transferencia", label: "Transferencia" },
  { value: "contraentrega", label: "Contraentrega" },
  { value: "efectivo", label: "Efectivo" },
] as const;

export type DeliveryValue = (typeof deliveryOptions)[number]["value"];
export type PaymentValue = (typeof paymentOptions)[number]["value"];

export type OrderFields = {
  name: string;
  city: string;
  delivery: string;
  payment: string;
};

export type OrderErrors = Partial<Record<keyof OrderFields, string>>;

const clean = (s: string) => s.replace(/\s+/g, " ").trim();

export function validateOrder(fields: OrderFields): OrderErrors {
  const errors: OrderErrors = {};
  if (!clean(fields.name)) errors.name = "Escribe tu nombre.";
  if (!clean(fields.city)) errors.city = "Escribe tu ciudad.";
  if (!deliveryOptions.some((o) => o.value === fields.delivery))
    errors.delivery = "Elige cómo quieres recibir tu pedido.";
  if (!paymentOptions.some((o) => o.value === fields.payment))
    errors.payment = "Elige tu forma de pago.";
  return errors;
}

export function buildOrderMessage(items: CartItem[], fields: OrderFields) {
  const lines = items.flatMap((i) => {
    const p = getProduct(i.slug);
    return p
      ? [`• ${i.quantity} x ${p.name} - ${formatPrice(p.price * i.quantity)}`]
      : [];
  });
  const delivery = deliveryOptions.find((o) => o.value === fields.delivery)?.label;
  const payment = paymentOptions.find((o) => o.value === fields.payment)?.label;

  return [
    `Hola ${siteConfig.name}, quiero hacer este pedido:`,
    "",
    ...lines,
    "",
    `Total: ${formatPrice(cartTotal(items))}`,
    "",
    `Nombre: ${clean(fields.name)}`,
    `Ciudad: ${clean(fields.city)}`,
    `Entrega: ${delivery}`,
    `Pago: ${payment}`,
  ].join("\n");
}
