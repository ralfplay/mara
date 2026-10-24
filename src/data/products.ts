export type Category = "aretes" | "collares" | "pulseras";

export const categories: { slug: Category; label: string }[] = [
  { slug: "aretes", label: "Aretes" },
  { slug: "collares", label: "Collares" },
  { slug: "pulseras", label: "Pulseras" },
];

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number; // en soles
  image: string; // ruta en public/; si el archivo no existe se muestra un recuadro
  description: string;
  inStock: boolean;
};

// Productos de demostración: nombres, precios y descripciones inventados para mostrar el concepto.
export const products: Product[] = [
  { slug: "aretes-sol", name: "Aretes Sol", category: "aretes", price: 18, image: "/products/aretes-sol.jpg", description: "Aretes dorados en forma de sol, livianos para usar todo el día.", inStock: true },
  { slug: "aretes-perla", name: "Aretes Perla", category: "aretes", price: 22, image: "/products/aretes-perla.jpg", description: "Aretes con perla y detalle dorado, ideales para ocasiones especiales.", inStock: true },
  { slug: "aretes-luna", name: "Aretes Luna", category: "aretes", price: 20, image: "/products/aretes-luna.jpg", description: "Aretes de media luna, delicados y fáciles de combinar.", inStock: false },
  { slug: "collar-luna", name: "Collar Luna", category: "collares", price: 25, image: "/products/collar-luna.jpg", description: "Collar con dije de luna en cadena fina.", inStock: true },
  { slug: "collar-brisa", name: "Collar Brisa", category: "collares", price: 30, image: "/products/collar-brisa.jpg", description: "Collar largo con eslabones, para dar carácter a cualquier look.", inStock: true },
  { slug: "pulsera-mar", name: "Pulsera Mar", category: "pulseras", price: 22, image: "/products/pulsera-mar.jpg", description: "Pulsera ajustable con detalles inspirados en el mar.", inStock: true },
  { slug: "pulsera-arena", name: "Pulsera Arena", category: "pulseras", price: 19, image: "/products/pulsera-arena.jpg", description: "Pulsera fina en tono arena, perfecta para apilar.", inStock: true },
  { slug: "pulsera-coral", name: "Pulsera Coral", category: "pulseras", price: 24, image: "/products/pulsera-coral.jpg", description: "Pulsera con cuentas en tono coral y cierre ajustable.", inStock: true },
  { slug: "aretes-aro", name: "Aretes Aro", category: "aretes", price: 16, image: "/products/aretes-aro.jpg", description: "Aros dorados medianos, un básico que combina con todo.", inStock: true },
  { slug: "collar-estrella", name: "Collar Estrella", category: "collares", price: 28, image: "/products/collar-estrella.jpg", description: "Collar corto con dije de estrella y cadena fina.", inStock: true },
  { slug: "collar-perla", name: "Collar Perla", category: "collares", price: 35, image: "/products/collar-perla.jpg", description: "Collar de perlas pequeñas con cierre dorado, elegante y liviano.", inStock: true },
  { slug: "pulsera-brisa", name: "Pulsera Brisa", category: "pulseras", price: 26, image: "/products/pulsera-brisa.jpg", description: "Pulsera de eslabones finos con dije, ajustable a cualquier muñeca.", inStock: false },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
