// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.servicios-sociales.es',
  // En la vista previa de GitHub Pages se publica bajo /servicios-sociales-web
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: { defaultLocale: 'es', locales: { es: 'es-ES' } },
    }),
  ],
  image: {
    responsiveStyles: true,
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
