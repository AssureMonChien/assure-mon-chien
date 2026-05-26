import { readFileSync, writeFileSync, renameSync } from 'fs';

const p = 'src/components/CoutCalculateur.astro';
let c = readFileSync(p, 'utf8');

function rep(anchor, replacement) {
  if (!c.includes(anchor)) throw new Error('ANCHOR NOT FOUND: ' + JSON.stringify(anchor.slice(0, 80)));
  const idx = c.indexOf(anchor);
  c = c.slice(0, idx) + replacement + c.slice(idx + anchor.length);
}

// ── A. Remplacer INCIDENT_PROB_BY_RISK par les nouvelles constantes + état ──
rep(
  'const INCIDENT_PROB_BY_RISK = { faible: 0.25, modere: 0.55, eleve: 2.00 };',
  '/* Nombre d\'incidents chirurgicaux par défaut sur 12 ans, selon profil race. */\n' +
  'const INCIDENT_DEFAULT_BY_RISK = { faible: 0, modere: 1, eleve: 2 };\n' +
  'const INCIDENT_MIN = 0;\n' +
  'const INCIDENT_MAX = 6;\n' +
  'let incidentCount = 2; /* État ajustable ; réinitialisé au défaut race à chaque sélection */'
);

// ── B. Adapter compute() ─────────────────────────────────────────────────
rep(
  '  const incidentRisk = race ? INCIDENT_PROB_BY_RISK[race.risque] : 0.40;',
  '  /* incidentCount est l\'hypothèse en cours (défaut race ou override utilisateur) */\n' +
  '  const incidentRisk = incidentCount;'
);

// ── C. Ajouter resetIncidentToDefault juste avant initRaceCombo ──────────
rep(
  'function initRaceCombo()',
  '/* ───── Reset incidentCount au défaut race ───── */\n' +
  'function resetIncidentToDefault(race) {\n' +
  '  const defaultValue = race ? INCIDENT_DEFAULT_BY_RISK[race.risque] : 1;\n' +
  '  incidentCount = defaultValue;\n' +
  '  /* Note : les éléments DOM incident-default-value / incident-race-label seront ajoutés au Lot 3.\n' +
  '     Le guard if(el) évite l\'erreur quand ils n\'existent pas encore. */\n' +
  '  const defaultEl = document.getElementById(\'incident-default-value\');\n' +
  '  const raceEl = document.getElementById(\'incident-race-label\');\n' +
  '  if (defaultEl) defaultEl.textContent = String(defaultValue);\n' +
  '  if (raceEl) raceEl.textContent = race ? race.nom : \'votre chien\';\n' +
  '}\n' +
  '\n' +
  'function initRaceCombo()'
);

// ── D. Appeler resetIncidentToDefault dans selectRace ────────────────────
rep(
  '    hideTailleFieldset();\n    scheduleCompute();\n  }\n\n  function selectOther()',
  '    hideTailleFieldset();\n    resetIncidentToDefault(r);\n    scheduleCompute();\n  }\n\n  function selectOther()'
);

// ── E. Appeler resetIncidentToDefault dans selectOther ───────────────────
rep(
  '    showTailleFieldset();\n    scheduleCompute();\n  }\n\n  input.addEventListener(\'focu',
  '    showTailleFieldset();\n    resetIncidentToDefault(null);\n    scheduleCompute();\n  }\n\n  input.addEventListener(\'focu'
);

// ── F. Appeler resetIncidentToDefault dans le clear button ───────────────
rep(
  '    showTailleFieldset();\n    input.focus();',
  '    showTailleFieldset();\n    resetIncidentToDefault(null);\n    input.focus();'
);

// ── G. Mettre à jour updateScenario — dynamique via incidentCount ─────────
rep(
  "  if (noteCountEl) noteCountEl.textContent = '2'; // valeur fixe pour ce lot",
  '  if (noteCountEl) noteCountEl.textContent = String(incidentCount);'
);

// ── Écriture atomique ─────────────────────────────────────────────────────
const tmp = p + '.tmp';
writeFileSync(tmp, c, 'utf8');
renameSync(tmp, p);
const lines = c.split('\n').length;
console.log('OK — 7 remplacements appliqués, ' + c.length + ' octets, ' + lines + ' lignes');
