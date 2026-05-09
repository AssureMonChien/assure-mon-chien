/**
 * Converts "Risques financiers" section in all race pages to callout format.
 * Matches labrador.astro's .callout structure with info SVG icon.
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const RACE_DIR = 'src/pages/races';
const SKIP = new Set(['labrador.astro', 'index.astro', '[slug].astro']);

// French preposition exceptions
const PREP_MAP = {
  'Akita Inu':              "à l'Akita Inu",
  'Épagneul Breton':        "à l'Épagneul Breton",
  'Montagne des Pyrénées':  'à la Montagne des Pyrénées',
};

function getPrep(nom) {
  return PREP_MAP[nom] ?? `au ${nom}`;
}

const INFO_SVG =
  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
  `stroke-width="2" stroke-linecap="round" stroke-linejoin="round">` +
  `<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>` +
  `<line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

const files = readdirSync(RACE_DIR)
  .filter(f => f.endsWith('.astro') && !SKIP.has(f));

let updated = 0;

for (const filename of files) {
  const filePath = join(RACE_DIR, filename);
  let content = readFileSync(filePath, 'utf-8');
  const original = content;

  // Extract nom from props: nom="Foo Bar"
  const nomMatch = content.match(/\bnom="([^"]+)"/);
  if (!nomMatch) {
    console.log(`! ${filename} — no nom prop found, skipping`);
    continue;
  }
  const nom = nomMatch[1];
  const prep = getPrep(nom);

  // Replace: <h2>Risques financiers spécifiques à la race</h2> + <p>...</p> (single or multi-line)
  // Handles optional leading whitespace and both inline and block <p>
  content = content.replace(
    /(<!\-\- 5\. Risques financiers spécifiques \-\->\n)([ \t]*)<h2>Risques financiers spécifiques à la race<\/h2>\n[ \t]*<p>([\s\S]*?)<\/p>/,
    (match, comment, indent, pContent) => {
      const p = pContent.trim();
      return (
        `${comment}${indent}<div class="callout">\n` +
        `${indent}  <div class="callout-icon" aria-hidden="true">\n` +
        `${indent}    ${INFO_SVG}\n` +
        `${indent}  </div>\n` +
        `${indent}  <div>\n` +
        `${indent}    <h3>Risque financier spécifique ${prep}</h3>\n` +
        `${indent}    <p>${p}</p>\n` +
        `${indent}  </div>\n` +
        `${indent}</div>`
      );
    }
  );

  if (content !== original) {
    writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ ${filename} — ${prep}`);
    updated++;
  } else {
    console.log(`- ${filename} (unchanged)`);
  }
}

console.log(`\nDone — ${updated}/${files.length} files updated.`);
