// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Sitio 100% estático (decisión cerrada del proyecto).
  output: 'static',
  // URL pública del sitio (proyecto Cloudflare Pages "cartasbar").
  // Se usa para canónicas, Open Graph y la generación de QR (Sprint 3).
  site: 'https://cartasbar.pages.dev',
});
