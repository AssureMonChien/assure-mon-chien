import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

// Helper: replace exact string once in content
function rep(content, from, to) {
  if (!content.includes(from)) {
    console.warn("  WARN: not found: " + from.slice(0, 60));
    return content;
  }
  return content.split(from).join(to);
}

// ─── GLOBAL replacements (same in every file) ────────────────────────────────
function globalFixes(content) {
  // sousTexte repeated 30× each
  content = content.split("Formule Confort — remboursement jusqu'à 100 %").join("Formule Confort, remboursement jusqu'à 100 %");
  content = content.split("Formule Essentielle — bon rapport qualité/prix").join("Formule Essentielle, bon rapport qualité/prix");

  // page titles: "Assurance X — Comparatif/Risques"
  content = content.replace(/ — Comparatif 2026"/g, " : Comparatif 2026\"");
  content = content.replace(/ — Risques & Meilleures Offres 2026"/g, " : Risques & Meilleures Offres 2026\"");

  return content;
}

// ─── PER-FILE replacements ─────────────────────────────────────────────────
const perFile = {

  "akita-inu.astro": [
    ["en forme sévère — coûts majorés par le gabarit.", "en forme sévère, avec des coûts majorés par le gabarit."],
  ],

  "beagle.astro": [
    ["pour les accidents de route — une realite qui justifie une couverture accidents solide.", "pour les accidents de route, ce qui justifie une couverture accidents solide."],
    ["et les bilans neurologiques — 300 a 800 euros/an entierement rembourses en formule premium.", "et les bilans neurologiques, soit 300 à 800 euros/an entièrement remboursés en formule premium."],
    ["entre 1 et 3 ans chez le Beagle — souscrire jeune garantit que la pathologie sera couverte lorsqu'elle apparaitra.", "entre 1 et 3 ans chez le Beagle. Souscrire jeune garantit que la pathologie sera couverte lorsqu'elle apparaîtra."],
    ["Le Beagle est une race de risque modere — les tarifs restent accessibles meme avec une couverture maladies chroniques incluant épilepsie et otites récidivantes.", "Le Beagle est une race de risque modéré. Les tarifs restent accessibles même avec une couverture maladies chroniques incluant épilepsie et otites récidivantes."],
  ],

  "berger-allemand.astro": [
    ["le Berger Allemand reste la race la plus touchee par la dysplasie de hanche en Europe — un risque héréditaire que meme les meilleures lignees ne peuvent eliminer.", "le Berger Allemand reste la race la plus touchée par la dysplasie de hanche en Europe. Ce risque héréditaire que même les meilleures lignées ne peuvent éliminer."],
  ],

  "berger-des-shetlands.astro": [
    ["dont une mutation MDR1 qui peut transformer un antiparasitaire banal en urgence neurologique.", "dont une mutation MDR1 qui peut transformer un antiparasitaire banal en urgence neurologique."], // no em dash here, skip
    ["Ce test genetique coute <strong>60 euros</strong> — votre assurance couvre les frais d'hospitalisation en urgence", "Ce test génétique coûte <strong>60 euros</strong>. Votre assurance couvre les frais d'hospitalisation en urgence"],
    ["il supporte mal la sedentarite — un facteur aggravant pour les pathologies musculo-squelettiques.", "il supporte mal la sédentarité. C'est un facteur aggravant pour les pathologies musculo-squelettiques."],
    ["toute consultation ophtalmologique avant souscription peut creer une exclusion definitive.", "toute consultation ophtalmologique avant souscription peut créer une exclusion définitive."], // no em dash, skip
    ["une formule couvrant maladies héréditaires et soins neurologiques est particulierement adaptee.", "une formule couvrant maladies héréditaires et soins neurologiques est particulièrement adaptée."], // no em dash, skip
  ],

  "bichon-frise.astro": [
    ["Mon Bichon Frisé a des allergies cutanées — est-ce pris en charge ?", "Mon Bichon Frisé a des allergies cutanées : est-ce pris en charge ?"],
    ["un excellent équilibre pour les pathologies récurrentes du Bichon. Le tarif", "un excellent équilibre pour les pathologies récurrentes du Bichon. Le tarif"], // already no em dash
    ["maladies chroniques et urgences — un excellent équilibre", "maladies chroniques et urgences, un excellent équilibre"],
  ],

  "border-collie.astro": [
    ["peuvent rendre mortels des medicaments courants — antiparasitaires, antidiarrheiques, anesthesiants.", "peuvent rendre mortels des médicaments courants : antiparasitaires, antidiarrhéiques, anesthésiants."],
    ["qui se traduisent parfois par des blessures auto-infligees necessitant des consultations vétérinaires repetees.", "qui se traduisent parfois par des blessures auto-infligées nécessitant des consultations vétérinaires répétées."], // no em dash
    ["un manque d'activite genere des comportements compulsifs", "un manque d'activité génère des comportements compulsifs"], // no em dash, keep as is
    ["Sa vivacite mentale exige une stimulation constante — un manque", "Sa vivacité mentale exige une stimulation constante. Un manque"],
    ["une complication possible meme dans les formes dites beningnes.", "une complication possible même dans les formes dites bénignes."], // no em dash
    ["SanteVet couvre le suivi ophtalmologique et les interventions en cas de decollement de retine — une complication", "SantéVet couvre le suivi ophtalmologique et les interventions en cas de décollement de rétine, une complication"],
    ["Le Border Collie est une race de risque modere — ses tarifs d'assurance sont raisonnables", "Le Border Collie est une race de risque modéré. Ses tarifs d'assurance sont raisonnables"],
  ],

  "bouledogue-francais.astro": [
    ["son anatomie brachycephale genere des frais vétérinaires des le plus jeune âge.", "son anatomie brachycéphale génère des frais vétérinaires dès le plus jeune âge."], // no em dash in heroSubtitle, check
    ["figure parmi les races les plus couteuses a soigner en France — son anatomie", "figure parmi les races les plus coûteuses à soigner en France. Son anatomie"],
    ["contre <strong>2 160 euros pour une decennie d'assurance SanteVet</strong>. La", "contre <strong>2 160 euros pour une décennie d'assurance SantéVet</strong>. La"], // no em dash
    ["estime a <strong>8 500 euros</strong> — contre <strong>2 160 euros", "estimé à <strong>8 500 euros</strong>, contre <strong>2 160 euros"],
  ],

  "boxer.astro": [
    ["mais la mutation ne garantit pas l'absence de maladie — le suivi cardio annuel", "mais la mutation ne garantit pas l'absence de maladie. Le suivi cardio annuel"],
    ["le rend vulnerable aux coups de chaleur — un risque souvent sous-estime", "le rend vulnérable aux coups de chaleur. Un risque souvent sous-estimé"],
    ["L'ARVC peut provoquer une mort subite — une couverture active est le seul filet de securite médicale.", "L'ARVC peut provoquer une mort subite. Une couverture active est le seul filet de sécurité médicale."],
  ],

  "caniche.astro": [
    ["le Caniche est aussi l'une des plus longevives — mais cette longevite a un prix", "le Caniche est aussi l'une des plus longévives. Cette longévité a un prix"],
    ["ce qui rend une couverture assurance sur le long terme particulierement rentable.", "ce qui rend une couverture assurance sur le long terme particulièrement rentable."], // no em dash
    ["les annees supplementaires d'exposition aux maladies chroniques — ce qui rend", "les années supplémentaires d'exposition aux maladies chroniques, ce qui rend"],
    ["une simple consultation pour ces symptômes peut suffire a creer une exclusion chez certains assureurs.", "une simple consultation pour ces symptômes peut suffire à créer une exclusion chez certains assureurs."], // no em dash
    ["La maladie d'Addison se manifeste par des episodes vagues (fatigue, vomissements) — une simple", "La maladie d'Addison se manifeste par des épisodes vagues (fatigue, vomissements). Une simple"],
    ["Sa longevite rend la souscription precoce avantageuse — 15 ans de couverture a tarif fixe representent", "Sa longévité rend la souscription précoce avantageuse. 15 ans de couverture à tarif fixe représentent"],
    ["Dysplasie de hanche — grand Caniche", "Dysplasie de hanche, grand Caniche"],
  ],

  "carlin.astro": [
    ["des problèmes respiratoires sévères aux neurologies fatales.", "des problèmes respiratoires sévères aux neurologies fatales."], // check if there's em dash before
    ["le Carlin dissimule derriere sa rondeur une anatomie parmi les plus compromises du monde canin — des problèmes", "le Carlin dissimule derrière sa rondeur une anatomie parmi les plus compromises du monde canin : des problèmes"],
    ["souvent necessaire avant l'âge de 2 ans. Une <strong>hernie discale paralysante</strong>", "souvent nécessaire avant l'âge de 2 ans. Une <strong>hernie discale paralysante</strong>"], // no em dash, already ok
    ["atteint <strong>3 500-5 000 euros</strong> — souvent necessaire avant l'âge de 2 ans.", "atteint <strong>3 500-5 000 euros</strong>, souvent nécessaire avant l'âge de 2 ans."],
    ["Toujours fatale — survie de quelques semaines à plusieurs mois.", "Toujours fatale. Survie de quelques semaines à plusieurs mois."],
  ],

  "cavalier-king-charles.astro": [
    ["le Cavalier King Charles est la race pour laquelle une assurance n'est pas une option mais une necessite absolue — la maladie cardiaque touche quasi 100 % des individus a 10 ans.", "le Cavalier King Charles est la race pour laquelle une assurance n'est pas une option mais une nécessité absolue : la maladie cardiaque touche quasi 100 % des individus à 10 ans."],
    ["Les proprietaires de Cavalier depensent en moyenne 2 a 3 fois plus en frais vétérinaires que pour une race de santé standard — une realite que peu anticipent a l'achat.", "Les propriétaires de Cavalier dépensent en moyenne 2 à 3 fois plus en frais vétérinaires que pour une race de santé standard. Une réalité que peu anticipent à l'achat."],
    ["les echocardiographies et les hospitalisations — des frais pouvant atteindre 1 500 euros/an.", "les échocardiographies et les hospitalisations, soit des frais pouvant atteindre 1 500 euros/an."],
    ["Entre 28 et 55 euros/mois — les tarifs les plus eleves de toutes les races de compagnie.", "Entre 28 et 55 euros/mois, parmi les tarifs les plus élevés de toutes les races de compagnie."],
    ["Peut mimer une thrombocytopénie immune — diagnostic différentiel important.", "Peut mimer une thrombocytopénie immune. Diagnostic différentiel important."],
  ],

  "chihuahua.astro": [
    ["et qui peuvent couter bien plus que prevu.", "et qui peuvent coûter bien plus que prévu."], // no em dash
    ["Le Chihuahua accumule des fragilites articulaires, cardiaques et neurologiques qui surprennent meme les vétérinaires — et qui peuvent", "Le Chihuahua accumule des fragilités articulaires, cardiaques et neurologiques qui surprennent même les vétérinaires, et qui peuvent"],
    ["coute entre <strong>800 et 2 500 euros</strong> — soit <strong>4 a 11 ans d'assurance</strong>", "coûte entre <strong>800 et 2 500 euros</strong>, soit <strong>4 à 11 ans d'assurance</strong>"],
  ],

  "chow-chow.astro": [
    ["Mon Chow-Chow est hypothyroïdien — puis-je encore l'assurer ?", "Mon Chow-Chow est hypothyroïdien : puis-je encore l'assurer ?"],
  ],

  "cocker-spaniel.astro": [
    ["une pathologie banalisee qui peut evoluer vers des chirurgies couteuses.", "une pathologie banalisée qui peut évoluer vers des chirurgies coûteuses."], // no em dash in heroSubtitle? Let me check
    ["le Cocker Spaniel fait partie des races les plus touchees par les otites chroniques en France — une pathologie", "le Cocker Spaniel fait partie des races les plus touchées par les otites chroniques en France. Une pathologie"],
    ["combine otites chroniques et risque de nephropathie — justifie une formule", "associant otites chroniques et risque de néphropathie, justifie une formule"],
  ],

  "dalmatien.astro": [
    ["<strong>100 % des Dalmatiens</strong> sont porteurs — seule l'alimentation adaptee", "<strong>100 % des Dalmatiens</strong> sont porteurs. Seule l'alimentation adaptée"],
    ["necessitant plus de 2h d'exercice quotidien — un chien qui s'epanouit", "nécessitant plus de 2h d'exercice quotidien, un chien qui s'épanouit"],
    ["Pas de traitement curatif — rééducation palliative.", "Pas de traitement curatif. Rééducation palliative."],
  ],

  "dobermann.astro": [
    ["une cardiomyopathie dilatee qui frappe 50 % de la race — souvent sans prevenir, parfois mortellement.", "une cardiomyopathie dilatée qui frappe 50 % de la race. Souvent sans prévenir, parfois mortellement."],
    ["les hospitalisations cardiologiques — un budget annuel de 500 a 1 500 euros entierement pris en charge", "les hospitalisations cardiologiques, soit un budget annuel de 500 à 1 500 euros entièrement pris en charge"],
  ],

  "epagneul-breton.astro": [
    ["l'Épagneul Breton associe vigueur et sensibilité dans un gabarit compact — mais ses otites chroniques", "l'Épagneul Breton associe vigueur et sensibilité dans un gabarit compact. Ses otites chroniques"],
    ["en soins auriculaires seuls — sans compter les chirurgies (ablation du conduit auditif", "en soins auriculaires seuls, sans compter les chirurgies (ablation du conduit auditif"],
    ["Mon Épagneul Breton chasse régulièrement — faut-il une assurance spéciale ?", "Mon Épagneul Breton chasse régulièrement : faut-il une assurance spéciale ?"],
  ],

  "golden-retriever.astro": [
    ["Les cancers du Golden apparaissent en moyenne entre <strong>6 et 9 ans</strong> — mais une assurance souscrite", "Les cancers du Golden apparaissent en moyenne entre <strong>6 et 9 ans</strong>. Mais une assurance souscrite"],
    ["c'est aussi la race dont les frais vétérinaires lies aux cancers sont les plus eleves toutes races confondues — une realite que peu de proprietaires anticipent.", "c'est aussi la race dont les frais vétérinaires liés aux cancers sont les plus élevés toutes races confondues. Une réalité que peu de propriétaires anticipent."],
    ["— le retour sur investissement est rapide des le premier traitement oncologique.", ", avec un retour sur investissement rapide dès le premier traitement oncologique."],
  ],

  "husky-siberien.astro": [
    ["le Husky Siberien est une machine athletique aux yeux magnetiques — mais ses maladies oculaires héréditaires menacent silencieusement sa vision des l'âge adulte.", "le Husky Sibérien est une machine athlétique aux yeux magnétiques. Ses maladies oculaires héréditaires menacent silencieusement sa vision dès l'âge adulte."],
    ["— des accidents bien couverts par les contrats tous risques.", ". Ces accidents sont bien couverts par les contrats tous risques."],
    ["des collyres immunosuppresseurs à vie (150-300 euros/mois) et des controles réguliers — SanteVet couvre", "des collyres immunosuppresseurs à vie (150-300 euros/mois) et des contrôles réguliers. SantéVet couvre"],
  ],

  "jack-russell.astro": [
    ["Le Jack Russell Terrier séduit par son caractère vif et sa longévité exceptionnelle — souvent 15 à 18 ans.", "Le Jack Russell Terrier séduit par son caractère vif et sa longévité exceptionnelle, souvent 15 à 18 ans."],
  ],

  "labrador.astro": [
    ["coûte en moyenne <strong>3 500 €</strong> — soit <strong>9 ans d'assurance SantéVet</strong>", "coûte en moyenne <strong>3 500 €</strong>, soit <strong>9 ans d'assurance SantéVet</strong>"],
    ["prédispositions génétiques — dysplasie de hanche et cancers en tête.", "prédispositions génétiques : dysplasie de hanche et cancers en tête."],
    ["Les frais peuvent atteindre 6 000 € — le remboursement à 100 % fait toute la différence.", "Les frais peuvent atteindre 6 000 €. Le remboursement à 100 % fait toute la différence."],
    ["comptez 25 à 40 €/mois — un investissement largement rentabilisé dès la première intervention orthopédique.", "comptez 25 à 40 €/mois, un investissement largement rentabilisé dès la première intervention orthopédique."],
  ],

  "malinois.astro": [
    ["Mon Malinois fait du sport canin — est-ce couvert ?", "Mon Malinois fait du sport canin : est-ce couvert ?"],
  ],

  "montagne-des-pyrenees.astro": [
    ["la Montagne des Pyrenees est une race robuste — mais sa taille imposante", "la Montagne des Pyrénées est une race robuste. Sa taille imposante"],
    ["peut compliquer les consultations vétérinaires — certains individus requierent une sedation", "peut compliquer les consultations vétérinaires. Certains individus requièrent une sédation"],
    ["Prothèse totale de hanche bilatérale en forme sévère — coûts majorés par le gabarit.", "Prothèse totale de hanche bilatérale en forme sévère. Les coûts sont majorés par le gabarit."],
  ],

  "rottweiler.astro": [
    ["dysplasie sévère et osteosarcome — un cancer osseux fulminant qui frappe 1 Rottweiler sur 8 au cours de sa vie.", "dysplasie sévère et ostéosarcome : un cancer osseux fulminant qui frappe 1 Rottweiler sur 8 au cours de sa vie."],
    ["— chaque kilo supplementaire aggrave la charge articulaire", ". Chaque kilo supplémentaire aggrave la charge articulaire"],
    ["Cette couverture peut representer 10 000-12 000 euros d'actes médicaux — seule une assurance premium souscrite tot", "Cette couverture peut représenter 10 000-12 000 euros d'actes médicaux. Seule une assurance premium souscrite tôt"],
    ["Prothèse totale de hanche bilatérale en forme avancée — coût majeur lié à la taille.", "Prothèse totale de hanche bilatérale en forme avancée. Le coût est majeur, lié à la taille."],
  ],

  "saint-bernard.astro": [
    ["anesthesie, chirurgie, hospitalisation — tout coute proportionnellement plus cher", "anesthésie, chirurgie, hospitalisation : tout coûte proportionnellement plus cher"],
    ["Entre 35 et 60 euros/mois selon la formule et l'âge — parmi les tarifs les plus eleves", "Entre 35 et 60 euros/mois selon la formule et l'âge, parmi les tarifs les plus élevés"],
    ["Prothèse totale de hanche bilatérale souvent nécessaire — coût majeur lié au gabarit", "Prothèse totale de hanche bilatérale souvent nécessaire. Coût majeur lié au gabarit"],
  ],

  "samoyede.astro": [
    ["le dépistage génétique chez le reproducteur est recommandé — mais il ne conduit pas", "le dépistage génétique chez le reproducteur est recommandé. Mais il ne conduit pas"],
    ["nécessite un toilettage régulier chez un professionnel — prévoir 80 à 150 €/session hors assurance.", "nécessite un toilettage régulier chez un professionnel. Prévoir 80 à 150 €/session hors assurance."],
  ],

  "setter-irlandais.astro": [
    ["le Setter Irlandais est aussi l'une des races les plus touchées par l'épilepsie idiopathique et la maladie cœliaque canine — deux pathologies chroniques au coût mensuel significatif.", "le Setter Irlandais est aussi l'une des races les plus touchées par l'épilepsie idiopathique et la maladie cœliaque canine : deux pathologies chroniques au coût mensuel significatif."],
    ["ce budget pèse lourd sur 10 ans — jusqu'à <strong>15 000 €</strong>", "ce budget pèse lourd sur 10 ans, jusqu'à <strong>15 000 €</strong>"],
  ],

  "shih-tzu.astro": [
    ["le Shih Tzu impressionne par son elegance — mais ses yeux saillants et son museau court font de chaque journee une vigilance ophtalmologique", "le Shih Tzu impressionne par son élégance. Ses yeux saillants et son museau court font de chaque journée une vigilance ophtalmologique"],
    ["pour esperer sauver l'œil — cout : <strong>1 500 a 3 000 euros</strong>.", "pour espérer sauver l'œil. Coût : <strong>1 500 à 3 000 euros</strong>."],
    ["Sa toilette exigeante cree un lien quotidien — ce qui permet souvent de detecter precocement", "Sa toilette exigeante crée un lien quotidien, ce qui permet souvent de détecter précocement"],
  ],

  "teckel.astro": [
    // teckel alertText doesn't have em dash (checked), skip
  ],

  "yorkshire-terrier.astro": [
    ["trachee, rotule et foie — chacune pouvant necessiter une intervention chirurgicale couteuse.", "trachée, rotule et foie. Chacune peut nécessiter une intervention chirurgicale coûteuse."],
    ["— non rembourse si la pathologie est declaree avant la souscription.", ", non remboursé si la pathologie est déclarée avant la souscription."],
  ],

  "index.astro": [
    // races/index.astro
    // JSON-LD and title: keep em dash (standard in titles/metadata)
    // hero-desc:
    ["Chaque race a ses fragilités génétiques propres — trouvez la couverture vraiment adaptée à votre chien.", "Chaque race a ses fragilités génétiques propres. Trouvez la couverture vraiment adaptée à votre chien."],
  ],
};

