import type { Metadata } from "next";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Revisa tu pedido y envíalo por WhatsApp.",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <main className="flex-1 px-6 pb-24 pt-14 md:px-12 md:pt-16">
      <p className="eyebrow text-primary">Tu selección</p>
      <h1 className="display mb-10 mt-3 text-[clamp(3rem,5.6vw,5.25rem)] leading-[0.98]">
        Tu <em className="text-primary">carrito</em>
      </h1>
      <CartView />
    </main>
  );
}
