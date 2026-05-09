// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://assure-mon-chien.fr',
  redirects: {
    '/couts/cout-chien-2025':           '/couts/cout-chien',
    '/guides/assurance-chien-senior':   '/comparatif/assurance-chien-senior',
    '/guides/assurance-chiot':          '/comparatif/assurance-chiot',
  },
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      serialize(item) {
        const lastmod = new Date().toISOString().split('T')[0];
        // Homepage
        if (item.url === 'https://assure-mon-chien.fr/') {
          return { ...item, changefreq: 'weekly', priority: 1.0, lastmod };
        }
        // Comparatif & guides: high priority, updated regularly
        if (item.url.includes('/comparatif') || item.url.includes('/guides/')) {
          return { ...item, changefreq: 'monthly', priority: 0.9, lastmod };
        }
        // Race pages: core content
        if (item.url.includes('/races/') && !item.url.endsWith('/races/')) {
          return { ...item, changefreq: 'monthly', priority: 0.8, lastmod };
        }
        // Race index & cost pages
        if (item.url.endsWith('/races/') || item.url.includes('/couts/')) {
          return { ...item, changefreq: 'monthly', priority: 0.7, lastmod };
        }
        // Legal / about: rarely changes
        if (
          item.url.includes('/mentions-legales') ||
          item.url.includes('/confidentialite') ||
          item.url.includes('/a-propos') ||
          item.url.includes('/affiliation')
        ) {
          return { ...item, changefreq: 'yearly', priority: 0.3, lastmod };
        }
        return { ...item, lastmod };
      },
    }),
  ],
});
