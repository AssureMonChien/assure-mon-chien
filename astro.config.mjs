// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Convertit une URL de sitemap en chemin de fichier source Astro.
 * Ex: https://assure-mon-chien.fr/comparatif/assurance-chiot
 *  → src/pages/comparatif/assurance-chiot.astro
 *
 * Les routes dynamiques (ex: /races/labrador) sont d'abord essayées avec
 * un fichier individuel, puis avec [slug].astro en fallback.
 */
function urlToSourceFile(url) {
  const path = url.replace('https://assure-mon-chien.fr', '').replace(/\/$/, '') || '/';
  const base = join(__dirname, 'src/pages');
  // Cas /  →  src/pages/index.astro
  if (path === '/') return join(base, 'index.astro');
  // Cas /races  → src/pages/races/index.astro
  const directIdx = join(base, path.slice(1), 'index.astro');
  if (existsSync(directIdx)) return directIdx;
  // Cas /comparatif → src/pages/comparatif.astro
  const direct = join(base, path.slice(1) + '.astro');
  if (existsSync(direct)) return direct;
  // Cas /races/labrador → src/pages/races/labrador.astro (route statique)
  // Sinon → src/pages/races/[slug].astro (route dynamique)
  const parts = path.slice(1).split('/');
  if (parts.length > 1) {
    const dyn = join(base, parts.slice(0, -1).join('/'), '[slug].astro');
    if (existsSync(dyn)) return dyn;
  }
  return null;
}

/** Date de dernier commit git d'un fichier (YYYY-MM-DD) — fallback build date */
function gitLastmod(file, fallback) {
  if (!file || !existsSync(file)) return fallback;
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${file}"`, {
      cwd: __dirname, encoding: 'utf8'
    }).trim();
    return iso ? iso.split('T')[0] : fallback;
  } catch {
    return fallback;
  }
}

const buildDate = new Date().toISOString().split('T')[0];

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
        // P2-16 : lastmod basé sur git log du fichier source (vs date du build)
        const sourceFile = urlToSourceFile(item.url);
        const lastmod = gitLastmod(sourceFile, buildDate);
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
