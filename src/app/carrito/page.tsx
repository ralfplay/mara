import type { Metadata } from "next";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Carrito | MARA",
};

export default function CartPage() {
  return (
    <main className="flex-1 px-6 py-12 md:px-12">
      <h1 className="mb-8 text-center text-3xl font-light">Carrito</h1>
      <CartView />
    </main>
  );
}
