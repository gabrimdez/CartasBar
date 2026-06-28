import type { ImageMetadata } from 'astro';
import { slugify } from './slug.js';

/**
 * Flujo automático de fotos de platos por convención de nombre.
 *
 * Para añadir la foto de un plato basta con dejar el archivo en
 * `src/assets/platos/<slug-del-bar>/<slug-del-plato>.jpg` (o .png/.webp/.avif).
 * El slug del plato se obtiene de su nombre (sin acentos, en minúsculas y con
 * guiones). No hay que tocar el JSON: si la foto existe, se pinta debajo del
 * plato; si no, no se muestra nada.
 *
 * `import.meta.glob` con `eager` importa las fotos en build, por lo que Astro
 * las optimiza (redimensionado + WebP/AVIF + lazy load).
 */
const modulos = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/platos/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

// Mapa "<slug-del-bar>/<slug-del-plato>" -> imagen optimizada.
const fotos = new Map<string, ImageMetadata>();
for (const [ruta, mod] of Object.entries(modulos)) {
  const m = ruta.match(/\/src\/assets\/platos\/([^/]+)\/([^/]+)\.[^.]+$/);
  if (m) fotos.set(`${m[1]}/${m[2]}`, mod.default);
}

/** Foto del plato si existe (buscada por el slug de su nombre), o undefined. */
export function getFotoPlato(
  barSlug: string,
  nombrePlato: string,
): ImageMetadata | undefined {
  return fotos.get(`${barSlug}/${slugify(nombrePlato)}`);
}
