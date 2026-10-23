export type Category = "aretes" | "collares" | "pulseras";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number; // en soles
  image: string; // TODO: reemplazar por fotos reales en public/products/
  inStock: boolean;
};

export const products: Product[] = [
  { slug: "aretes-sol", name: "Aretes Sol", category: "aretes", price: 18, image: "/products/aretes-sol.jpg", inStock: true },
  { slug: "aretes-perla", name: "Aretes Perla", category: "aretes", price: 22, image: "/products/aretes-perla.jpg", inStock: true },
  { slug: "aretes-luna", name: "Aretes Luna", category: "aretes", price: 20, image: "/products/aretes-luna.jpg", inStock: false },
  { slug: "collar-luna", name: "Collar Luna", category: "collares", price: 25, image: "/products/collar-luna.jpg", inStock: true },
  { slug: "collar-brisa", name: "Collar Brisa", category: "collares", price: 30, image: "/products/collar-brisa.jpg", inStock: true },
  { slug: "pulsera-mar", name: "Pulsera Mar", category: "pulseras", price: 22, image: "/products/pulsera-mar.jpg", inStock: true },
  { slug: "pulsera-arena", name: "Pulsera Arena", category: "pulseras", price: 19, image: "/products/pulsera-arena.jpg", inStock: true },
  { slug: "pulsera-coral", name: "Pulsera Coral", category: "pulseras", price: 24, image: "/products/pulsera-coral.jpg", inStock: true },
];
