import type { AllergenId } from '../../lib/allergens';

/**
 * Set propio de iconos para los 14 alérgenos (sin dependencias ni riesgo de
 * licencias). Cada valor es el contenido INTERIOR de un `<svg viewBox="0 0 24 24">`
 * que dibuja AllergenIcon.astro; usan `currentColor` para heredar el color del tema.
 *
 * Son line-icons 24×24, trazo redondeado. Primer pase visual: legibles y distintos,
 * pero refinables una vez vistos en pantalla (la etiqueta de texto garantiza el
 * significado en todo caso).
 */
export const ICONOS_ALERGENOS: Record<AllergenId, string> = {
  gluten: `
    <path d="M12 22V8"/>
    <path d="M12 8c0-2 1.2-3.2 3.2-3.2C15.2 6.8 14 8 12 8Z"/>
    <path d="M12 13c-2 0-3.2-1.2-3.2-3.2C10.8 9.8 12 11 12 13Z"/>
    <path d="M12 13c2 0 3.2-1.2 3.2-3.2C13.2 9.8 12 11 12 13Z"/>
    <path d="M12 18c-2 0-3.2-1.2-3.2-3.2C10.8 14.8 12 16 12 18Z"/>
    <path d="M12 18c2 0 3.2-1.2 3.2-3.2C13.2 14.8 12 16 12 18Z"/>`,

  crustaceos: `
    <path d="M17.5 7c-4-1-9.5 1-9.5 6 0 3.2 2.3 5.5 5.5 5.5"/>
    <path d="M17.5 7c2 0 3.2 1.1 3.2 3.1"/>
    <path d="M8 13c-1.6 0-3.2.9-3.7 2.7M10.5 13.6l-1 2M13.2 14l-1 2M15.8 13.6l-.6 2"/>
    <circle cx="16.8" cy="8.6" r=".7" fill="currentColor" stroke="none"/>`,

  huevos: `
    <path d="M9 5.6c2.8-1.6 6 .3 6.6 3.4.5 2.3 2.6 2.3 3 4.7.5 2.5-1.6 4.6-4.2 4.6-1.9 0-2.7-1.1-4.4-1.1S6.7 22 4.7 20.5C3 19.2 3.2 16.2 5 14.8 6.4 13.7 5.6 11.1 6.5 8.8 7 7.4 8 6.2 9 5.6Z"/>
    <circle cx="11" cy="12" r="3"/>`,

  pescado: `
    <path d="M3.5 12c3-4 8-5.2 12-5.2 0 0-1.6 2.2-1.6 5.2s1.6 5.2 1.6 5.2c-4 0-9-1.2-12-5.2Z"/>
    <path d="M15.5 6.8c2 0 4 2 6 5.2-2 3.2-4 5.2-6 5.2"/>
    <circle cx="6.5" cy="11" r=".7" fill="currentColor" stroke="none"/>`,

  cacahuetes: `
    <path d="M12 3c-2.2 0-3.6 1.6-3.6 3.6 0 1.3.7 2 .7 3.2 0 1-1 1.7-1 3.4C8.2 18.4 9.7 21 12 21s3.8-2.6 3.9-7.8c0-1.7-1-2.4-1-3.4 0-1.2.7-1.9.7-3.2C15.6 4.6 14.2 3 12 3Z"/>
    <path d="M9 10.4c1.9.9 4.1.9 6 0"/>
    <path d="M9.4 6.2c1.6.7 3.6.7 5.2 0"/>
    <path d="M9 14.6c1.9.7 4.1.7 6 0"/>`,

  soja: `
    <path d="M4 14c0-3 2.1-5 5-5h2.4c2.9 0 5 2 5 5s-2.1 5-5 5H9c-2.9 0-5-2-5-5Z"/>
    <circle cx="8.5" cy="14" r="1.4" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="14" r="1.4" fill="currentColor" stroke="none"/>
    <circle cx="15.5" cy="14" r="1.4" fill="currentColor" stroke="none"/>
    <path d="M18.6 9.2c1.1-1 1.7-2.4 1.8-4.2"/>`,

  lacteos: `
    <path d="M7 4h10l-1 15.8A2 2 0 0 1 14 21.6h-4a2 2 0 0 1-2-1.8L7 4Z"/>
    <path d="M7.4 9h9.2"/>`,

  'frutos-cascara': `
    <path d="M6 9h12c0 4.2-2.7 8-6 8s-6-3.8-6-8Z"/>
    <path d="M6 9c0-2 2.7-3.6 6-3.6S18 7 18 9"/>
    <path d="M12 5.4V3"/>`,

  apio: `
    <path d="M8 21c-1-4-1-9 0-13"/>
    <path d="M12 21c0-5 0-10 .5-14"/>
    <path d="M16 21c1-4 1-8 0-12"/>
    <path d="M7 8.5c1.5-1 3-1 4.3 0M11.3 7.5c1.5-1 3-1 4.3 0"/>`,

  mostaza: `
    <path d="M10 3h4v2l1 2v12a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V7l1-2Z"/>
    <path d="M9 11.5h6"/>
    <path d="M11 3V1.8h2V3"/>`,

  sesamo: `
    <path d="M8 6.5c1.2 0 2 1 2 2.4S9.2 11.6 8 11.6s-2-1-2-2.7S6.8 6.5 8 6.5Z"/>
    <path d="M15.5 8.6c1.2 0 2 1 2 2.4s-.8 2.7-2 2.7-2-1-2-2.7.8-2.4 2-2.4Z"/>
    <path d="M10.8 14c1.2 0 2 1 2 2.4s-.8 2.7-2 2.7-2-1-2-2.7.8-2.4 2-2.4Z"/>`,

  sulfitos: `
    <path d="M10 3v5l-4 9.2A2 2 0 0 0 7.8 20h8.4a2 2 0 0 0 1.8-2.8L14 8V3"/>
    <path d="M9 3h6"/>
    <circle cx="11" cy="16" r="1" fill="currentColor" stroke="none"/>
    <circle cx="14" cy="14.4" r=".8" fill="currentColor" stroke="none"/>
    <circle cx="13" cy="18" r=".7" fill="currentColor" stroke="none"/>`,

  altramuces: `
    <path d="M9 4c-2 2-2.6 5-1.6 9s3 6 4.6 7c1.6-1 3.6-3 4.6-7s.4-7-1.6-9"/>
    <circle cx="12" cy="8" r="1.6" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="16" r="1.6" fill="currentColor" stroke="none"/>`,

  moluscos: `
    <path d="M12 20C6 20 3 14 4 9c.3 2 1.2 3.1 2.3 3.6C6 9 7 6.6 9 5.6c-.2 2.3.3 4 1 5C10.5 7 11.2 4 12 3c.8 1 1.5 4 2 7.6.7-1 1.2-2.7 1-5 2 1 3.1 3.6 2.7 7 .8-.5 1.7-1.6 2-3.6 1 5-2 11-8 11Z"/>
    <path d="M12 20c-1.5-3-2.2-6-2-10"/>
    <path d="M12 20c1.5-3 2.2-6 2-10"/>`,
};
