/**
 * Tipos y helpers de la carta, reutilizables en páginas y componentes.
 * Los tipos derivan del esquema Zod de la colección (fuente única de verdad).
 */
export type { Plato, Categoria } from '../content.config';

/** Formatea un precio en euros con convención española: 7.5 → "7,50 €". */
export function formatPrecio(precio: number): string {
  return precio.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
  });
}
