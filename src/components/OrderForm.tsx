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
  "block min-h-13 w-full border bg-ink px-4 py-2 text-base text-on-ink";
const label = "text-xs font-normal uppercase tracking-[0.22em] text-gold";
const border = (error?: string) => (error ? "border-[#ffb4a1]" : "border-[#8a7667]");

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="text-sm text-[#ffb4a1]">
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
    <form onSubmit={onSubmit} noValidate className="on-ink flex flex-col gap-6 bg-ink px-6 py-10 text-on-ink sm:px-10 sm:py-12">
      <h2 className="display text-[2.75rem]">Tus datos</h2>
      <p className="-mt-3 text-on-ink-muted">
        Te enviaremos el pedido por WhatsApp y ahí confirmamos el pago y el envío.
      </p>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className={label}>Nombre</label>
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

      <div className="flex flex-col gap-2">
        <label htmlFor="city" className={label}>Ciudad</label>
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
        className="flex flex-col gap-1"
        aria-describedby={errors.delivery ? "delivery-error" : undefined}
      >
        <legend className={`${label} mb-2`}>Entrega</legend>
        <div className="flex flex-col gap-1">
          {deliveryOptions.map((o) => (
            <label key={o.value} className="flex min-h-11 items-center gap-3">
              <input
                type="radio"
                name="delivery"
                value={o.value}
                className="h-5 w-5 accent-gold"
              />
              {o.label}
            </label>
          ))}
        </div>
        <FieldError id="delivery-error" message={errors.delivery} />
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="payment" className={label}>Forma de pago</label>
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
        className="btn btn-gold mt-2 w-full"
      >
        Enviar pedido por WhatsApp
      </button>

      {sentUrl && (
        <p role="status" className="text-sm">
          Se abrió WhatsApp con tu pedido. Si no se abrió,{" "}
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold underline"
          >
            toca aquí
          </a>
          .
        </p>
      )}
    </form>
  );
}
