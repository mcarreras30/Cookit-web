# CLAUDE.md

Leé memory.md al inicio de cada sesión.

## Proyecto
Cookit — landing page para emprendimiento de cookies artesanales caseras en Canning, Buenos Aires.

## Cliente
- Nombre del emprendimiento: Cookit
- Instagram: @cookit.ba
- WhatsApp: 11 5334-0097
- Zona: Canning y punto de encuentro en St. Thomas Este-Oeste

## Stack
- HTML/CSS/JS estático (sin framework, sin backend por ahora)
- Deploy en Vercel
- Sin base de datos — es landing de catálogo + contacto por WhatsApp (no e-commerce)

## Reglas del proyecto
- Paleta: rosa pastel blush (#F3DAD4), negro, blanco, ocre mostaza
- Tipografía: serif elegante para títulos, serif fina/itálica para detalles
- Motivo decorativo: margarita con centro de cookie (logo)
- Usar el logo real y las fotos de producto que provea la clienta — no generar imágenes de stock genéricas
- Estilo de tarjetas de catálogo: foto + badge (opcional) + nombre + precio unidad/docena
- Botón principal de conversión: WhatsApp (no formulario de contacto)
- Sin carrito ni pasarela de pago — todo pedido se cierra por WhatsApp

## Comandos
- Test local: `python3 -m http.server`
- Deploy: push a main → auto-deploy en Vercel