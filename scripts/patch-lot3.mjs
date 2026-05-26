import { readFileSync, writeFileSync, renameSync } from 'fs';

const p = 'src/components/CoutCalculateur.astro';
let c = readFileSync(p, 'utf8');

function rep(anchor, replacement) {
  if (!c.includes(anchor)) throw new Error('ANCHOR NOT FOUND: ' + JSON.stringify(anchor.slice(0, 80)));
  const idx = c.indexOf(anchor);
  c = c.slice(0, idx) + replacement + c.slice(idx + anchor.length);
}

// ── A. HTML adjuster — insert before compare-block ───────────────────────
const HTML_ADJUSTER =
`              <!-- ── Adjusteur d'hypothèse incidents (Niveau 2) ── -->
              <div class="incident-adjuster" id="incident-adjuster">
                <div class="incident-adjuster-head">
                  <span class="incident-adjuster-title">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.4"/><path d="M8 4.5v4M8 11h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                    Hypothèse incidents chirurgicaux sur 12 ans
                  </span>
                </div>
                <div class="incident-adjuster-control">
                  <button type="button" class="incident-btn" id="incident-minus" aria-label="Diminuer le nombre d'incidents">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                  </button>
                  <span class="incident-value" id="incident-count">2</span>
                  <span class="incident-unit" id="incident-unit">incidents</span>
                  <button type="button" class="incident-btn" id="incident-plus" aria-label="Augmenter le nombre d'incidents">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 3v8M3 7h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                  </button>
                </div>
                <p class="incident-adjuster-note">
                  💡 Notre estimation pour <strong id="incident-race-label">votre chien</strong> est de <strong id="incident-default-value">2</strong> incident(s) sur 12 ans. Faites varier ce nombre pour tester votre propre hypothèse — tous les chiffres s'adaptent.
                </p>
              </div>

`;

rep(
  '              <div class="compare-block" id="compare-block">',
  HTML_ADJUSTER + '              <div class="compare-block" id="compare-block">'
);

// ── B. CSS adjuster — insert before </style> ──────────────────────────────
const CSS_ADJUSTER =
`
  /* Adjusteur d'hypothèse incidents (Niveau 2) */
  .incident-adjuster {
    margin: 18px 28px;
    padding: 14px 16px;
    background: var(--c-green-50, #f4fbf8);
    border: 1px solid var(--c-green-200, #d4ede5);
    border-radius: 12px;
  }
  .incident-adjuster-head { margin-bottom: 10px; font-size: 13px; }
  .incident-adjuster-title {
    display: inline-flex; align-items: center; gap: 8px;
    font-weight: 600; color: var(--c-green-800, #0A5443);
  }
  .incident-adjuster-title svg { color: var(--c-green, #1D9E75); flex-shrink: 0; }
  .incident-adjuster-control {
    display: flex; align-items: center; gap: 12px;
    margin: 10px 0;
  }
  .incident-btn {
    width: 34px; height: 34px;
    display: inline-flex; align-items: center; justify-content: center;
    background: #fff; border: 1px solid var(--c-line, #e7eae8);
    border-radius: 8px; color: var(--c-green-700, #0F6E56);
    cursor: pointer;
    transition: background .15s, border-color .15s, opacity .15s;
  }
  .incident-btn:hover:not(:disabled) {
    background: var(--c-green-100, #e7f5ee);
    border-color: var(--c-green, #1D9E75);
  }
  .incident-btn:disabled { opacity: .35; cursor: not-allowed; }
  .incident-value {
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 28px; font-weight: 700;
    color: var(--c-green-800, #0A5443);
    min-width: 36px; text-align: center;
    font-variant-numeric: tabular-nums;
  }
  .incident-unit { font-size: 13px; color: var(--c-ink-2, #3d4a45); }
  .incident-adjuster-note {
    font-size: 12.5px; line-height: 1.5;
    color: var(--c-ink-2, #3d4a45);
    margin: 8px 0 0;
  }
  .incident-adjuster-note strong { color: var(--c-green-700, #0F6E56); font-weight: 600; }
  @media (max-width: 600px) { .incident-adjuster { margin: 18px 20px; } }
`;

rep(
  '</style>\n\n<script is',
  CSS_ADJUSTER + '\n</style>\n\n<script is'
);

// ── C. Fonctions JS — insert before resetIncidentToDefault ───────────────
const JS_FUNCTIONS =
`/* ───── Affichage de l'adjusteur d'incidents ───── */
function updateIncidentDisplay() {
  const valEl = document.getElementById('incident-count');
  const unitEl = document.getElementById('incident-unit');
  if (valEl) valEl.textContent = String(incidentCount);
  if (unitEl) unitEl.textContent = incidentCount === 1 ? 'incident' : 'incidents';
  const minus = document.getElementById('incident-minus');
  const plus = document.getElementById('incident-plus');
  if (minus) minus.disabled = (incidentCount <= INCIDENT_MIN);
  if (plus) plus.disabled = (incidentCount >= INCIDENT_MAX);
}

function initIncidentAdjuster() {
  const minusBtn = document.getElementById('incident-minus');
  const plusBtn = document.getElementById('incident-plus');
  if (!minusBtn || !plusBtn) return;
  minusBtn.addEventListener('click', function() {
    if (incidentCount > INCIDENT_MIN) {
      incidentCount--;
      updateIncidentDisplay();
      scheduleCompute();
    }
  });
  plusBtn.addEventListener('click', function() {
    if (incidentCount < INCIDENT_MAX) {
      incidentCount++;
      updateIncidentDisplay();
      scheduleCompute();
    }
  });
  updateIncidentDisplay();
}

`;

rep(
  'function resetIncidentToDefault(race) {',
  JS_FUNCTIONS + 'function resetIncidentToDefault(race) {'
);

// ── D. resetIncidentToDefault — appel updateIncidentDisplay avant } ───────
rep(
  "  if (raceEl) raceEl.textContent = race ? race.nom : 'votre chien';\n}",
  "  if (raceEl) raceEl.textContent = race ? race.nom : 'votre chien';\n  updateIncidentDisplay();\n}"
);

// ── E. DOMContentLoaded — initIncidentAdjuster après initScenarioToggle ──
rep(
  '  initScenarioToggle();\n',
  '  initScenarioToggle();\n  initIncidentAdjuster();\n'
);

// ── Écriture atomique ─────────────────────────────────────────────────────
const tmp = p + '.tmp';
writeFileSync(tmp, c, 'utf8');
renameSync(tmp, p);
const lines = c.split('\n').length;
console.log('OK — 5 remplacements appliqués, ' + c.length + ' octets, ' + lines + ' lignes');
