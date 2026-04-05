// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://assure-mon-chien.fr',
  integrations: [sitemap()],
});
