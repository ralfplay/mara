import { getProduct } from "@/data/products";

export type CartItem = { slug: string; quantity: number };

export const MAX_QUANTITY = 20;

export function addItem(items: CartItem[], slug: string): CartItem[] {
  const product = getProduct(slug);
  if (!product || !product.inStock) return items;
  const existing = items.find((i) => i.slug === slug);
  if (!existing) return [...items, { slug, quantity: 1 }];
  return items.map((i) =>
    i.slug === slug
      ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QUANTITY) }
      : i,
  );
}

export function removeItem(items: CartItem[], slug: string): CartItem[] {
  return items.filter((i) => i.slug !== slug);
}

export function setQuantity(
  items: CartItem[],
  slug: string,
  quantity: number,
): CartItem[] {
  if (quantity <= 0) return removeItem(items, slug);
  const q = Math.min(Math.floor(quantity), MAX_QUANTITY);
  return items.map((i) => (i.slug === slug ? { ...i, quantity: q } : i));
}

export const countItems = (items: CartItem[]) =>
  items.reduce((n, i) => n + i.quantity, 0);

export const cartTotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + (getProduct(i.slug)?.price ?? 0) * i.quantity, 0);

// Lee el carrito guardado ignorando datos dañados o de productos que ya no existen.
export function parseCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.flatMap((i) =>
      i &&
      typeof i.slug === "string" &&
      Number.isInteger(i.quantity) &&
      i.quantity > 0 &&
      getProduct(i.slug)?.inStock
        ? [{ slug: i.slug, quantity: Math.min(i.quantity, MAX_QUANTITY) }]
        : [],
    );
  } catch {
    return [];
  }
}
