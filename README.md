# Cartas Tejano

Sistema multi-tenant de **cartas digitales** para bares y restaurantes (zona de Vigo).
Un único proyecto reutilizable: cada local es un archivo JSON y tiene su propia URL
(`/bar-paco`) y su QR. Sitio **100% estático** (Astro), pensado **mobile-first** para
abrirse escaneando un QR desde el móvil.

> El contexto y las reglas del proyecto están en [`CLAUDE.md`](./CLAUDE.md).

## Requisitos

- Node.js ≥ 22.12

## Comandos

| Comando           | Acción                                             |
| ----------------- | -------------------------------------------------- |
| `npm install`     | Instala las dependencias                           |
| `npm run dev`     | Servidor de desarrollo en `http://localhost:4321`  |
| `npm run build`   | Genera el sitio estático en `dist/`                |
| `npm run preview` | Sirve localmente el build de `dist/`               |

## Estructura

```
src/
  content.config.ts   # colección de bares + validación (Sprint 1)
  data/bars/          # un JSON por bar (nombre de archivo = slug)
  lib/                # alérgenos y tipos del modelo
  components/         # componentes de la carta (+ allergen-icons/)
  layouts/            # layout base
  pages/              # index, [slug] (carta por bar), 404
  styles/             # estilos globales
scripts/              # generación de QR (Sprint 3)
public/qr/            # QR generados por bar
```

## Estado

En desarrollo por sprints. Ver el plan y el contexto en `CLAUDE.md`.
