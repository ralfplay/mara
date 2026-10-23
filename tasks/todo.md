# Tareas: MARA

Verificación estándar en todas: `npm run lint` y `npm run build` sin errores.

## Task 1: Tipos y catálogo
**Description:** Definir el tipo `Product`, un catálogo de ejemplo de 8 productos (aretes, collares, pulseras) y `formatPrice`.
**Acceptance criteria:**
- [x] `Product` tiene `slug`, `name`, `category`, `price`, `image`, `inStock`
- [x] Hay al menos 2 productos por categoría
- [x] `formatPrice(25)` devuelve `S/ 25.00`
**Verification:** lint y build; revisar que los slugs no se repitan.
**Dependencies:** None
**Files likely touched:** `src/data/products.ts`, `src/lib/format.ts`
**Estimated scope:** Small

## Task 2: Layout y configuración
**Description:** Cabecera y pie compartidos en todas las páginas, con enlaces a catálogo, carrito, Instagram y WhatsApp. Datos de contacto en un solo archivo.
**Acceptance criteria:**
- [ ] `src/lib/config.ts` tiene número de WhatsApp, usuario de Instagram y nombre de la tienda (valores de ejemplo con `TODO`)
- [ ] Cabecera y pie salen en todas las páginas y funcionan en móvil (menú que no desborda)
- [ ] La cabecera muestra un ícono de carrito (aún sin cantidad)
**Verification:** revisión manual a 375 px y 1280 px.
**Dependencies:** None
**Files likely touched:** `src/lib/config.ts`, `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/app/layout.tsx`
**Estimated scope:** Medium

## Task 3: Inicio
**Description:** Portada, categorías y productos destacados usando el catálogo, con un componente reutilizable de tarjeta de producto.
**Acceptance criteria:**
- [ ] La portada tiene botón hacia el catálogo
- [ ] Las 3 categorías enlazan al catálogo filtrado
- [ ] Los destacados salen de `products.ts` y muestran nombre, precio y "Agotado" si no hay stock
**Verification:** revisión manual en móvil y escritorio.
**Dependencies:** T1, T2
**Files likely touched:** `src/app/page.tsx`, `src/components/ProductCard.tsx`
**Estimated scope:** Small

## Task 4: Catálogo con filtro
**Description:** Página `/catalogo` con todos los productos y filtro por categoría mediante la URL (`?categoria=aretes`).
**Acceptance criteria:**
- [ ] Sin filtro muestra todos; con filtro, solo esa categoría
- [ ] El filtro funciona sin JavaScript (enlaces) y marca la categoría activa
- [ ] Una categoría inexistente muestra todos los productos
**Verification:** revisión manual de las 4 vistas.
**Dependencies:** T1, T2, T3 (reutiliza `ProductCard`)
**Files likely touched:** `src/app/catalogo/page.tsx`, `src/components/CategoryFilter.tsx`
**Estimated scope:** Small

## Checkpoint: Base
- [ ] Lint y build pasan
- [ ] Se navega inicio → catálogo → filtro en móvil y escritorio
- [ ] Revisar con la dueña antes de seguir

## Task 5: Detalle de producto
**Description:** Página `/producto/[slug]` con foto, precio, disponibilidad y descripción, generada en build.
**Acceptance criteria:**
- [ ] Cada producto del catálogo tiene su página
- [ ] Un slug inexistente muestra 404
- [ ] Las tarjetas enlazan al detalle
**Verification:** build lista todas las rutas de producto; revisión manual.
**Dependencies:** T1, T3
**Files likely touched:** `src/app/producto/[slug]/page.tsx`, `src/components/ProductCard.tsx`, `src/data/products.ts`
**Estimated scope:** Small

## Task 6: Estado del carrito
**Description:** Contexto de carrito (agregar, quitar, cambiar cantidad, vaciar) guardado en localStorage, con botón "Agregar" en el detalle y contador en la cabecera.
**Acceptance criteria:**
- [ ] Agregar dos veces el mismo producto suma la cantidad
- [ ] El carrito sobrevive a recargar la página
- [ ] No se pueden agregar productos agotados
- [ ] Si localStorage falla, la web sigue funcionando
**Verification:** revisión manual (agregar, recargar, quitar); lógica pura separada en `src/lib/cart.ts`.
**Dependencies:** T5
**Files likely touched:** `src/lib/cart.ts`, `src/components/CartProvider.tsx`, `src/components/AddToCartButton.tsx`, `src/components/Header.tsx`, `src/app/layout.tsx`
**Estimated scope:** Medium

