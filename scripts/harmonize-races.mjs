/**
 * Harmonizes all race pages to match labrador.astro:
 * 1. Remove inline <style> block (dark table header overrides)
 * 2. Convert section-prevention → check-list with SVG checkmarks
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';

const RACE_DIR = 'src/pages/races';
const SKIP = new Set(['labrador.astro', 'index.astro', '[slug].astro']);

const SVG_ICON =
  '<span class="check-list-icon">' +
  '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">' +
  '<polyline points="2 6 5 9 10 3" stroke="currentColor" stroke-width="1.8" ' +
  'stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg></span>';

const files = readdirSync(RACE_DIR)
  .filter(f => f.endsWith('.astro') && !SKIP.has(f));

let updated = 0;

for (const filename of files) {
  const filePath = join(RACE_DIR, filename);
  let content = readFileSync(filePath, 'utf-8');
  const original = content;

  // 1. Remove the inline <style> block (identical across all old pages)
  content = content.replace(/\n<style>\n\.race-article[\s\S]*?<\/style>\n/, '\n');

  // 2. Rename section-prevention → check-list
  content = content.replace(/class="section-prevention"/g, 'class="check-list"');

  // 3. Add SVG icon inside every <li> of check-list blocks
  content = content.replace(
    /<ul class="check-list">([\s\S]*?)<\/ul>/g,
    (_match, inner) => {
      const newInner = inner.replace(
        /[ \t]*<li>([\s\S]*?)<\/li>/g,
        (_m, text) => `    <li>\n      ${SVG_ICON}\n      ${text.trim()}\n    </li>`
      );
      return `<ul class="check-list">${newInner}\n  </ul>`;
    }
  );

  if (content !== original) {
    writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ ${filename}`);
    updated++;
  } else {
    console.log(`- ${filename} (unchanged)`);
  }
}

console.log(`\nDone — ${updated}/${files.length} files updated.`);
