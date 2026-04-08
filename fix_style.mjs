import { readFileSync, writeFileSync } from "fs";

function fix(filePath, replacements) {
  let content = readFileSync(filePath, "utf8");
  const original = content;
  for (const [from, to] of replacements) {
    if (!content.includes(from)) {
      console.warn("  WARN not found in " + filePath.split(/[\\/]/).pop() + ": " + from.slice(0, 60));
      continue;
    }
    content = content.split(from).join(to);
  }
  if (content !== original) {
    writeFileSync(filePath, content, "utf8");
    console.log("FIXED " + filePath.split(/[\\/]/).pop());
  }
}

const r = "src/pages/races/";
const l = "src/layouts/";

// ── bouledogue-francais ────────────────────────────────────────────────────
fix(r + "bouledogue-francais.astro", [
  // "Il est indispensable de souscrire" → action directe
  [
    "Il est indispensable de souscrire avant 12 mois, avant toute consultation specialisee qui pourrait creer un antecedent médical.",
    "Souscrivez avant 12 mois, avant toute consultation spécialisée. Le moindre antécédent médical documenté ferme la porte à la couverture chirurgicale."
  ],
  // "indispensable" dans description pathologie
  [
    "Chirurgie corrective souvent indispensable.",
    "Chirurgie corrective souvent nécessaire."
  ],
]);

// ── boxer ─────────────────────────────────────────────────────────────────
fix(r + "boxer.astro", [
  [
    "Le suivi cardio annuel et une assurance active avant tout symptôme restent indispensables.",
    "Le suivi cardio annuel et une assurance active avant tout symptôme restent la seule vraie garantie."
  ],
  [
    "Une formule couvrant cardiologie et cancers est indispensable pour une protection reelle face aux pathologies caracteristiques de la race.",
    "Une formule couvrant cardiologie et cancers s'impose. C'est le minimum face aux pathologies caractéristiques de la race."
  ],
]);

// ── chow-chow ─────────────────────────────────────────────────────────────
fix(r + "chow-chow.astro", [
  [
    "il est crucial de souscrire avant le premier examen ophtalmologique de routine.",
    "souscrire avant le premier examen ophtalmologique de routine est impératif."
  ],
]);

// ── épagneul breton ───────────────────────────────────────────────────────
fix(r + "epagneul-breton.astro", [
  [
    "L'Épagneul Breton est une race robuste prédisposée à l'épilepsie héréditaire et aux traumatismes de terrain.",
    "L'Épagneul Breton est un chien de terrain résistant, prédisposé à l'épilepsie héréditaire et aux traumatismes de chasse."
  ],
]);

// ── golden retriever ──────────────────────────────────────────────────────
fix(r + "golden-retriever.astro", [
  [
    "Surveillance cardiologique régulière indispensable.",
    "Surveillance cardiologique régulière obligatoire."
  ],
]);

// ── jack russell ──────────────────────────────────────────────────────────
fix(r + "jack-russell.astro", [
  // description meta
  [
    "Le Jack Russell est une race robuste et longévive mais prédisposée à la luxation de la rotule et à la maladie de Legg-Calvé-Perthes.",
    "Le Jack Russell est un terrier résistant et longévif, prédisposé à la luxation de la rotule et à la maladie de Legg-Calvé-Perthes."
  ],
  // FAQ : "race robuste, mais..."
  [
    "C'est une race robuste, mais avec des prédispositions spécifiques",
    "Résistant par nature, mais avec des prédispositions bien documentées"
  ],
  // FAQ : "crucial"
  [
    "ce qui est crucial pour une race aussi longévive.",
    "un avantage décisif pour une race qui peut vivre 17 ans."
  ],
]);

// ── labrador ──────────────────────────────────────────────────────────────
fix(r + "labrador.astro", [
  [
    "Intervention chirurgicale d'urgence indispensable en moins de 6 heures.",
    "Intervention chirurgicale d'urgence requise en moins de 6 heures."
  ],
  [
    "Chirurgie immédiate indispensable avec risque de récidive.",
    "Chirurgie immédiate requise, avec risque de récidive."
  ],
]);

// ── malinois ──────────────────────────────────────────────────────────────
fix(r + "malinois.astro", [
  [
    "Le Malinois est l'une des races les plus robustes mais reste exposé à la dysplasie de hanche et à l'épilepsie.",
    "Le Malinois est l'une des races les plus athlétiques, mais reste exposé à la dysplasie de hanche et à l'épilepsie."
  ],
]);

// ── montagne des pyrénées ─────────────────────────────────────────────────
fix(r + "montagne-des-pyrenees.astro", [
  [
    "la Montagne des Pyrénées est une race robuste. Sa taille imposante",
    "la Montagne des Pyrénées est une race solide et endurcissante. Sa taille imposante"
  ],
]);

// ── teckel ────────────────────────────────────────────────────────────────
fix(r + "teckel.astro", [
  [
    "Le Teckel est la race qui illustre le mieux le decalage entre apparence robuste et fragilite structurelle.",
    "Le Teckel est la race qui illustre le mieux le décalage entre une silhouette anodine et une fragilité structurelle réelle."
  ],
]);

// ── races/index.astro ─────────────────────────────────────────────────────
fix(r + "index.astro", [
  [
    "Couverture chirurgie indispensable.",
    "Couverture chirurgie fortement recommandée."
  ],
  [
    "<h3>Petites races robustes</h3>",
    "<h3>Petites races résistantes</h3>"
  ],
]);

console.log("\nDone.");