## Task 7: Página de carrito
**Description:** `/carrito` con lista de productos, cantidades editables, subtotal por línea y total.
**Acceptance criteria:**
- [ ] Cambiar cantidades o quitar un ítem actualiza el total al instante
- [ ] Con el carrito vacío se ve un mensaje y un enlace al catálogo
- [ ] El total coincide con la suma de precios por cantidad
**Verification:** revisión manual con 3 productos distintos.
**Dependencies:** T6
**Files likely touched:** `src/app/carrito/page.tsx`, `src/components/CartLine.tsx`
**Estimated scope:** Small

## Task 8: Pedido por WhatsApp
**Description:** Formulario (nombre, ciudad, tipo de entrega, forma de pago preferida) que arma el mensaje y abre WhatsApp.
**Acceptance criteria:**
- [ ] El mensaje incluye productos, cantidades, total, nombre, ciudad, entrega y pago
- [ ] Tipos de entrega: delivery en la ciudad, envío a provincia, recojo
- [ ] Formas de pago: Yape, Plin, transferencia, contraentrega, efectivo
- [ ] Sin nombre o ciudad no se puede enviar y se avisa
- [ ] El mensaje usa caracteres y saltos de línea codificados correctamente (tildes, ñ)
**Verification:** revisión manual abriendo el enlace con 1 y con 10 productos; función `buildOrderMessage` pura en `src/lib/whatsapp.ts`.
**Dependencies:** T7, T2
**Files likely touched:** `src/lib/whatsapp.ts`, `src/components/OrderForm.tsx`, `src/app/carrito/page.tsx`
**Estimated scope:** Medium

## Checkpoint: Flujo de compra
- [ ] Lint y build pasan
- [ ] Flujo completo: elegir producto → carrito → WhatsApp con el mensaje correcto
- [ ] Revisar con la dueña antes de seguir

## Task 9: Envíos y pagos
**Description:** Página con formas de pago, cómo funcionan los envíos a provincias y el delivery en la ciudad, con enlaces a WhatsApp e Instagram.
**Acceptance criteria:**
- [ ] Explica los 5 métodos de pago y que se confirman por WhatsApp
- [ ] Separa delivery en la ciudad y envío a provincias, con texto de ejemplo marcado `TODO` hasta tener datos reales
- [ ] Enlazada desde cabecera o pie
**Verification:** revisión manual.
**Dependencies:** T2
**Files likely touched:** `src/app/envios-y-pagos/page.tsx`, `src/components/Footer.tsx`
**Estimated scope:** Small

## Task 10: SEO y rendimiento
**Description:** Metadatos por página, imágenes optimizadas con `next/image` y revisión de Lighthouse en móvil.
**Acceptance criteria:**
- [ ] Cada página tiene título y descripción propios
- [ ] Imágenes con `alt`, tamaños definidos y carga diferida fuera de la portada
- [ ] Lighthouse móvil: Rendimiento ≥ 85 y Accesibilidad ≥ 90
**Verification:** Lighthouse sobre `npm run build && npm run start`.
**Dependencies:** T3 a T9
**Files likely touched:** páginas existentes, `src/app/layout.tsx`, `src/components/ProductCard.tsx`
**Estimated scope:** Medium

## Task 11: Despliegue
**Description:** Subir el repo a GitHub y publicar en Vercel. Requiere tu aprobación y tu cuenta.
**Acceptance criteria:**
- [ ] Datos reales en `config.ts` y `products.ts` (sin `TODO`)
- [ ] La web publicada abre y el flujo de pedido funciona desde un celular
**Verification:** probar la URL pública desde un celular.
**Dependencies:** T10 y las respuestas a las preguntas abiertas
**Files likely touched:** `src/lib/config.ts`, `src/data/products.ts`
**Estimated scope:** Small

## Checkpoint: Completo
- [ ] Todos los criterios de `SPEC.md` se cumplen
- [ ] Lista para publicar
