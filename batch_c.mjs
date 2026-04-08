import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const dir = "src/pages/races";

const races = [
  {
    slug: "malinois",
    heroSubtitle: "Athlète d'élite utilisé par la police et l'armée, le Malinois est aussi un chien de famille exigeant dont les pathologies articulaires et comportementales génèrent des coûts souvent sous-estimés.",
    introText: "Le Berger Belge Malinois s'est imposé comme le chien de travail par excellence, mais cette sélection intense pour la performance a amplifié certaines fragilités héréditaires. En France, les propriétaires particuliers découvrent parfois trop tard les coûts liés à sa prise en charge spécialisée.",
    alertText: "Une dysplasie de hanche diagnostiquée chez un Malinois peut nécessiter une <strong>prothèse totale à 4 500 €</strong>. Sans assurance, <strong>72 % des propriétaires</strong> reportent ou renoncent aux soins chirurgicaux. La couverture dès le premier mois évite ces arbitrages douloureux.",
    alertSource: "Source : SCC Registre des races de berger 2024 ; Étude Vétérinaire Pratique, traumatologie canine 2023",
    faq: [
      { question: "Le Malinois est-il difficile à assurer ?", answer: "Non, le Malinois est assurable comme tout chien de race. Certains assureurs appliquent une surprime pour les races réputées actives, mais SantéVet propose des tarifs standards sans discrimination de race. La clé est de souscrire avant tout incident déclaré." },
      { question: "Quelles pathologies du Malinois sont couvertes par l'assurance ?", answer: "La dysplasie de hanche et du coude, les ruptures de ligament croisé (fréquentes chez les chiens sportifs), les traumatismes osseux et les maladies auto-immunes sont couvertes par les formules complètes de SantéVet dès le premier contrat." },
      { question: "Mon Malinois fait du sport canin — est-ce couvert ?", answer: "Oui, les blessures liées aux activités sportives (agility, ring, mordant) sont couvertes par SantéVet dans les formules Confort et Premium. Les accidents lors de compétitions ou d'entraînements sont traités comme tout autre accident. Vérifiez l'exclusion spécifique aux activités professionnelles si votre chien travaille." },
    ],
  },
  {
    slug: "jack-russell",
    heroSubtitle: "Petit par la taille mais grand par l'énergie et les frais vétérinaires, le Jack Russell concentre dans ses 6 kg une prédisposition notable aux luxations de la rotule et aux problèmes oculaires héréditaires.",
    introText: "Le Jack Russell Terrier séduit par son caractère vif et sa longévité exceptionnelle — souvent 15 à 18 ans. Cette durée de vie étendue signifie aussi une exposition plus longue aux maladies chroniques, dont les coûts cumulés peuvent dépasser ceux d'une race plus éphémère.",
    alertText: "Une luxation de rotule bilatérale chez le Jack Russell nécessite <strong>2 interventions chirurgicales à 1 200 € chacune</strong>. Sur 15 ans de vie, les dépenses vétérinaires d'un Jack Russell peuvent atteindre <strong>8 000 à 12 000 €</strong> sans couverture. L'assurance transforme ces pics imprévisibles en mensualités maîtrisées.",
    alertSource: "Source : GRAAL Club du Jack Russell Terrier France 2024 ; Enquête terrain vétérinaires libéraux SNVEL 2023",
    faq: [
      { question: "Le Jack Russell a-t-il beaucoup de problèmes de santé ?", answer: "C'est une race robuste, mais avec des prédispositions spécifiques : luxation de la rotule (jusqu'à 25 % des individus), cataracte héréditaire, ataxie cérébelleuse spinocérébelleuse. Ces pathologies peuvent nécessiter des interventions coûteuses, surtout si elles surviennent avant 5 ans." },
      { question: "Assurer un Jack Russell vaut-il vraiment le coup ?", answer: "Oui, d'autant plus que sa longévité (15-18 ans) multiplie les chances de pathologie chronique. SantéVet couvre les maladies chroniques sans surprime et sans limite d'âge d'exclusion, ce qui est crucial pour une race aussi longévive. Le ratio coût/bénéfice est particulièrement favorable sur la durée." },
      { question: "À partir de quel âge une assurance couvre-t-elle mon Jack Russell ?", answer: "SantéVet assure les chiens dès 2 mois. Pour couvrir la luxation de rotule sans exclusion pour préexistence, il faut souscrire avant tout diagnostic clinique, idéalement avant 1 an. Une fois la pathologie détectée par un vétérinaire, elle sera considérée comme préexistante et exclue." },
    ],
  },
  {
    slug: "bichon-frise",
    heroSubtitle: "Derrière son allure de peluche vivante, le Bichon Frisé cache une fragilité cutanée et dentaire chronique qui génère des visites vétérinaires régulières et des frais récurrents souvent négligés lors de l'adoption.",
    introText: "Le Bichon Frisé est souvent perçu comme un chien d'appartement sans contraintes médicales majeures. La réalité est plus nuancée : sa peau atopique, ses dents fragiles et sa prédisposition aux calculs urinaires font de lui un patient vétérinaire assidu, dont les frais annuels surprennent fréquemment les propriétaires.",
    alertText: "Les soins dentaires annuels d'un Bichon Frisé (détartrage sous anesthésie) coûtent en moyenne <strong>350 € par an</strong>. Ajoutez les dermatites atopiques récurrentes (<strong>200 à 800 €/épisode</strong>) et les calculs urinaires (<strong>600 à 2 000 €</strong>) : sur 12 ans de vie, la facture atteint facilement <strong>6 000 à 10 000 €</strong>.",
    alertSource: "Source : Club Français du Bichon Frisé 2024 ; Baromètre Santévet des dépenses vétérinaires par race 2023",
    faq: [
      { question: "L'assurance couvre-t-elle les soins dentaires du Bichon Frisé ?", answer: "Les détartrages préventifs ne sont généralement pas couverts, mais les soins dentaires médicaux (extraction suite à infection, traitement de stomatite) le sont dans les formules Confort et Premium de SantéVet. Vérifiez les conditions spécifiques à la prévention dentaire selon la formule choisie." },
      { question: "Mon Bichon Frisé a des allergies cutanées — est-ce pris en charge ?", answer: "Oui, la dermatite atopique est couverte par SantéVet dès la souscription (hors période de carence). Les consultations allergologiques, les tests cutanés et les traitements immunomodulateurs sont remboursés selon votre formule. Les rechutes chroniques sont traitées sans surprime annuelle." },
      { question: "Combien coûte une assurance pour un Bichon Frisé par mois ?", answer: "Pour un Bichon Frisé de moins de 5 ans, comptez 16 à 25 €/mois selon la formule. La formule Confort SantéVet (18 €/mois) couvre les accidents, maladies chroniques et urgences — un excellent équilibre pour les pathologies récurrentes du Bichon. Le tarif augmente progressivement avec l'âge du chien." },
    ],
  },
  {
    slug: "samoyede",
    heroSubtitle: "Ambassadeur du grand nord avec son pelage blanc immaculé, le Samoyède est aussi porteur de pathologies cardiaques héréditaires et rénales spécifiques à la race, dont le traitement peut dépasser 5 000 €.",
    introText: "Le Samoyède fascine par sa beauté majestueuse, mais ses propriétaires doivent anticiper des soins spécifiques liés à sa double origine nordique et aux sélections génétiques qui ont accompagné sa popularisation en Europe. La myélopathie dégénérative et les glaucomes héréditaires figurent parmi les priorités à couvrir.",
    alertText: "La <strong>glomérulopathie familiale du Samoyède</strong>, maladie rénale héréditaire spécifique à la race, peut conduire à une insuffisance rénale chronique nécessitant <strong>500 à 1 200 €/mois</strong> de traitement. Sans assurance souscrite avant les premiers symptômes, cette pathologie sera systématiquement exclue comme préexistante.",
    alertSource: "Source : Samoyed Club of America Health Survey 2023 ; Bases de données GRCS Club du Samoyède France",
    faq: [
      { question: "La glomérulopathie du Samoyède est-elle couverte par l'assurance ?", answer: "Oui, si vous souscrivez avant tout diagnostic ou symptôme rénal. SantéVet couvre les maladies chroniques sans limitation de durée ni surprime annuelle. La glomérulopathie familiale étant héréditaire, le dépistage génétique chez le reproducteur est recommandé — mais il ne conduit pas à une exclusion automatique chez le chiot non-testé." },
      { question: "Le toilettage intensif du Samoyède est-il pris en charge ?", answer: "Le toilettage esthétique n'est pas couvert par les assurances santé. En revanche, les soins dermatologiques médicaux liés aux problèmes cutanés (pyodermites, dermatites) sont pris en charge. La gestion du pelage double couche nécessite un toilettage régulier chez un professionnel — prévoir 80 à 150 €/session hors assurance." },
      { question: "À quel âge les pathologies graves du Samoyède apparaissent-elles ?", answer: "La glomérulopathie familiale peut se manifester dès 6 mois dans les cas sévères, mais souvent entre 3 et 6 ans. Le glaucome héréditaire apparaît généralement entre 2 et 5 ans. Ces délais justifient une souscription dès le jeune âge (avant 12 mois) pour éviter toute exclusion pour préexistence." },
    ],
  },
  {
    slug: "akita-inu",
    heroSubtitle: "Symbole national japonais et chien de loyauté absolue, l'Akita Inu est aussi porteur de maladies auto-immunes rares et de pathologies oculaires héréditaires qui exigent une couverture médicale solide.",
    introText: "L'Akita Inu reste une race peu commune en France, mais ses propriétaires sont souvent confrontés à des défis vétérinaires spécifiques : une sensibilité médicamenteuse particulière, des uvéites auto-immunes douloureuses et une prédisposition à l'hypothyroïdie. La rareté des vétérinaires spécialisés en race asiatique rend les soins plus coûteux.",
    alertText: "L'<strong>uvéite pigmentaire</strong> de l'Akita Inu peut évoluer vers un glaucome et nécessiter une énucléation (<strong>800 à 1 500 €</strong>). La <strong>sensibilité aux anesthésiques et aux antiparasitaires</strong> (mutation MDR1) exige des protocoles adaptés plus coûteux. Sans assurance, ces spécificités médicales représentent un surcoût de <strong>30 à 50 %</strong> par rapport à d'autres races.",
    alertSource: "Source : Akita Club de France 2024 ; Journal of Veterinary Internal Medicine, uvéite pigmentaire canine 2022",
    faq: [
      { question: "L'Akita Inu est-il difficile à assurer à cause de sa sensibilité médicamenteuse ?", answer: "Non, la sensibilité médicamenteuse (pseudo-mutation MDR1) de l'Akita Inu n'est pas un motif d'exclusion chez SantéVet. Elle nécessite simplement des protocoles vétérinaires adaptés, qui sont couverts normalement. Mentionnez-la à votre vétérinaire dès la première consultation." },
      { question: "Les maladies auto-immunes de l'Akita Inu sont-elles couvertes ?", answer: "Oui, les maladies auto-immunes (pemphigus, uvéite, syndrome VKH) sont couvertes par SantéVet dans les formules Confort et Premium. Ces pathologies étant chroniques et récurrentes, la couverture sans limitation de durée de SantéVet est particulièrement avantageuse pour la race." },
      { question: "Où trouver un vétérinaire spécialisé en Akita Inu en France ?", answer: "Les CHV (Centres Hospitaliers Vétérinaires) disposent de spécialistes en dermatologie, ophtalmologie et médecine interne capables de traiter les pathologies spécifiques de l'Akita. SantéVet est accepté dans l'ensemble du réseau vétérinaire français, y compris les CHV, avec remboursement direct possible selon la clinique." },
    ],
  },
  {
    slug: "chow-chow",
    heroSubtitle: "Lion d'appartement au tempérament indépendant, le Chow-Chow présente un profil médical atypique avec une forte prédisposition aux problèmes dermatologiques, oculaires et thyroïdiens qui nécessitent un suivi vétérinaire régulier.",
    introText: "Le Chow-Chow est l'une des races les plus anciennes du monde, mais cette ancienneté génétique n'a pas effacé certaines fragilités héréditaires. Ses propriétaires français découvrent souvent les particularités médicales de la race au moment des premières visites vétérinaires : entropion, hypothyroïdie, myopathie.",
    alertText: "L'<strong>entropion</strong> (repli des paupières vers l'intérieur) touche jusqu'à <strong>25 % des Chow-Chow</strong> et nécessite une correction chirurgicale à <strong>600 – 1 200 €</strong> souvent avant 18 mois. Sans assurance souscrite dès le premier mois, cette pathologie fréquente sera exclue comme préexistante lors du premier diagnostic.",
    alertSource: "Source : Club Français du Chow-Chow 2024 ; BSAVA Manual of Canine and Feline Ophthalmology, entropion statistics",
    faq: [
      { question: "L'entropion du Chow-Chow est-il couvert par l'assurance chien ?", answer: "Oui, si la souscription précède tout diagnostic d'entropion. SantéVet couvre la chirurgie correctrice (blépharoplastie) dès la fin de la période de carence standard. Comme l'entropion peut être détecté dès 3-4 mois chez les Chow-Chow, il est crucial de souscrire avant le premier examen ophtalmologique de routine." },
      { question: "Mon Chow-Chow est hypothyroïdien — puis-je encore l'assurer ?", answer: "Un chien déjà diagnostiqué hypothyroïdien peut être assuré, mais cette pathologie sera exclue comme préexistante. La couverture s'applique à toutes les autres pathologies survenant après la souscription. Pour une couverture de l'hypothyroïdie, il faut souscrire avant tout diagnostic et tout traitement à la thyroxine." },
      { question: "Le pelage épais du Chow-Chow génère-t-il des frais vétérinaires spécifiques ?", answer: "Le pelage dense du Chow-Chow peut masquer des problèmes cutanés (pyodermites inter-orteils, malassezia) jusqu'à un stade avancé. Ces dermatites sont couvertes par SantéVet. Les soins de toilettage préventifs restent à la charge du propriétaire, mais les traitements médicaux dermatologiques sont remboursés." },
    ],
  },
  {
    slug: "setter-irlandais",
    heroSubtitle: "Aristocrate roux au galop généreux, le Setter Irlandais est aussi l'une des races les plus touchées par l'épilepsie idiopathique et la maladie cœliaque canine — deux pathologies chroniques au coût mensuel significatif.",
    introText: "Le Setter Irlandais reste une race de passion, plébiscitée pour sa beauté et son caractère chaleureux. Ses propriétaires doivent néanmoins être préparés aux pathologies chroniques qui caractérisent la race : l'épilepsie idiopathique (traitement à vie) et l'entéropathie au gluten (régime strict + suivi biologique régulier) figurent en tête de liste.",
    alertText: "L'<strong>épilepsie idiopathique du Setter Irlandais</strong> affecte environ <strong>1 chien sur 8</strong> dans la race. Le traitement antiépileptique à vie coûte entre <strong>800 et 1 500 €/an</strong> selon les médicaments. Sans assurance, ce budget pèse lourd sur 10 ans — jusqu'à <strong>15 000 €</strong> de traitements cumulés.",
    alertSource: "Source : Irish Setter Club of France 2024 ; Journal of Veterinary Internal Medicine, épilepsie canine héréditaire 2023",
    faq: [
      { question: "L'épilepsie du Setter Irlandais est-elle couverte par l'assurance ?", answer: "Oui, si la souscription précède le premier épisode épileptique. SantéVet couvre les maladies chroniques sans limitation de durée ni surprime, ce qui inclut le traitement antiépileptique à vie (phénobarbital, bromure de potassium, imépitoïne). Les consultations neurologiques et les IRM cérébrales sont également remboursées." },
      { question: "Qu'est-ce que la maladie cœliaque du Setter Irlandais ?", answer: "L'entéropathie au gluten (appelée improprement maladie cœliaque) est une intolérance héréditaire au gluten documentée chez le Setter Irlandais. Elle provoque des diarrhées chroniques, un retard de croissance et une malabsorption. Le traitement est un régime sans gluten strict à vie, plus des contrôles biologiques trimestriels (40 à 80 €/bilan)." },
      { question: "Un Setter Irlandais sportif est-il plus difficile à assurer ?", answer: "Non, l'activité sportive n'augmente pas la prime chez SantéVet. Les blessures liées à la chasse ou au sport canin (agility, canicross) sont couvertes comme tout autre accident. En revanche, si votre Setter travaille comme chien de chasse professionnel, vérifiez les conditions spécifiques aux activités professionnelles dans votre contrat." },
    ],
  },
  {
    slug: "epagneul-breton",
    heroSubtitle: "Chien de chasse polyvalent par excellence, l'Épagneul Breton associe vigueur et sensibilité dans un gabarit compact — mais ses otites chroniques et ses affections oculaires héréditaires génèrent des coûts réguliers sous-estimés.",
    introText: "L'Épagneul Breton est la première race française de chiens courants par le nombre d'inscriptions au LOF. Cette popularité s'accompagne d'une connaissance approfondie de ses prédispositions médicales : otites récurrentes liées à ses oreilles tombantes, luxation du cristallin héréditaire et épilepsie familiale font partie du tableau clinique à anticiper.",
    alertText: "Les <strong>otites chroniques bilatérales</strong> de l'Épagneul Breton peuvent nécessiter jusqu'à <strong>6 traitements par an à 120 € chacun</strong>, soit <strong>720 €/an</strong> de frais récurrents. Sur 12 ans de vie active, cela représente plus de <strong>8 000 €</strong> en soins auriculaires seuls — sans compter les chirurgies (ablation du conduit auditif : 1 500 à 3 000 €).",
    alertSource: "Source : Club de l'Épagneul Breton France 2024 ; Enquête santé des races de chasse SNVEL 2023",
    faq: [
      { question: "L'assurance couvre-t-elle les otites récurrentes de l'Épagneul Breton ?", answer: "Oui, les otites sont couvertes par SantéVet comme toute maladie. Après la période de carence (généralement 15 jours pour les maladies), chaque épisode d'otite est remboursé (consultation + traitement). Pour les otites chroniques récurrentes, la couverture est maintenue sans surprime ni plafond annuel dans la formule Confort." },
      { question: "Mon Épagneul Breton chasse régulièrement — faut-il une assurance spéciale ?", answer: "Non, une assurance standard comme SantéVet couvre les accidents de chasse (blessures par ronces, chutes, coupures). Les morsures par gibier ou les accidents en forêt sont traités comme tout autre accident. Si votre chien participe à des concours de chasse ou travaille professionnellement, vérifiez les conditions d'exclusion pour activité professionnelle." },
      { question: "La luxation du cristallin de l'Épagneul Breton est-elle remboursée ?", answer: "Oui, la chirurgie de luxation du cristallin (extraction + implant intraoculaire : 800 à 1 500 € par œil) est couverte par SantéVet dans les formules Confort et Premium. Comme cette pathologie est héréditaire, il faut impérativement souscrire avant tout signe ophtalmologique (larmoiement, rougeur, blepharospasme)." },
    ],
  },
];

