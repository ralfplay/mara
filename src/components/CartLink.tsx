"use client";

import Link from "next/link";
import { useCart } from "@/lib/use-cart";

export default function CartLink() {
  const { count } = useCart();

  return (
    <Link
      href="/carrito"
      aria-label={
        count > 0
          ? `Carrito, ${count} ${count === 1 ? "producto" : "productos"}`
          : "Carrito"
      }
      className="relative hover:text-primary"
    >
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
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs text-on-primary">
          {count}
        </span>
      )}
    </Link>
  );
}
