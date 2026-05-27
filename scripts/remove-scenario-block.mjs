import { readFileSync, writeFileSync, renameSync } from 'fs';

const p = 'src/components/CoutCalculateur.astro';
let c = readFileSync(p, 'utf8');

function rep(anchor, replacement) {
  if (!c.includes(anchor)) throw new Error('ANCHOR NOT FOUND: ' + JSON.stringify(anchor.slice(0, 80)));
  const idx = c.indexOf(anchor);
  c = c.slice(0, idx) + replacement + c.slice(idx + anchor.length);
}

// ── 1. HTML : supprimer <div class="scenario-block">…</div> ─────────────
{
  const pre = '\n\n              <div class="scenario-block">';
  const start = c.indexOf(pre);
  if (start === -1) throw new Error('HTML: scenario-block not found');
  // Brace-count sur les balises <div>/<div> pour trouver le </div> fermant
  let depth = 0;
  let i = start + 2; // skip les 2 \n, pointe sur '<div class="scenario-block">'
  while (i < c.length) {
    if (c.startsWith('<div', i))       { depth++; i += 4; continue; }
    if (c.startsWith('</div>', i))     { depth--; if (depth === 0) { i += 6; break; } i += 6; continue; }
    i++;
  }
  c = c.slice(0, start) + c.slice(i);
  console.log('1. HTML removed (scenario-block div)');
}

// ── 2. CSS : supprimer les règles .scenario-* ────────────────────────────
{
  const cssStart = c.indexOf('\n.scenario-block {');
  if (cssStart === -1) throw new Error('CSS: .scenario-block not found');
  const LAST_RULE = '.scenario-note { font-size: 12.5px; color: var(--c-ink-3, #6a7672); line-height: 1.5; margin: 12px 0 0; font-style: italic; }';
  const lastRuleIdx = c.indexOf(LAST_RULE);
  if (lastRuleIdx === -1) throw new Error('CSS: .scenario-note rule not found');
  const cssEnd = lastRuleIdx + LAST_RULE.length + 1; // +1 pour le \n final
  c = c.slice(0, cssStart) + c.slice(cssEnd);
  console.log('2. CSS removed (36 lines of .scenario-* rules)');
}

// ── 3. JS : constantes SCENARIO_BY_SIZE + TAILLE_LABEL ──────────────────
{
  const start = c.indexOf('\nconst SCENARIO_BY_SIZE = {');
  if (start === -1) throw new Error('JS: SCENARIO_BY_SIZE not found');
  const TAILLE_END = 'const TAILLE_LABEL = { petit: "chien de petite taille", moyen: "chien de taille moyenne", grand: "chien de grande taille", geant: "chien géant" };\n';
  const tEnd = c.indexOf(TAILLE_END);
  if (tEnd === -1) throw new Error('JS: TAILLE_LABEL not found');
  c = c.slice(0, start) + c.slice(tEnd + TAILLE_END.length);
  console.log('3. JS removed (SCENARIO_BY_SIZE + TAILLE_LABEL)');
}

// ── 4. JS : appel updateScenario(R) dans renderResults ───────────────────
rep(
  '\n\n  updateScenario(R);',
  ''
);
console.log('4. JS removed (updateScenario(R) call in renderResults)');

// ── 5. JS : fonction updateScenario(R) ───────────────────────────────────
{
  const marker = '\nfunction updateScenario(R) {';
  const start = c.indexOf(marker);
  if (start === -1) throw new Error('JS: function updateScenario not found');
  // depth-counting sur { } pour trouver la fermeture
  let depth = 0, i = start + 1;
  while (i < c.length) {
    if (c[i] === '{')      { depth++; i++; continue; }
    if (c[i] === '}')      { depth--; i++; if (depth === 0) break; continue; }
    i++;
  }
  if (c[i] === '\n') i++; // consommer le \n après }
  c = c.slice(0, start) + c.slice(i);
  console.log('5. JS removed (function updateScenario)');
}

// ── 6. JS : fonction initScenarioToggle() ────────────────────────────────
{
  const marker = '\nfunction initScenarioToggle() {';
  const start = c.indexOf(marker);
  if (start === -1) throw new Error('JS: function initScenarioToggle not found');
  let depth = 0, i = start + 1;
  while (i < c.length) {
    if (c[i] === '{')      { depth++; i++; continue; }
    if (c[i] === '}')      { depth--; i++; if (depth === 0) break; continue; }
    i++;
  }
  if (c[i] === '\n') i++;
  c = c.slice(0, start) + c.slice(i);
  console.log('6. JS removed (function initScenarioToggle)');
}

// ── 7. JS : appel initScenarioToggle() dans DOMContentLoaded ─────────────
rep(
  '  initScenarioToggle();\n',
  ''
);
console.log('7. JS removed (initScenarioToggle() call)');

// ── 8. JS : forEach reset scenario-* dans renderEmpty ────────────────────
rep(
  "\n  ['scenario-no','scenario-with','scenario-save','scenario-cost','scenario-size','scenario-name'].forEach(function(id) {\n    const el = document.getElementById(id); if (el) el.textContent = '—';\n  });",
  ''
);
console.log('8. JS removed (renderEmpty scenario-* forEach)');

// ── Écriture atomique ─────────────────────────────────────────────────────
const tmp = p + '.tmp';
writeFileSync(tmp, c, 'utf8');
renameSync(tmp, p);
const lines = c.split('\n').length;
console.log('\nOK — 8 suppressions, ' + c.length + ' octets, ' + lines + ' lignes');
