/**
 * Ayuda para el alta de fotos de platos.
 *
 * Por cada bar lista sus platos y el NOMBRE DE ARCHIVO exacto que debe tener su
 * foto (en `src/assets/platos/<bar>/`), marca cuáles ya tienen foto y avisa de
 * fotos que no coinciden con ningún plato (probable errata en el nombre).
 *
 * Uso:
 *   npm run fotos            -> todos los bares
 *   npm run fotos bar-paco   -> solo ese bar
 */
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { slugify } from '../src/lib/slug.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const barsDir = path.join(root, 'src/data/bars');
const fotosRoot = path.join(root, 'src/assets/platos');
const EXTS = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

const filtro = process.argv[2];

const bares = (await readdir(barsDir))
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''))
  .filter((slug) => !filtro || slug === filtro);

if (bares.length === 0) {
  console.log(`No hay bares${filtro ? ` que coincidan con "${filtro}"` : ''}.`);
  process.exit(0);
}

function fotoExistente(barSlug, platoSlug) {
  const dir = path.join(fotosRoot, barSlug);
  for (const ext of EXTS) {
    if (existsSync(path.join(dir, `${platoSlug}.${ext}`))) return `${platoSlug}.${ext}`;
  }
  return null;
}

for (const barSlug of bares) {
  const data = JSON.parse(await readFile(path.join(barsDir, `${barSlug}.json`), 'utf8'));
  console.log(`\n=== ${data.nombre}  (${barSlug}) ===`);
  console.log(`Carpeta de fotos: src/assets/platos/${barSlug}/\n`);

  const usadas = new Set();
  for (const cat of data.categorias ?? []) {
    for (const plato of cat.platos ?? []) {
      const slug = slugify(plato.nombre);
      const existente = fotoExistente(barSlug, slug);
      if (existente) usadas.add(existente);
      const marca = existente ? '✓' : '·';
      const detalle = existente ? `foto: ${existente}` : `falta:  ${slug}.jpg`;
      console.log(`  ${marca} ${plato.nombre.padEnd(36)} ${detalle}`);
    }
  }

  let archivos = [];
  try {
    archivos = (await readdir(path.join(fotosRoot, barSlug))).filter((f) =>
      EXTS.includes(f.split('.').pop().toLowerCase()),
    );
  } catch {
    /* la carpeta puede no existir todavía */
  }
  const huerfanas = archivos.filter((f) => !usadas.has(f));
  if (huerfanas.length) {
    console.log('\n  ⚠ Fotos que NO coinciden con ningún plato (¿errata en el nombre?):');
    for (const f of huerfanas) console.log(`     - ${f}`);
  }
}

console.log('');
