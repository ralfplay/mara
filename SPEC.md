# Spec: MARA, tienda web de accesorios

## Objective
Tienda web para MARA (aretes, collares y pulseras) para clientes de todo Perú. El cliente navega el catálogo, arma un carrito y envía el pedido por WhatsApp. El pago (Yape, Plin, transferencia, contraentrega, efectivo) se confirma a mano por ese chat. Ver `docs/intent/mara.md`.

Historias de usuario:
- Como clienta de otra provincia, veo los productos con foto, precio y disponibilidad, y envío mi pedido sin preguntar antes qué hay.
- Como clienta de la ciudad, elijo delivery o recojo y lo indico en el pedido.
- Como dueña de la tienda, recibo en WhatsApp un mensaje con productos, cantidades, total, ciudad y forma de pago deseada.
- Como dueña de la tienda, agrego o cambio productos sin tocar la lógica de la página.

## Tech Stack
Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. Node 24. Sin base de datos ni backend en la primera versión.

## Commands
```
Dev:   npm run dev
Build: npm run build
Lint:  npm run lint
Start: npm run start
```

## Project Structure
```
src/app/            → Páginas y layout (App Router)
src/app/producto/   → Detalle de producto
src/app/carrito/    → Carrito y envío del pedido
src/components/     → Componentes de UI
src/data/products.ts→ Catálogo (lista tipada de productos)
src/lib/            → Carrito, formato de precios, mensaje de WhatsApp
public/products/    → Fotos de productos
docs/intent/        → Intención confirmada
```

## Code Style
Componentes de servidor por defecto; `"use client"` solo donde hay estado (carrito). Textos en español, precios en soles.

```tsx
export type Product = {
  slug: string;
  name: string;
  category: "aretes" | "collares" | "pulseras";
  price: number; // en soles
  image: string;
  inStock: boolean;
};

export const formatPrice = (n: number) => `S/ ${n.toFixed(2)}`;
```

## Testing Strategy
Primera versión: `npm run lint` y `npm run build` limpios, más revisión manual en móvil y escritorio. La lógica del carrito y del mensaje de WhatsApp (`src/lib/`) es pura; si se agregan tests, serían unitarios con Vitest (requiere aprobación, ver Boundaries).

## Boundaries
- Always: lint y build antes de cada commit; diseño pensado primero para móvil; textos en español.
- Ask first: agregar dependencias, agregar backend o base de datos, cobros en línea, cambios de dominio o hosting.
- Never: subir secretos o datos de clientes al repo; guardar datos de pago; borrar tests que fallan sin aprobación.

## Funcionalidades (primera versión)
1. Inicio con portada, categorías y productos destacados.
2. Catálogo con filtro por categoría (aretes, collares, pulseras).
3. Detalle de producto: fotos, precio, disponibilidad, botón de agregar.
4. Carrito (en el navegador del cliente) con cantidades y total.
5. Pedido: nombre, ciudad, tipo de entrega (delivery en la ciudad, envío a provincia, recojo) y forma de pago preferida. Se abre WhatsApp con el mensaje armado.
6. Enlaces a Instagram y WhatsApp, y página con información de envíos y pagos.

## Success Criteria
- Un pedido de ejemplo llega a WhatsApp con productos, cantidades, total, ciudad, entrega y forma de pago, y se lee bien.
- En un móvil de gama media, la página de inicio carga en menos de 3 s con 4G.
- Lighthouse en móvil: Rendimiento ≥ 85, Accesibilidad ≥ 90.
- Agregar un producto nuevo se hace editando solo `src/data/products.ts` y subiendo la foto.
- `npm run lint` y `npm run build` pasan sin errores.

## Assumptions (corrígelas ahora o sigo con ellas)
1. Moneda en soles (S/); el precio mostrado es el del producto, sin cálculo de envío.
2. El catálogo vive en un archivo del repo; no hay panel de administración.
3. El hosting será Vercel (gratis para empezar).
4. Estilo visual: paleta derivada de `#934d29` (terracota), con fondo crema, texto marrón oscuro y dorado solo decorativo. Los tokens están en `src/app/globals.css`. Se usó la estructura de tokens de la skill ui-ux-pro-max; los contrastes de texto se verificaron a ≥ 4.5:1.
5. El costo de envío entre provincias lo acuerdas por WhatsApp con cada cliente.

## Open Questions
- ¿Número de WhatsApp de la tienda y cuentas de Instagram para los enlaces?
- ¿Cuál es la ciudad del delivery y qué zonas cubre?
- ¿Con qué empresa envías a provincias (Olva, Shalom, otra) y cuánto tardan?
- ¿Cuántos productos tendrás al inicio y ya tienes las fotos?
- ¿Prefieres editar el catálogo en un archivo (lo hago yo contigo) o un panel donde cargues productos sola o solo?
- ¿Tienes dominio (por ejemplo mara.pe) o usamos uno gratuito de Vercel por ahora?
