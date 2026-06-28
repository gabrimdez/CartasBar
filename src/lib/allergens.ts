/**
 * Los 14 alérgenos de declaración obligatoria del Reglamento (UE) 1169/2011.
 *
 * Conjunto CERRADO: un plato solo puede referenciar ids de esta lista. El esquema
 * Zod de `src/content.config.ts` valida los ids en build-time, de modo que un id
 * desconocido rompe el build (no falla en producción).
 *
 * Cada alérgeno tiene:
 *  - id:       identificador estable usado en los datos de los platos.
 *  - etiqueta: nombre mostrado al cliente (español).
 *  - icono:    nombre del SVG que pintará el badge en el Sprint 2,
 *              en `src/components/allergen-icons/<icono>.svg`.
 */
export const ALERGENOS = [
  { id: 'gluten', etiqueta: 'Gluten', icono: 'gluten' },
  { id: 'crustaceos', etiqueta: 'Crustáceos', icono: 'crustaceos' },
  { id: 'huevos', etiqueta: 'Huevos', icono: 'huevos' },
  { id: 'pescado', etiqueta: 'Pescado', icono: 'pescado' },
  { id: 'cacahuetes', etiqueta: 'Cacahuetes', icono: 'cacahuetes' },
  { id: 'soja', etiqueta: 'Soja', icono: 'soja' },
  { id: 'lacteos', etiqueta: 'Lácteos', icono: 'lacteos' },
  { id: 'frutos-cascara', etiqueta: 'Frutos de cáscara', icono: 'frutos-cascara' },
  { id: 'apio', etiqueta: 'Apio', icono: 'apio' },
  { id: 'mostaza', etiqueta: 'Mostaza', icono: 'mostaza' },
  { id: 'sesamo', etiqueta: 'Sésamo', icono: 'sesamo' },
  { id: 'sulfitos', etiqueta: 'Sulfitos', icono: 'sulfitos' },
  { id: 'altramuces', etiqueta: 'Altramuces', icono: 'altramuces' },
  { id: 'moluscos', etiqueta: 'Moluscos', icono: 'moluscos' },
] as const;

/** Un alérgeno de la lista cerrada. */
export type Alergeno = (typeof ALERGENOS)[number];

/** Id válido de alérgeno (unión de literales). */
export type AllergenId = Alergeno['id'];

/**
 * Tupla no vacía de ids, lista para `z.enum(...)` en el esquema de la colección.
 * Es la fuente única de verdad de qué ids son válidos.
 */
export const ALLERGEN_IDS = ALERGENOS.map((a) => a.id) as [AllergenId, ...AllergenId[]];

/** Mapa id → alérgeno, para resolver etiqueta e icono al pintar un plato (Sprint 2). */
export const ALERGENOS_POR_ID = Object.fromEntries(
  ALERGENOS.map((a) => [a.id, a]),
) as Record<AllergenId, Alergeno>;
