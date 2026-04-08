import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

// All corrections: [regex_or_string, replacement]
// Using regex for word-boundary precision, string for exact phrases
const corrections = [
  // ─── é ───────────────────────────────────────────────────────────────────
  [/\bdeclare\b/g, "déclare"],
  [/\bdeclares\b/g, "déclarés"],
  [/\bdeclaree\b/g, "déclarée"],
  [/\bdeclarees\b/g, "déclarées"],
  [/\bdeclarent\b/g, "déclarent"],
  [/\bdeclaration\b/g, "déclaration"],
  [/\bdefinitive\b/g, "définitive"],
  [/\bdefinitives\b/g, "définitives"],
  [/\bdefinitif\b/g, "définitif"],
  [/\bdefinitivement\b/g, "définitivement"],
  [/\bbeneficie\b/g, "bénéficie"],
  [/\bbeneficiera\b/g, "bénéficiera"],
  [/\bbeneficieront\b/g, "bénéficieront"],
  [/\bbeneficier\b/g, "bénéficier"],
  [/\bbeneficer\b/g, "bénéficier"],
  [/\bmedicament\b/g, "médicament"],
  [/\bmedicaments\b/g, "médicaments"],
  [/\bmedicamenteuse\b/g, "médicamenteuse"],
  [/\bmedicamenteux\b/g, "médicamenteux"],
  [/\bproprietaire\b/g, "propriétaire"],
  [/\bproprietaires\b/g, "propriétaires"],
  [/\badapte\b/g, "adapté"],
  [/\badaptee\b/g, "adaptée"],
  [/\badaptes\b/g, "adaptés"],
  [/\badaptees\b/g, "adaptées"],
  [/\bgenomique\b/g, "génomique"],
  [/\bgenetique\b/g, "génétique"],
  [/\bgenetiques\b/g, "génétiques"],
  [/\bpresente\b/g, "présente"],
  [/\bpresentes\b/g, "présentes"],
  [/\bpresents\b/g, "présents"],
  [/\bmodere\b/g, "modéré"],
  [/\bModeree?\b/g, "Modéré"],
  [/\bmoderee\b/g, "modérée"],
  [/\bmoderes\b/g, "modérés"],
  [/\bmodereement\b/g, "modérément"],
  [/\beleve\b/g, "élevé"],
  [/\belevee\b/g, "élevée"],
  [/\beleves\b/g, "élevés"],
  [/\beleveees?\b/g, "élevées"],
  [/\bpasse\b(?= ce |\b[45]\b)/g, "passé"],  // "Passé ce seuil" / "Passé 4 ans"
  [/\bPasse\b(?= ce |\b[45]\b)/g, "Passé"],
  [/\bentree\b/g, "entrée"],
  [/\bhydrocephalie\b/g, "hydrocéphalie"],
  [/\bcongenitale\b/g, "congénitale"],
  [/\bcongenital\b/g, "congénital"],
  [/\bnecessite\b/g, "nécessite"],
  [/\bnecessitent\b/g, "nécessitent"],
  [/\bnecessiter\b/g, "nécessiter"],
  [/\bnecessitant\b/g, "nécessitant"],
  [/\bfinancierement\b/g, "financièrement"],
  [/\bfinancier\b/g, "financier"],
  [/\bfinanciere\b/g, "financière"],
  [/\bfinanciers\b/g, "financiers"],
  [/\bexclure\b/g, "exclure"],
  [/\bprecede\b/g, "précède"],
  [/\bpreceder\b/g, "précéder"],
  [/\bprecedent\b/g, "précédent"],
  [/\bprecedente\b/g, "précédente"],
  [/\bassure\b(?!mon|MonChien)/g, "assuré"],
  [/\bassures\b/g, "assurés"],
  [/\bassureee?\b/g, "assurée"],
  [/\bassureur\b/g, "assureur"],
  [/\bassureurs\b/g, "assureurs"],
  [/\bdevelope\b/g, "développe"],
  [/\bdeveloppee?\b/g, "développée"],
  [/\bdeveloppent\b/g, "développent"],
  [/\bdeveloppee\b/g, "développée"],
  [/\bdeveloppe\b/g, "développe"],
  [/\bspecialisee\b/g, "spécialisée"],
  [/\bspecialisees\b/g, "spécialisées"],
  [/\bspecialise\b/g, "spécialisé"],
  [/\bspecialises\b/g, "spécialisés"],
  [/\bspecialisation\b/g, "spécialisation"],
  [/\borthopedique\b/g, "orthopédique"],
  [/\borthopediques\b/g, "orthopédiques"],
  [/\borthopedique\b/g, "orthopédique"],
  [/\borthopedies\b/g, "orthopédies"],
  [/\bprecoce\b/g, "précoce"],
  [/\bprecocement\b/g, "précocement"],
  [/\bprecoces\b/g, "précoces"],
  [/\bidealement\b/g, "idéalement"],
  [/\bideal\b/g, "idéal"],
  [/\bideale\b/g, "idéale"],
  [/\btracheal\b/g, "trachéal"],
  [/\btracheal\b/g, "trachéal"],
  [/\bintegralite\b/g, "intégralité"],
  [/\bintegrale\b/g, "intégrale"],
  [/\bintegral\b/g, "intégral"],
  [/\blethale?\b/g, "létale"],
  [/\bretinienne\b/g, "rétinienne"],
  [/\bretiniennes\b/g, "rétiniennes"],
  [/\bretinien\b/g, "rétinien"],
  [/\bprothese\b/g, "prothèse"],
  [/\bprotheses\b/g, "prothèses"],
  [/\bactivites\b/g, "activités"],
  [/\bactivite\b/g, "activité"],
  [/\bfacilement\b/g, "facilement"],  // already ok but safe
  [/\bdecollement\b/g, "décollement"],
  [/\bdecompression\b/g, "décompression"],
  [/\bpyreneen\b/g, "pyrénéen"],
  [/\bpyreneens\b/g, "pyrénéens"],
  [/\bpyreneenne\b/g, "pyrénéenne"],
  [/\bpyrenees\b(?! des)/gi, "Pyrénées"],
  [/\bgeant\b/g, "géant"],
  [/\bgeante\b/g, "géante"],
  [/\bgeants\b/g, "géants"],
  [/\bgeantes\b/g, "géantes"],
  [/\blegende\b/g, "légende"],
  [/\blegendaire\b/g, "légendaire"],
  [/\blegendaires\b/g, "légendaires"],
  [/\bosteosarcome\b/g, "ostéosarcome"],
  [/\bosteosarcomes\b/g, "ostéosarcomes"],
  [/\bannee\b/g, "année"],
  [/\bannees\b/g, "années"],
  [/\bdecennie\b/g, "décennie"],
  [/\bdecennies\b/g, "décennies"],
  [/\bvigile\b/g, "vigilance"],
  [/\bveterines?\b/g, "vétérinaire"],
  [/\bathletes?\b/g, "athlète"],
  [/\bathletes\b/g, "athlètes"],
  [/\bathetiques?\b/g, "athlétique"],
  [/\bletale\b/g, "létale"],
  [/\bsaisonniere\b/g, "saisonnière"],
  [/\bsaisonniers\b/g, "saisonniers"],
  [/\bendemique\b/g, "endémique"],
  [/\bdiagnostiquee\b/g, "diagnostiquée"],
  [/\bdiagnostiques\b/g, "diagnostiqués"],
  [/\bdiagnostique\b/g, "diagnostique"],  // ambiguous but generally ok
  [/\bdiagnostiquee\b/g, "diagnostiquée"],
  [/\bdiagnostiquees\b/g, "diagnostiquées"],
  [/\bdiagnostique\b(?! différentiel)/g, "diagnostique"],
  [/\bcouteux\b/g, "coûteux"],
  [/\bcouteuse\b/g, "coûteuse"],
  [/\bcouteuses\b/g, "coûteuses"],
  [/\bcoute\b/g, "coûte"],
  [/\bcouteront\b/g, "coûteront"],
  [/\bcoutera\b/g, "coûtera"],
  [/\bLe cout\b/g, "Le coût"],
  [/\bun cout\b/g, "un coût"],
  [/\bson cout\b/g, "son coût"],
  [/\bcout\b/g, "coût"],
  [/\bCout\b/g, "Coût"],
  [/\bcouts\b/g, "coûts"],
  [/\bsiecle\b/g, "siècle"],
  [/\bsiecles\b/g, "siècles"],
  [/\bindependante\b/g, "indépendante"],
  [/\bindependant\b/g, "indépendant"],
  [/\bprotheses\b/g, "prothèses"],
  [/\bprothese\b/g, "prothèse"],
  [/\bprecise\b/g, "précise"],
  [/\bprecises\b/g, "précises"],
  [/\bpreciser\b/g, "préciser"],
  [/\bsurete\b/g, "sûreté"],
  [/\bprecise\b/g, "précise"],
  [/\bprecedente\b/g, "précédente"],
  [/\bprecedents\b/g, "précédents"],

  // ─── è ────────────────────────────────────────────────────────────────────
  [/\bfenetre\b/g, "fenêtre"],
  [/\bfenetres\b/g, "fenêtres"],

  // ─── à ────────────────────────────────────────────────────────────────────
  [/\ba des medicaments\b/g, "à des médicaments"],
  [/\ba haut risque\b/g, "à haut risque"],
  [/\ba des traumatismes\b/g, "à des traumatismes"],
  [/\ba cette taille\b/g, "à cette taille"],
  [/\bA cette taille\b/g, "À cette taille"],
  [/\ba 2 500-3 000 euros\b/g, "à 2 500-3 000 euros"],
  [/\ba 1 500-3 500 euros\b/g, "à 1 500-3 500 euros"],
  [/\ba 3 000-5 000 euros\b/g, "à 3 000-5 000 euros"],
  [/\ba \d{1,2} euros\/mois\b/g, (m) => m.replace(/^a /, "à ")],
  [/\ba 40 euros\/mois\b/g, "à 40 euros/mois"],
  [/\ba 20 a 40 %\b/g, "à 20 à 40 %"],
  [/\bde 20 a 40\b/g, "de 20 à 40"],
  [/\ba long terme\b/g, "à long terme"],
  [/\ba court terme\b/g, "à court terme"],
  [/\ba vie\b(?! activ)/g, "à vie"],
  [/\bgrâce à\b/g, "grâce à"],  // already ok
  [/\bgrace a\b/g, "grâce à"],
  [/\bidealement avant\b/g, "idéalement avant"],
  [/\ba cette race\b/g, "à cette race"],

  // ─── ç ────────────────────────────────────────────────────────────────────
  [/\bfrancais\b/g, "français"],
  [/\bfrancaise\b/g, "française"],
  [/\bfrancaises\b/g, "françaises"],
  [/\bFrancais\b/g, "Français"],
  [/\bFrancaise\b/g, "Française"],
  [/\bFrancaises\b/g, "Françaises"],

  // ─── ô ────────────────────────────────────────────────────────────────────
  [/\bdos\b/g, "dos"],  // safe
  [/\btracheal\b/g, "trachéal"],

  // ─── specific multi-word phrases that are hard to catch with simple regex ─
];

const files = [
  ...readdirSync("src/pages/races").filter(f => f.endsWith(".astro")).map(f => join("src/pages/races", f)),
  "src/pages/index.astro",
  "src/layouts/PageRace.astro",
  "src/layouts/Layout.astro",
  "src/pages/mentions-legales.astro",
  "src/pages/confidentialite.astro",
  "src/pages/affiliation.astro",
];

let totalFixed = 0;

for (const filePath of files) {
  let content;
  try {
    content = readFileSync(filePath, "utf8");
  } catch {
    // file may not exist
    continue;
  }
  const original = content;

  for (const [pattern, replacement] of corrections) {
    if (typeof pattern === "string") {
      content = content.split(pattern).join(replacement);
    } else {
      content = content.replace(pattern, replacement);
    }
  }

  if (content !== original) {
    writeFileSync(filePath, content, "utf8");
    console.log("FIXED " + filePath.split(/[\\/]/).pop());
    totalFixed++;
  }
}

console.log(`\nDone. ${totalFixed} files updated.`);
