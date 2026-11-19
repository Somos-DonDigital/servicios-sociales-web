import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/img/*.{jpg,jpeg,png,webp}',
  { eager: true }
);

const byName: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(files)) {
  byName[path.split('/').pop()!] = mod.default;
}

/** Devuelve la imagen por nombre de archivo (acepta el nombre original de Wix). */
export function img(name: string): ImageMetadata {
  const clean = name.replace(/^3196bb_/, '').replace('~mv2', '');
  const found = byName[clean];
  if (!found) throw new Error(`Imagen no encontrada: ${name}`);
  return found;
}
