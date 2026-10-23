"use client";

import { useSyncExternalStore } from "react";
import { addItem, countItems, removeItem, setQuantity } from "@/lib/cart";
import { cartStore } from "@/lib/cart-store";

export function useCart() {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );

  return {
    items,
    count: countItems(items),
    add: (slug: string) => cartStore.update((prev) => addItem(prev, slug)),
    remove: (slug: string) => cartStore.update((prev) => removeItem(prev, slug)),
    setQty: (slug: string, quantity: number) =>
      cartStore.update((prev) => setQuantity(prev, slug, quantity)),
    clear: () => cartStore.update(() => []),
  };
}
