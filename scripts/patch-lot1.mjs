import { readFileSync, writeFileSync, renameSync } from 'fs';

const p = 'src/components/CoutCalculateur.astro';
let c = readFileSync(p, 'utf8');

// Safe string replacement (avoids JS replace() special-char issues)
function rep(anchor, replacement) {
  if (!c.includes(anchor)) throw new Error('ANCHOR NOT FOUND: ' + JSON.stringify(anchor.slice(0, 80)));
  const idx = c.indexOf(anchor);
  c = c.slice(0, idx) + replacement + c.slice(idx + anchor.length);
}

// Positional replace between two unique markers
function repBetween(open, close, newContent) {
  const start = c.indexOf(open);
  if (start === -1) throw new Error('OPEN MARKER NOT FOUND: ' + JSON.stringify(open));
  const contentStart = start + open.length;
  const end = c.indexOf(close, contentStart);
  if (end === -1) throw new Error('CLOSE MARKER NOT FOUND after: ' + JSON.stringify(open));
  c = c.slice(0, contentStart) + newContent + c.slice(end);
}

// ── A. Titre bouton scenario ───────────────────────────────────────────────
rep(
  'Et si votre chien avait un incident grave&nbsp;?',
  'Pour comprendre : zoom sur UN incident chirurgical'
);

// ── B. Intro bloc scenario — replace entire paragraph content ────────────
repBetween(
  '<p class="scenario-intro">',
  '</p>',
  '\n' +
  '                    <strong>Focus indépendant du calcul ci-dessus.</strong> ' +
  'Pour un <strong id="scenario-size">chien</strong>, ' +
  'voici ce que représente UN incident chirurgical isolé. ' +
  'Exemple : <strong id="scenario-name">chirurgie</strong> ' +
  'à <strong id="scenario-cost">—</strong>.\n' +
  '                  '
);

// ── C. Note scenario — replace entire paragraph content ──────────────────
repBetween(
  '<p class="scenario-note">',
  '</p>',
  '\n' +
  '                    Ce focus montre ce que coûte UN incident <em>le jour J</em>, ' +
  'indépendamment de la fréquence prévue. ' +
  "L'estimation globale, elle, suppose " +
  '<strong id="scenario-note-count">2</strong> incident(s) répartis sur 12 ans. ' +
  "C'est exactement la valeur de l'assurance : " +
  'éviter un pic financier brutal au moment où il arrive.\n' +
  '                  '
);

// ── D. Injection noteCountEl dans updateScenario ───────────────────────────
rep(
  "  document.getElementById('scenario-save').textContent = eur(scenario.cost - remaining);\n}",
  "  document.getElementById('scenario-save').textContent = eur(scenario.cost - remaining);\n" +
  "  const noteCountEl = document.getElementById('scenario-note-count');\n" +
  "  if (noteCountEl) noteCountEl.textContent = '2'; // valeur fixe pour ce lot\n}"
);

// ── E1. Tooltip alimentation — repBetween with unique context ─────────────
repBetween(
  'Alimentation <span class="br-info" data-tip="',
  '" aria-label=',
  'Croquettes (standard, premium ou véto selon votre choix), friandises et compléments alimentaires. Hors petites gourmandises ponctuelles. Source : FACCO 2025.'
);

// ── E2. Tooltip vétérinaire ────────────────────────────────────────────────
repBetween(
  'Vétérinaire <span class="br-info" data-tip="',
  '" aria-label=',
  'Inclut TOUT le véto : consultations, vaccins annuels, vermifuges, antiparasitaires, stérilisation/castration, plus une provision pour chirurgies/hospitalisations/radios amortie sur 12 ans selon le profil de risque de la race.'
);

// ── E3. Tooltip assurance ─────────────────────────────────────────────────
repBetween(
  'Assurance <span class="br-info" data-tip="',
  '" aria-label=',
  "Cotisation annuelle nette de la formule choisie (Éco ou Complète). Le remboursement vétérinaire (30% à 85% des frais selon formule) est déjà appliqué sur la ligne « Vétérinaire » au-dessus."
);

// ── E4. Tooltip accessoires ───────────────────────────────────────────────
repBetween(
  'Accessoires <span class="br-info" data-tip="',
  '" aria-label=',
  'Panier, laisses, harnais, gamelles, jouets, kit de toilettage. Renouvellement estimé tous les 3-5 ans.'
);

// ── E5. Tooltip garde & services ─────────────────────────────────────────
repBetween(
  'Garde &amp; services <span class="br-info" data-tip="',
  '" aria-label=',
  "Pension pendant vos vacances, dog-walking, toilettage professionnel, éducation. Volume variable selon votre niveau d'équipement (essentiel/confort/premium)."
);

// ── Écriture atomique ─────────────────────────────────────────────────────
const tmp = p + '.tmp';
writeFileSync(tmp, c, 'utf8');
renameSync(tmp, p);
const lines = c.split('\n').length;
console.log('OK — 9 remplacements appliqués, ' + c.length + ' octets, ' + lines + ' lignes');