// PageRace.astro specific
const pageRaceFixes = [
  // metaTitle: keep em dash (it's a title separator — standard)
  // But the sidebar disclaimer:
  ["Vous n'êtes jamais obligé de souscrire via nos liens — ils sont là pour votre commodité.", "Vous n'êtes jamais obligé de souscrire via nos liens. Ils sont là pour votre commodité."],
  // copyright: keep em dash between name and brand (it's a separator)
];

// ─── APPLY ─────────────────────────────────────────────────────────────────
const raceDir = "src/pages/races";
const raceFiles = readdirSync(raceDir).filter(f => f.endsWith(".astro"));

for (const filename of raceFiles) {
  const filePath = join(raceDir, filename);
  let content = readFileSync(filePath, "utf8");
  const original = content;

  content = globalFixes(content);

  const fixes = perFile[filename];
  if (fixes) {
    for (const [from, to] of fixes) {
      if (from === to) continue; // no-op entries
      content = rep(content, from, to);
    }
  }

  if (content !== original) {
    writeFileSync(filePath, content, "utf8");
    console.log("FIXED " + filename);
  }
}

// races/index.astro
{
  const filePath = "src/pages/races/index.astro";
  let content = readFileSync(filePath, "utf8");
  const original = content;
  content = globalFixes(content);
  for (const [from, to] of perFile["index.astro"] || []) {
    content = rep(content, from, to);
  }
  if (content !== original) {
    writeFileSync(filePath, content, "utf8");
    console.log("FIXED races/index.astro");
  }
}

// PageRace.astro
{
  const filePath = "src/layouts/PageRace.astro";
  let content = readFileSync(filePath, "utf8");
  const original = content;
  for (const [from, to] of pageRaceFixes) {
    content = rep(content, from, to);
  }
  if (content !== original) {
    writeFileSync(filePath, content, "utf8");
    console.log("FIXED PageRace.astro");
  }
}

// Verify: count remaining em dashes
import { execSync } from "child_process";
try {
  const remaining = execSync('grep -rn " — " src/pages/races/ src/layouts/PageRace.astro 2>/dev/null | wc -l', { encoding: "utf8" }).trim();
  console.log(`\nRemaining " — " occurrences: ${remaining}`);
} catch(e) {}
