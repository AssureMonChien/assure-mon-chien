import { readFileSync, writeFileSync } from "fs";
import { readdirSync } from "fs";
import { join } from "path";

const dir = "src/pages/races";
const files = readdirSync(dir).filter(f => f.endsWith(".astro"));

// Each entry: [regex, replacement]
// Order matters: longer/more-specific first where needed
const corrections = [
  // ——— é ———
  [/\bepilepsie\b/g, "épilepsie"],
  [/\bEpilepsie\b/g, "Épilepsie"],
  [/\bepileptique\b/g, "épileptique"],
  [/\bepileptiques\b/g, "épileptiques"],
  [/\bepileptiforme\b/g, "épileptiforme"],
  [/\bhereditaire\b/g, "héréditaire"],
  [/\bHereditaire\b/g, "Héréditaire"],
  [/\bhereditaires\b/g, "héréditaires"],
  [/\bgenerale\b/g, "générale"],
  [/\bgenerales\b/g, "générales"],
  [/\bgeneralement\b/g, "généralement"],
  [/\bgeneral\b/g, "général"],
  [/\bgeneraux\b/g, "généraux"],
  [/\bveterinaire\b/g, "vétérinaire"],
  [/\bVeterinaire\b/g, "Vétérinaire"],
  [/\bveterinaires\b/g, "vétérinaires"],
  [/\bVeterinaires\b/g, "Vétérinaires"],
  [/\bfrequente\b/g, "fréquente"],
  [/\bfrequentes\b/g, "fréquentes"],
  [/\bfrequent\b/g, "fréquent"],
  [/\bfrequents\b/g, "fréquents"],
  [/\bfrequemment\b/g, "fréquemment"],
  [/\bspecifique\b/g, "spécifique"],
  [/\bspecifiques\b/g, "spécifiques"],
  [/\bspecifiquement\b/g, "spécifiquement"],
  [/\bdifferent\b/g, "différent"],
  [/\bdifferents\b/g, "différents"],
  [/\bdifferente\b/g, "différente"],
  [/\bdifferentes\b/g, "différentes"],
  [/\bdifference\b/g, "différence"],
  [/\bdifferences\b/g, "différences"],
  [/\bsante\b/g, "santé"],
  [/\bSante\b/g, "Santé"],
  [/\bprevention\b/g, "prévention"],
  [/\bPrevention\b/g, "Prévention"],
  [/\bpreventif\b/g, "préventif"],
  [/\bpreventive\b/g, "préventive"],
  [/\bprévention\b/g, "prévention"], // already correct, no-op
  [/\bdegenerative\b/g, "dégénérative"],
  [/\bdegeneratif\b/g, "dégénératif"],
  [/\bdegenerescence\b/g, "dégénérescence"],
  [/\bdegenere\b/g, "dégénère"],
  [/\bsevere\b/g, "sévère"],
  [/\bseveres\b/g, "sévères"],
  [/\bseverite\b/g, "sévérité"],
  [/\bmedecin\b/g, "médecin"],
  [/\bmedecins\b/g, "médecins"],
  [/\bmedecine\b/g, "médecine"],
  [/\bMedecine\b/g, "Médecine"],
  [/\bmedical\b/g, "médical"],
  [/\bmedicale\b/g, "médicale"],
  [/\bmedicales\b/g, "médicales"],
  [/\bmedicaux\b/g, "médicaux"],
  [/\bmedication\b/g, "médication"],
  [/\bremede\b/g, "remède"],
  [/\bremedes\b/g, "remèdes"],
  [/\bsymptome\b/g, "symptôme"],
  [/\bsymptomes\b/g, "symptômes"],
  [/\beleveur\b/g, "éleveur"],
  [/\beleveurs\b/g, "éleveurs"],
  [/\beleveuse\b/g, "éleveuse"],
  [/\belevage\b/g, "élevage"],
  [/\bElevage\b/g, "Élevage"],
  [/\benergie\b/g, "énergie"],
  [/\benergetique\b/g, "énergétique"],
  [/\benergique\b/g, "énergique"],
  [/\bexamen\b/g, "examen"], // already correct
  [/\bequilibre\b/g, "équilibre"],
  [/\bequilibrer\b/g, "équilibrer"],
  [/\bexclusion\b/g, "exclusion"], // already correct
  [/\bepagneul\b/g, "épagneul"],
  [/\bEpagneul\b/g, "Épagneul"],
  [/\bepaulement\b/g, "épaulement"],
  [/\bepiderme\b/g, "épiderme"],
  [/\bretrecissement\b/g, "rétrécissement"],
  [/\brecidive\b/g, "récidive"],
  [/\brecidives\b/g, "récidives"],
  [/\brecurrent\b/g, "récurrent"],
  [/\brecurrents\b/g, "récurrents"],
  [/\brecurrente\b/g, "récurrente"],
  [/\brecurrentes\b/g, "récurrentes"],
  [/\brecidivant\b/g, "récidivant"],
  [/\brecidivante\b/g, "récidivante"],
  [/\brecidivantes\b/g, "récidivantes"],
  [/\breparation\b/g, "réparation"],
  [/\breparations\b/g, "réparations"],
  [/\breseau\b/g, "réseau"],
  [/\breseaux\b/g, "réseaux"],
  [/\bregime\b/g, "régime"],
  [/\bregimes\b/g, "régimes"],
  [/\bregulier\b/g, "régulier"],
  [/\breguliere\b/g, "régulière"],
  [/\breguliers\b/g, "réguliers"],
  [/\bregulierement\b/g, "régulièrement"],
  [/\bregulierement\b/g, "régulièrement"],
  [/\bdetection\b/g, "détection"],
  [/\bdetecte\b/g, "détecte"],
  [/\bdetecte\b/g, "détecté"],
  [/\bdetection\b/g, "détection"],
  [/\bdetectees\b/g, "détectées"],
  [/\bdetectee\b/g, "détectée"],
  [/\bdetectable\b/g, "détectable"],
  [/\bdetectables\b/g, "détectables"],
  [/\bdepistage\b/g, "dépistage"],
  [/\bDepistage\b/g, "Dépistage"],
  [/\bdepister\b/g, "dépister"],
  [/\bdepisté\b/g, "dépisté"],
  [/\bdeveloppement\b/g, "développement"],
  [/\bdeveloppements\b/g, "développements"],
  [/\bdevelopper\b/g, "développer"],
  [/\bdeveloppe\b/g, "développe"],
  [/\bpredisposition\b/g, "prédisposition"],
  [/\bpredispositions\b/g, "prédispositions"],
  [/\bpredispose\b/g, "prédispose"],
  [/\bpredisposes\b/g, "prédisposés"],
  [/\btelephone\b/g, "téléphone"],
  [/\btelephones\b/g, "téléphones"],
  [/\bteleconsultation\b/g, "téléconsultation"],
  [/\bTeleconsultation\b/g, "Téléconsultation"],
  [/\btreatement\b/g, "traitement"],
  [/\btraitement\b/g, "traitement"], // already correct
  [/\btumeur\b/g, "tumeur"], // already correct
  [/\btumeurs\b/g, "tumeurs"], // already correct
  [/\bexpertise\b/g, "expertise"], // already correct
  [/\bexpert\b/g, "expert"], // already correct
  [/\benterite\b/g, "entérite"],
  [/\benteropathie\b/g, "entéropathie"],
  [/\bEnteropathie\b/g, "Entéropathie"],
  [/\bexclure\b/g, "exclure"], // already correct
  [/\bentretien\b/g, "entretien"], // already correct

  // ——— è ———
  [/\bpresence\b/g, "présence"],
  [/\bpresences\b/g, "présences"],
  [/\bprobleme\b/g, "problème"],
  [/\bproblemes\b/g, "problèmes"],
  [/\bProbleme\b/g, "Problème"],
  [/\bProblemes\b/g, "Problèmes"],
  [/\btroisieme\b/g, "troisième"],
  [/\bpremiere\b/g, "première"],
  [/\bpremier\b/g, "premier"], // already correct
  [/\bdeuxieme\b/g, "deuxième"],
  [/\bcomplete\b/g, "complète"],
  [/\bcompletes\b/g, "complètes"],
  [/\bconsequence\b/g, "conséquence"],
  [/\bconsequences\b/g, "conséquences"],
  [/\bmesure\b/g, "mesure"], // already correct (could be ambiguous)
  [/\bsevere\b/g, "sévère"], // already done above
  [/\bcritere\b/g, "critère"],
  [/\bcriteres\b/g, "critères"],

  // ——— ê ———
  [/\bforet\b/g, "forêt"],
  [/\bforets\b/g, "forêts"],
  [/\binterêt\b/g, "intérêt"], // already correct form
  [/\binteret\b/g, "intérêt"],
  [/\binterets\b/g, "intérêts"],
  [/\bblepharospasme\b/g, "blépharospasme"],

  // ——— â ———
  [/\bage\b/g, "âge"],  // "age" standalone → "âge"
  [/\bages\b/g, "âges"],
  [/\bagee\b/g, "âgée"],
  [/\bagees\b/g, "âgées"],
  [/\bage\b/g, "âge"], // already done

  // ——— à ———
  // "a partir" → "à partir" — careful: only when "a" is a preposition before "partir"
  [/\ba partir\b/g, "à partir"],
  [/\ba condition\b/g, "à condition"],
  [/\ba vie\b/g, "à vie"],
  [/\ba cause\b/g, "à cause"],
  [/\ba long terme\b/g, "à long terme"],
  [/\ba court terme\b/g, "à court terme"],
  [/\ba travers\b/g, "à travers"],

  // ——— î ———
  [/\bdiagnostic\b/g, "diagnostic"], // already correct
  [/\bgite\b/g, "gîte"], // avoid false positives on "gite"
  [/\bmaîtrise\b/g, "maîtrise"], // already correct
  [/\bmaitrise\b/g, "maîtrise"],
  [/\bmaîtrisees\b/g, "maîtrisées"],

  // ——— ô ———
  [/\bcontole\b/g, "contrôle"], // typo guard

  // ——— ç ———
  [/\bfacon\b/g, "façon"],
  [/\bfacons\b/g, "façons"],
  [/\brecu\b/g, "reçu"],
  [/\brecus\b/g, "reçus"],
  [/\brecue\b/g, "reçue"],
  [/\brecues\b/g, "reçues"],
  [/\blanceolees\b/g, "lancéolées"],

  // ——— œ ———
  [/\bcoeur\b/g, "cœur"],
  [/\bcoeurs\b/g, "cœurs"],
  [/\boeil\b/g, "œil"],
  [/\byeux\b/g, "yeux"], // already correct
  [/\bsoeur\b/g, "sœur"],
];

let totalFixes = 0;

for (const file of files) {
  const filePath = join(dir, file);
  let content = readFileSync(filePath, "utf8");
  const original = content;

  for (const [pattern, replacement] of corrections) {
    content = content.replace(pattern, replacement);
  }

  if (content !== original) {
    writeFileSync(filePath, content, "utf8");
    const count = (content.match(/[^\x00-\x7F]/g) || []).length - (original.match(/[^\x00-\x7F]/g) || []).length;
    console.log(`FIXED ${file}`);
    totalFixes++;
  }
}

console.log(`\nDone. Fixed ${totalFixes} files.`);