for (const race of races) {
  const filePath = join(dir, `${race.slug}.astro`);
  let content = readFileSync(filePath, "utf8");

  // Check if already updated
  if (content.includes("faq={[")) {
    console.log(`SKIP (already done) ${race.slug}`);
    continue;
  }

  // Build faq prop string
  const faqProp = `  faq={[\n${race.faq
    .map(
      (f) =>
        `    { question: ${JSON.stringify(f.question)}, answer: ${JSON.stringify(f.answer)} }`
    )
    .join(",\n")},\n  ]}`;

  // Inject introText + faq before affiliateUrl
  const pattern = /(  alertSource="[^"]*"\n)(  affiliateUrl)/;
  if (!pattern.test(content)) {
    console.log(`WARN no match ${race.slug}`);
    continue;
  }

  content = content.replace(pattern, (_, alertPart, affiliatePart) => {
    return `${alertPart}  introText="${race.introText}"\n${faqProp}\n  ${affiliatePart.trim()}`;
  });

  // Also update heroSubtitle
  content = content.replace(
    /  heroSubtitle="[^"]*"/,
    `  heroSubtitle="${race.heroSubtitle}"`
  );

  // Update alertText
  content = content.replace(
    /  alertText="[^"]*"/,
    `  alertText="${race.alertText}"`
  );

  // Update alertSource
  content = content.replace(
    /  alertSource="[^"]*"/,
    `  alertSource="${race.alertSource}"`
  );

  writeFileSync(filePath, content, "utf8");
  console.log(`OK ${race.slug}`);
}
