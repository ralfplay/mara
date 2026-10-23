# Implementation Plan: MARA, tienda web de accesorios

## Overview
Tienda en Next.js 16 sin backend. El catálogo vive en `src/data/products.ts`, el carrito en el navegador del cliente y el pedido sale como mensaje de WhatsApp. Spec: `SPEC.md`. Tareas con criterios de aceptación: `tasks/todo.md`.

## Architecture Decisions
- **Catálogo en un archivo tipado:** agregar un producto es editar un archivo y subir la foto; sin base de datos ni panel. Si más adelante hace falta un panel, el tipo `Product` es el contrato para migrar.
- **Páginas estáticas:** inicio, catálogo y detalle se generan en build (`generateStaticParams`); solo el carrito es de cliente.
- **Carrito con React Context + localStorage:** sin librerías extra; se pierde solo si el cliente borra los datos del navegador.
- **WhatsApp por enlace `wa.me`:** el mensaje se arma en una función pura (`src/lib/whatsapp.ts`), fácil de probar. Los datos de contacto (número, Instagram) viven en `src/lib/config.ts`.
- **Construcción por rebanadas verticales:** cada tarea deja la web funcionando.

## Dependency Graph
```
Tipos + catálogo (T1)
   ├── Layout y configuración (T2)
   │      ├── Inicio (T3)
   │      └── Catálogo con filtro (T4)
   └── Detalle de producto (T5)
          └── Estado del carrito (T6)
                 └── Página de carrito (T7)
                        └── Pedido por WhatsApp (T8)
Envíos y pagos (T9) depende de T2
SEO y rendimiento (T10) depende de T3-T8
Despliegue (T11) depende de T10
```

## Task List
Ver el detalle en `tasks/todo.md`.

### Phase 1: Base
- [x] T1: Tipos y catálogo
- [x] T2: Layout y configuración
- [x] T3: Inicio
- [x] T4: Catálogo con filtro

### Checkpoint: Base

### Phase 2: Compra
- [x] T5: Detalle de producto
- [ ] T6: Estado del carrito
- [ ] T7: Página de carrito
- [ ] T8: Pedido por WhatsApp

### Checkpoint: Flujo de compra

### Phase 3: Cierre
- [ ] T9: Envíos y pagos
- [ ] T10: SEO y rendimiento
- [ ] T11: Despliegue

### Checkpoint: Completo

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Faltan fotos o datos reales (número, zonas, envíos) | Med | Usar datos de ejemplo marcados con `TODO` en `src/lib/config.ts` y `products.ts`; cambiarlos antes de T11 |
| El mensaje de WhatsApp es largo con muchos productos | Med | Probar con 10 ítems en T8; el límite de URL es holgado, pero se verifica |
| Next.js 16 cambia APIs (por ejemplo `params` asíncrono) | Med | Revisar `AGENTS.md` y la documentación de Next antes de escribir rutas dinámicas (T5) |
| Carrito en localStorage falla en modo privado | Baja | Envolver lecturas y escrituras en try/catch; el carrito sigue en memoria |

## Open Questions
- Las de `SPEC.md`: número de WhatsApp, Instagram, ciudad y zonas de delivery, empresa de envíos, cantidad de productos y fotos, dominio.
