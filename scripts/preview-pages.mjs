// Ajusta dist/ para la vista previa en GitHub Pages:
// - antepone la ruta base a los enlaces internos (/sivo -> /servicios-sociales-web/sivo)
// - añade noindex a todas las páginas y un robots.txt que bloquea a los buscadores
import { readdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';

const BASE = (process.env.BASE_PATH || '').replace(/\/$/, '');
if (!BASE) throw new Error('Falta BASE_PATH');

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (p.endsWith('.html')) yield p;
  }
}

for await (const file of walk('dist')) {
  let html = await readFile(file, 'utf8');
  html = html.replace(/(href|src|srcset)="\/(?!\/)([^"]*)"/g, (m, attr, rest) =>
    ('/' + rest).startsWith(BASE + '/') || ('/' + rest) === BASE ? m : `${attr}="${BASE}/${rest}"`
  );
  html = html.replace('<meta name="theme-color"', '<meta name="robots" content="noindex, nofollow"><meta name="theme-color"');
  await writeFile(file, html);
}
await writeFile('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
await writeFile('dist/.nojekyll', '');
for (const f of ['.htaccess', '_redirects', '_headers']) await rm(join('dist', f), { force: true });
console.log('Vista previa preparada con base', BASE);
