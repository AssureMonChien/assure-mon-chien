import { readFileSync, writeFileSync } from "fs";

function fix(filePath, replacements) {
  let content = readFileSync(filePath, "utf8");
  const original = content;
  for (const [from, to] of replacements) {
    if (!content.includes(from)) {
      console.warn("  WARN not found in " + filePath.split("/").pop() + ": " + from.slice(0, 50));
      continue;
    }
    content = content.split(from).join(to);
  }
  if (content !== original) {
    writeFileSync(filePath, content, "utf8");
    console.log("FIXED " + filePath.split("/").pop());
  }
}

const r = "src/pages/races/";

fix(r+"berger-des-shetlands.astro", [
  ["ignorent — dont une mutation MDR1", "ignorent. Cette mutation MDR1"],
  ["de la mutation MDR1 — notamment les hospitalisations pour intoxication.", "de la mutation MDR1, notamment les hospitalisations pour intoxication."],
  ["peuvent etre détectées tot — toute consultation", "peuvent être détectées tôt. Toute consultation"],
  ["avec des tarifs raisonnables — une formule couvrant", "avec des tarifs raisonnables. Une formule couvrant"],
]);

fix(r+"border-collie.astro", [
  ["courants — antiparasitaires, antidiarrheiques, anesthesiants.", "courants : antiparasitaires, antidiarrhéiques, anesthésiants."],
  ["une intoxication — mais un proprietaire informe peut les prevenir", "une intoxication. Mais un propriétaire informé peut les prévenir"],
]);

fix(r+"bouledogue-francais.astro", [
  ["la chirurgie devient une exclusion — assurer son Bouledogue", "la chirurgie devient une exclusion. Assurer son Bouledogue"],
  ["comptez 25 a 50 euros/mois — un surcout justifie", "comptez 25 à 50 euros/mois, un surcoût justifié"],
]);

fix(r+"boxer.astro", [
  ["l'absence de maladie — le suivi cardio annuel", "l'absence de maladie. Le suivi cardio annuel"],
  ["chez certains Boxers — souscrire tot garantit", "chez certains Boxers. Souscrire tôt garantit"],
  ["risque cardiaque et oncologique eleve — une formule couvrant", "risque cardiaque et oncologique élevé. Une formule couvrant"],
]);

fix(r+"caniche.astro", [
  ["aux maladies chroniques — ce qui rend une couverture", "aux maladies chroniques, ce qui rend une couverture"],
]);

fix(r+"carlin.astro", [
  ["atteint <strong>3 500-5 000 euros</strong> — souvent nécessaire", "atteint <strong>3 500-5 000 euros</strong>, souvent nécessaire"],
  ["moins de 10 % des proprietaires de Carlin connaissent l'existence de l'encephalite PDE — pourtant", "moins de 10 % des propriétaires de Carlin connaissent l'existence de l'encéphalite PDE, pourtant"],
  ["est toujours fatale une fois declaree — SanteVet couvre", "est toujours fatale une fois déclarée. SantéVet couvre"],
  ["necessite souvent une chirurgie avant 18 mois — souscrire apres", "nécessite souvent une chirurgie avant 18 mois. Souscrire après"],
  ["problèmes oculaires — son cout vétérinaire moyen", "problèmes oculaires. Son coût vétérinaire moyen"],
]);

fix(r+"chihuahua.astro", [
  ["meme les vétérinaires — et qui peuvent coûter", "même les vétérinaires, et qui peuvent coûter"],
  ["euros selon le grade — rembourses a 100 %", "euros selon le grade, remboursés à 100 %"],
]);

fix(r+"cocker-spaniel.astro", [
  ["depuis 2020 — une fois diagnostiquee, elle devient une exclusion permanente.", "depuis 2020. Une fois diagnostiquée, elle devient une exclusion permanente."],
  ["risque de néphropathie, justifie une formule", "risque de néphropathie, justifie une formule"], // already fixed
]);

