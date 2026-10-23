"use client";

import { useState, type FormEvent } from "react";
import { whatsappUrl } from "@/lib/config";
import { useCart } from "@/lib/use-cart";
import {
  buildOrderMessage,
  deliveryOptions,
  paymentOptions,
  validateOrder,
  type OrderErrors,
  type OrderFields,
} from "@/lib/whatsapp";

const field =
  "mt-2 block min-h-11 w-full rounded-lg border bg-card px-4 py-2 text-base";
const border = (error?: string) => (error ? "border-red-700" : "border-border");

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="mt-1 text-sm text-red-700">
      {message}
    </p>
  ) : null;
}

export default function OrderForm() {
  const { items } = useCart();
  const [errors, setErrors] = useState<OrderErrors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const fields: OrderFields = {
      name: String(data.get("name") ?? ""),
      city: String(data.get("city") ?? ""),
      delivery: String(data.get("delivery") ?? ""),
      payment: String(data.get("payment") ?? ""),
    };

    const found = validateOrder(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = (["name", "city", "delivery", "payment"] as const).find(
        (k) => found[k],
      );
      e.currentTarget
        .querySelector<HTMLElement>(`[name="${first}"]`)
        ?.focus();
      return;
    }

    const url = whatsappUrl(buildOrderMessage(items, fields));
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-12 border-t border-border pt-8">
      <h2 className="text-xl font-light">Tus datos</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Te enviaremos el pedido por WhatsApp y ahí confirmamos el pago y el envío.
      </p>

      <div className="mt-6">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`${field} ${border(errors.name)}`}
        />
        <FieldError id="name-error" message={errors.name} />
      </div>

      <div className="mt-6">
        <label htmlFor="city">Ciudad</label>
        <input
          id="city"
          name="city"
          type="text"
          autoComplete="address-level2"
          aria-invalid={Boolean(errors.city)}
          aria-describedby={errors.city ? "city-error" : undefined}
          className={`${field} ${border(errors.city)}`}
        />
        <FieldError id="city-error" message={errors.city} />
      </div>

      <fieldset
        className="mt-6"
        aria-describedby={errors.delivery ? "delivery-error" : undefined}
      >
        <legend>Entrega</legend>
        <div className="mt-2 flex flex-col gap-1">
          {deliveryOptions.map((o) => (
            <label key={o.value} className="flex min-h-11 items-center gap-3">
              <input
                type="radio"
                name="delivery"
                value={o.value}
                className="h-5 w-5 accent-primary"
              />
              {o.label}
            </label>
          ))}
        </div>
        <FieldError id="delivery-error" message={errors.delivery} />
      </fieldset>

      <div className="mt-6">
        <label htmlFor="payment">Forma de pago</label>
        <select
          id="payment"
          name="payment"
          defaultValue=""
          aria-invalid={Boolean(errors.payment)}
          aria-describedby={errors.payment ? "payment-error" : undefined}
          className={`${field} ${border(errors.payment)}`}
        >
          <option value="" disabled>
            Elige una opción
          </option>
          {paymentOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <FieldError id="payment-error" message={errors.payment} />
      </div>

      <button
        type="submit"
        className="mt-8 min-h-11 w-full cursor-pointer rounded-full bg-primary px-8 py-3 text-on-primary transition hover:bg-secondary"
      >
        Enviar pedido por WhatsApp
      </button>

      {sentUrl && (
        <p role="status" className="mt-4 text-sm">
          Se abrió WhatsApp con tu pedido. Si no se abrió,{" "}
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            toca aquí
          </a>
          .
        </p>
      )}
    </form>
  );
}
