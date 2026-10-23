import { parseCart, type CartItem } from "@/lib/cart";

const STORAGE_KEY = "mara-cart";
const EMPTY: CartItem[] = [];

let cache: CartItem[] | null = null;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

// Si localStorage no está disponible (modo privado, bloqueado), el carrito sigue en memoria.
function read(): CartItem[] {
  if (cache === null) {
    try {
      cache = parseCart(localStorage.getItem(STORAGE_KEY));
    } catch {
      cache = EMPTY;
    }
  }
  return cache;
}

export const cartStore = {
  getSnapshot: read,
  getServerSnapshot: (): CartItem[] => EMPTY,

  subscribe(listener: () => void) {
    listeners.add(listener);
    // Cambios hechos en otra pestaña.
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        cache = null;
        emit();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },

  update(fn: (items: CartItem[]) => CartItem[]) {
    cache = fn(read());
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
    } catch {
      // Ver arriba.
    }
    emit();
  },
};