fix(r+"dalmatien.astro", [
  ["peuvent creer des exclusions definitives — souscrire avant ces examens", "peuvent créer des exclusions définitives. Souscrire avant ces examens"],
  ["mais previsibles — une formule avec bonne couverture urologique", "mais prévisibles. Une formule avec bonne couverture urologique"],
]);

fix(r+"dobermann.astro", [
  ["sans symptôme des 2 ans — et chaque Holter anormal", "sans symptôme dès 2 ans. Chaque Holter anormal"],
  ["justifie une formule premium — rentabilisee des le premier Holter", "justifie une formule premium, rentabilisée dès le premier Holter"],
]);

fix(r+"golden-retriever.astro", [
  ["les plus eleves toutes races confondues — une realite", "les plus élevés toutes races confondues. Une réalité"],
]);

fix(r+"husky-siberien.astro", [
  ["precocement — une fois documentees, elles deviennent des exclusions permanentes", "précocement. Une fois documentées, elles deviennent des exclusions permanentes"],
  ["les soins specialises — SanteVet propose des options", "les soins spécialisés. SantéVet propose des options"],
]);

fix(r+"montagne-des-pyrenees.astro", [
  ["particulierement eleves — SanteVet couvre les protheses", "particulièrement élevés. SantéVet couvre les prothèses"],
  ["peuvent etre detectes jeunes — chaque examen avant souscription", "peuvent être détectés jeunes. Chaque examen avant souscription"],
  ["majore chaque acte vétérinaire — une formule couvrant", "majore chaque acte vétérinaire. Une formule couvrant"],
]);

fix(r+"rottweiler.astro", [
  ["(20 % selon OFA) — souscrire tot garantit", "(20 % selon OFA). Souscrire tôt garantit"],
  ["justifient pleinement une formule premium — le ratio cout/couverture", "justifient pleinement une formule premium. Le ratio coût/couverture"],
]);

fix(r+"saint-bernard.astro", [
  ["le taux le plus eleve parmi les grandes races. Deux protheses totales de hanche atteignent <strong>16 000 euros</strong>. Une assurance a 40 euros/mois represente <strong>480 euros par an</strong> — soit un ratio",
   "le taux le plus élevé parmi les grandes races. Deux prothèses totales de hanche atteignent <strong>16 000 euros</strong>. Une assurance à 40 euros/mois représente <strong>480 euros par an</strong>, soit un ratio"],
  ["selon les registres radiographiques — le taux le plus eleve",
   "selon les registres radiographiques, le taux le plus élevé"],
  ["les protheses totales de hanche — jusqu'a 8 000 euros", "les prothèses totales de hanche, jusqu'à 8 000 euros"],
  ["une necessite absolue — un score HD-D avant souscription", "une nécessité absolue. Un score HD-D avant souscription"],
]);

fix(r+"shih-tzu.astro", [
  ["documentees tres tot — chaque consultation avant souscription", "documentées très tôt. Chaque consultation avant souscription"],
  ["brachycephales et oculaires — une formule avec couverture chirurgie", "brachycéphales et oculaires. Une formule avec couverture chirurgie"],
]);

fix(r+"teckel.astro", [
  ["apres les premiers signes — passé ce delai,", "après les premiers signes. Passé ce délai,"],
  ["atteignent 5 000-8 000 euros — entierement rembourses a 100 %", "atteignent 5 000-8 000 euros, entièrement remboursés à 100 %"],
  ["couverture neurologie et chirurgie — le ratio prime/risque", "couverture neurologie et chirurgie. Le ratio prime/risque"],
]);

fix(r+"yorkshire-terrier.astro", [
  ["si necessaire — une intervention a 2 500-3 000 euros remboursee", "si nécessaire, une intervention à 2 500-3 000 euros remboursée"],
  ["des 3-4 ans — tout diagnostic de collapsus avant souscription", "dès 3-4 ans. Tout diagnostic de collapsus avant souscription"],
]);
