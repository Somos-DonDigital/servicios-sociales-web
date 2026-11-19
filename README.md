# servicios-sociales.es · Astro

Web de Servicios Sociales de la Ciudad Autónoma de Ceuta, migrada desde Wix a Astro.

## Uso

```bash
npm install
npm run dev      # desarrollo en http://localhost:4321
npm run build    # genera la web estática en dist/
npm run preview  # sirve dist/ para revisarla
```

La primera compilación tarda unos minutos porque optimiza las 125 imágenes (AVIF/WebP en varios tamaños); las siguientes usan la caché.

## Estructura

- `src/pages/` — una página por URL, con las **mismas rutas que tenía Wix** (`/sivo`, `/imis`, `/centrodelmayor`, `/post/...`, `/prensa`, `/prensa/page/2`...), para no perder posicionamiento.
- `src/data/site.ts` — menú, oficinas UTS (direcciones, teléfonos, horarios) y enlaces a la sede electrónica.
- `src/data/mayor.ts` — servicios del Centro del Mayor.
- `src/data/posts.json` — las 28 noticias. Para publicar una nueva, añade un objeto al principio del array y su imagen a `src/assets/img/`.
- `src/assets/img/` — imágenes originales de Wix (Astro las optimiza al compilar).
- `src/scripts/motion.ts` — animaciones GSAP (respetan «reducir movimiento» del sistema).
- `src/styles/global.css` — sistema de diseño: colores, tipografía fluida con `clamp()`, espaciados.

## Publicación

`dist/` es una web estática. Incluye:
- `.htaccess` para hosting Apache (URL sin `.html`, HTTPS, www, caché y redirecciones de Wix).
- `_redirects` y `_headers` para Netlify o Cloudflare Pages.

Tras el cambio de DNS: dar de alta `https://www.servicios-sociales.es/sitemap-index.xml` en Google Search Console.
