import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { ALLERGEN_IDS } from './lib/allergens';

/**
 * Modelo de datos de la carta: Bar → Categoria → Plato.
 *
 * Cada bar es un archivo `src/data/bars/<slug>.json`. El nombre del archivo es el
 * slug (id de la entrada) que se usa en la URL `/<slug>`; por eso el slug NO se
 * repite dentro del JSON (evita que se desincronice del nombre del archivo).
 */

const plato = z.object({
  nombre: z.string().min(1),
  descripcion: z.string().optional(),
  /** Precio en euros. */
  precio: z.number().nonnegative(),
  /** Solo ids válidos de los 14 alérgenos; un id desconocido rompe el build. */
  alergenos: z.array(z.enum(ALLERGEN_IDS)).default([]),
});

const categoria = z.object({
  nombre: z.string().min(1),
  platos: z.array(plato),
});

const bars = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/data/bars' }),
  schema: z.object({
    nombre: z.string().min(1),
    /** Ruta del logo (opcional), relativa a `public/` o importable. */
    logo: z.string().optional(),
    /** Colores del bar; se inyectan como CSS custom properties (Sprint 2). */
    tema: z.object({
      primario: z.string(),
      fondo: z.string(),
      texto: z.string(),
    }),
    contacto: z
      .object({
        telefono: z.string().optional(),
        direccion: z.string().optional(),
        horario: z.string().optional(),
      })
      .optional(),
    categorias: z.array(categoria),
  }),
});

export const collections = { bars };

// Tipos derivados del esquema, reutilizables en componentes/páginas (Sprint 2).
export type Plato = z.infer<typeof plato>;
export type Categoria = z.infer<typeof categoria>;
