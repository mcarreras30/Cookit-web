# memory.md

## Cliente
- Emprendimiento: Cookit — cookies artesanales caseras
- Ubicación: Canning, Buenos Aires
- Instagram: @cookit.ba
- WhatsApp: 11 5334-0097
- Sin e-commerce: hay un carrito simple (sin pago) para armar el pedido — cajas cerradas + sueltas — pero se cierra por WhatsApp, no hay pasarela de pago
- Días de encargo: lunes y martes de 8 a 17hs
- Días de entrega: viernes 17:30 a 20:30hs y sábados de 9 a 12hs
- Formas de pago: transferencia o efectivo al momento de la entrega

## Estructura del sitio
1. Hero — logo, "COOKIT", bajada, botones "Ver catálogo" / "Pedir ahora" (WhatsApp)
2. Catálogo — dos formas de compra:
   - Cajas cerradas (precio fijo): Caja de 4 ($35.000) y Caja de 6 ($50.000). Se arman eligiendo sabores del catálogo (se puede repetir sabor) hasta completar exactamente 4 o 6 unidades.
   - Sueltas — tarjetas con foto + badge opcional + nombre + precio por unidad (ya no se vende docena individual, solo caja de 4/6 o unidad suelta): Clásicas, Red Velvet, Oreo, Doble Chocolate, Kinder, Nutella, Maní y chocolate blanco, Limón y chocolate blanco
   - Carrito (sin pago): junta cajas + sueltas, badge de cantidad en el navbar, drawer lateral con el detalle y el total, botón final que arma el mensaje de WhatsApp (separando cajas de sueltas) y lo manda a wa.me. Persiste en localStorage.
3. Zona de entrega — Canning (domicilio) + punto de encuentro St. Thomas Este-Oeste
4. Testimonios de clientas
5. Preguntas frecuentes (anticipación, cómo pedir, formas de pago, dónde retirar)
6. Footer — Instagram, WhatsApp, ubicación

## Decisiones tomadas
- Referencia visual: combinación de Claude Design (estructura de contenido) + Google Stitch (tarjetas de catálogo con foto y badge)
- Paleta: rosa pastel blush #F3DAD4, negro, blanco, ocre mostaza
- Tipografía: serif elegante (títulos) + serif fina/itálica (detalles, logo)
- No usar imágenes de stock genéricas — solo logo y fotos reales que provea la clienta
- Carrito simple (sin pago) para armar el pedido (cajas cerradas + sueltas) antes de mandarlo por WhatsApp — sigue sin pasarela de pago ni checkout real, el flujo de conversión sigue siendo 100% WhatsApp