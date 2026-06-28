/**
 * Normaliza un texto a slug: "Pulpo á feira" -> "pulpo-a-feira".
 *
 * Módulo plano (JS) a propósito: lo usan tanto la carta (src/lib/fotos.ts, vía
 * Vite/Astro) como el script de Node `scripts/list-fotos.mjs`, así que la lógica
 * de slug es única y no puede desincronizarse.
 */
export function slugify(texto) {
  return texto
    .normalize('NFD')
    .replace(/\p{M}/gu, '') // quita los acentos (marcas combinantes)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
