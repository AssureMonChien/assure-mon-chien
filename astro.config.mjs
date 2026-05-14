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

/** Date ISO de dernier commit git d'un fichier (raw, pour comparaison) */
function gitMtime(file) {
  if (!file || !existsSync(file)) return null;
  try {
    return execSync(`git log -1 --format=%cI -- "${file}"`, {
      cwd: __dirname, encoding: 'utf8'
    }).trim() || null;
  } catch {
    return null;
  }
}

/** Date de dernier commit git d'un fichier (YYYY-MM-DD) — fallback build date */
function gitLastmod(file, fallback) {
  const iso = gitMtime(file);
  return iso ? iso.split('T')[0] : fallback;
}

/** Max date entre plusieurs fichiers (YYYY-MM-DD) — pour pages dynamiques
 *  qui dépendent d'une data centralisée (ex: /comparatif/par-race/* dépend
 *  à la fois du template [slug].astro ET de src/data/races.ts). */
function gitLastmodMulti(files, fallback) {
  const dates = files.map(gitMtime).filter(Boolean);
  if (dates.length === 0) return fallback;
  // ISO 8601 se compare lexicographiquement
  return dates.sort().pop().split('T')[0];
}

const buildDate = new Date().toISOString().split('T')[0];

export default defineConfig({
  site: 'https://assure-mon-chien.fr',
  redirects: {
    '/couts/cout-chien':                '/guides/cout-chien',
    '/couts/cout-chien-2025':           '/guides/cout-chien',
    '/guides/assurance-chien-senior':   '/comparatif/assurance-chien-senior',
    '/guides/assurance-chiot':          '/comparatif/assurance-chiot',
  },
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      serialize(item) {
        const url = item.url;
        const sourceFile = urlToSourceFile(url);

        // P2-16 + maj sitemap : pour les pages /comparatif/par-race/* qui
        // dépendent de src/data/races.ts, le lastmod prend le max entre
        // template et data file. (Les fiches /races/{slug} ont leurs propres
        // props hardcodées et ne dépendent pas de la data centralisée.)
        const dependsOnRacesData = /\/comparatif\/par-race\/[^/]+\/?$/.test(url);
        const dataFile = join(__dirname, 'src/data/races.ts');
        const lastmod = dependsOnRacesData
          ? gitLastmodMulti([sourceFile, dataFile], buildDate)
          : gitLastmod(sourceFile, buildDate);

        // ── Priorités ────────────────────────────────────────────
        // Homepage : signal le plus fort
        if (url === 'https://assure-mon-chien.fr/') {
          return { ...item, changefreq: 'weekly', priority: 1.0, lastmod };
        }
        // Hubs comparatif principaux + guides éditoriaux : 0.9
        const hubs = [
          'https://assure-mon-chien.fr/comparatif',
          'https://assure-mon-chien.fr/comparatif/',
          'https://assure-mon-chien.fr/comparatif/meilleures-assurances',
          'https://assure-mon-chien.fr/comparatif/assurance-chiot',
          'https://assure-mon-chien.fr/comparatif/assurance-chien-senior',
          'https://assure-mon-chien.fr/comparatif/assurance-chien-pas-cher',
          'https://assure-mon-chien.fr/comparatif/par-race',
          'https://assure-mon-chien.fr/comparatif/par-race/',
        ];
        if (hubs.includes(url) || url.includes('/guides/')) {
          return { ...item, changefreq: 'monthly', priority: 0.9, lastmod };
        }
        // Pages comparatif par race (×31) : 0.85 — commercial high-intent
        if (url.includes('/comparatif/par-race/')) {
          return { ...item, changefreq: 'monthly', priority: 0.85, lastmod };
        }
        // Pages races individuelles (×31) : 0.8 — content evergreen
        if (url.includes('/races/') && !url.endsWith('/races/')) {
          return { ...item, changefreq: 'monthly', priority: 0.8, lastmod };
        }
        // Hubs index races + couts : 0.7
        if (url.endsWith('/races/') || url.includes('/couts/')) {
          return { ...item, changefreq: 'monthly', priority: 0.7, lastmod };
        }
        // Legal / a-propos : 0.3
        if (
          url.includes('/mentions-legales') ||
          url.includes('/confidentialite') ||
          url.includes('/a-propos') ||
          url.includes('/affiliation')
        ) {
          return { ...item, changefreq: 'yearly', priority: 0.3, lastmod };
        }
        return { ...item, lastmod };
      },
    }),
  ],
});
