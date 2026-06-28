/**
 * Genera un QR por bar apuntando a su URL pública (site + slug).
 *
 * - Lee la URL del sitio de `astro.config.mjs` (`site`).
 * - Recorre `src/data/bars/*.json`; el slug es el nombre del archivo.
 * - Escribe `public/qr/<slug>.svg` (vectorial, nítido para imprimir) y
 *   `public/qr/<slug>.png` (600px) por cada bar.
 *
 * Uso: `npm run qr`. Se ejecuta también antes de `build` (script `prebuild`),
 * así el sitio desplegado siempre lleva los QR al día.
 */
import QRCode from 'qrcode';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import config from '../astro.config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const barsDir = path.join(root, 'src/data/bars');
const outDir = path.join(root, 'public/qr');

const site = (config.site ?? '').replace(/\/$/, '');
if (!site) {
  console.error('✗ Falta "site" en astro.config.mjs: el QR necesita la URL pública.');
  process.exit(1);
}

await mkdir(outDir, { recursive: true });

const slugs = (await readdir(barsDir))
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''));

if (slugs.length === 0) {
  console.log('No hay bares en src/data/bars; nada que generar.');
  process.exit(0);
}

const opciones = { margin: 1, errorCorrectionLevel: 'M' };

for (const slug of slugs) {
  const url = `${site}/${slug}`;
  const svg = await QRCode.toString(url, { ...opciones, type: 'svg' });
  await writeFile(path.join(outDir, `${slug}.svg`), svg);
  await QRCode.toFile(path.join(outDir, `${slug}.png`), url, { ...opciones, width: 600 });
  console.log(`✓ ${slug}  →  ${url}`);
}

console.log(`\n${slugs.length} QR generados en public/qr/`);
