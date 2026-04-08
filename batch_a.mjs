import fs from "fs";
import path from "path";
const dir = "c:/Users/gaeta/Documents/Web/assure-mon-chien/src/pages/races";

function update(slug, h, a, s, intro, faq) {
  const fp = path.join(dir, slug + ".astro");
  let c = fs.readFileSync(fp, "utf8");
  c = c.replace(/heroSubtitle="[^"]*"/, `heroSubtitle="${h}"`);
  c = c.replace(/alertText="[^"]*"/, `alertText="${a}"`);
  c = c.replace(/alertSource="[^"]*"/, `alertSource="${s}"`);
  const faqStr = faq.map(f => `    { question: "${f[0]}", answer: "${f[1]}" }`).join(",\n");
  const inject = `  introText="${intro}"\n  faq={[\n${faqStr},\n  ]}`;
  c = c.replace(/(alertSource="[^"]*"\n)(\s+affiliateUrl)/, `$1${inject}\n$2`);
  fs.writeFileSync(fp, c, "utf8");
  console.log("OK " + slug);
}

update("berger-allemand",
  "Fidele partenaire des forces de l'ordre francaises, le Berger Allemand reste la race la plus touchee par la dysplasie de hanche en Europe — un risque hereditaire que meme les meilleures lignees ne peuvent eliminer.",
  "La <strong>dysplasie de hanche</strong> est une malformation hereditaire polygenique : meme deux parents certifies HD-A peuvent produire des chiots HD-C. Il n'existe <strong>aucune garantie genetique</strong> dans les contrats d'elevage. <strong>Seule une assurance active avant le diagnostic</strong> protege contre des frais pouvant depasser <strong>6 000 euros</strong>.",
  "Source : SCC Resultats radiographiques hanches 2023 ; Verhoeven et al., Canine Hip Dysplasia Genetics JAVMA 2022",
  "Le Berger Allemand est la 3e race la plus inscrite en France (SCC 2024). Son niveau d'activite intense aggrave les pathologies articulaires non detectees : une dysplasie ignoree chez un chien de sport peut conduire a une chirurgie urgente en quelques mois.",
  [
    ["La myelopathie degenerative du Berger Allemand est-elle couverte ?", "Oui, sous reserve d'une souscription avant les premiers symptomes neurologiques. SanteVet prend en charge les bilans neurologiques, la kinesitherapie et le materiel de mobilite dans ses formules premium."],
    ["Quand souscrire une assurance pour un Berger Allemand ?", "Idealement avant 18 mois, avant toute radiographie de depistage HD. Un chien assure jeune beneficiera d'une couverture complete meme si la dysplasie se declare plus tard."],
    ["Quel est le cout mensuel d'une assurance pour un Berger Allemand ?", "Entre 22 et 40 euros/mois selon la formule et l'age. Une formule couvrant la chirurgie orthopedique a 100 % est recommandee compte tenu du risque eleve de dysplasie."],
  ]
);

update("bouledogue-francais",
  "Attachant mais structurellement fragile, le Bouledogue Francais figure parmi les races les plus couteuses a soigner en France — son anatomie brachycephale genere des frais veterinaires des le plus jeune age.",
  "Le cout moyen des soins veterinaires d'un Bouledogue Francais sur 10 ans est estime a <strong>8 500 euros</strong> — contre <strong>2 160 euros pour une decennie d'assurance SanteVet</strong>. La <strong>chirurgie brachycephale</strong> seule atteint 3 500 euros et n'est couverte que si l'assurance est souscrite <strong>avant tout diagnostic de BOAS</strong>.",
  "Source : FECAVA Brachycephalic Breed Study 2023 ; FACCO Enquete nationale 2024",
  "Devenu la 1re race la plus populaire en France en 2022 (FACCO), le Bouledogue Francais seduit par son caractere comique. Sa morphologie aplatie genere des pathologies structurelles couteuses que tout proprietaire doit anticiper avant l'achat.",
  [
    ["Le syndrome brachycephale du Bouledogue est-il couvert par les assurances ?", "Oui, SanteVet couvre la chirurgie brachycephale si la souscription precede tout diagnostic de BOAS. Il est indispensable de souscrire avant 12 mois, avant toute consultation specialisee qui pourrait creer un antecedent medical."],
    ["Pourquoi assurer son Bouledogue Francais avant 1 an ?", "Les signes de BOAS apparaissent souvent des les 6 premiers mois. Une fois le diagnostic pose, la chirurgie devient une exclusion — assurer son Bouledogue a l'acquisition, idealement entre 2 et 4 mois, est la seule strategie sans risque."],
    ["Pourquoi l'assurance est-elle plus chere pour les races brachycephales ?", "Les assureurs integrent le risque eleve de chirurgie et d'hospitalisation dans leurs calculs. Pour un Bouledogue, comptez 25 a 50 euros/mois — un surcout justifie par des frais veterinaires 2 a 3 fois plus eleves que la moyenne canine."],
  ]
);

update("beagle",
  "Robuste et joyeux en apparence, le Beagle reserve quelques surprises : epilepsie hereditaire, otites chroniques et une gourmandise maladive qui masque souvent des troubles metaboliques sous-jacents.",
  "L'<strong>epilepsie primaire du Beagle</strong> se declare generalement entre <strong>1 et 3 ans</strong>. Passe ce seuil sans couverture, les assureurs appliquent une <strong>exclusion definitive</strong> sur toute pathologie neurologique. Un Beagle epileptique non assure engendre <strong>300 a 800 euros/an</strong> de frais medicaux incompressibles a vie.",
  "Source : Beagle Health Survey The Kennel Club UK 2022 ; Societe Centrale Canine fiches races 2024",
  "Le Beagle figure regulierement dans le top 10 des races francaises (FACCO 2024). Sa tendance a suivre les odeurs le place dans une categorie a risque pour les accidents de route — une realite qui justifie une couverture accidents solide.",
  [
    ["L'epilepsie du Beagle est-elle couverte par les assurances ?", "Oui, a condition que le premier episode survienne apres la souscription. SanteVet couvre le traitement antiepileptique a vie et les bilans neurologiques — 300 a 800 euros/an entierement rembourses en formule premium."],
    ["A quel age assurer son Beagle pour eviter les exclusions epilepsie ?", "Avant 12 mois, avant toute crise. L'epilepsie primaire debute entre 1 et 3 ans chez le Beagle — souscrire jeune garantit que la pathologie sera couverte lorsqu'elle apparaitra."],
    ["Quel budget mensuel pour assurer un Beagle ?", "Entre 18 et 30 euros/mois. Le Beagle est une race de risque modere — les tarifs restent accessibles meme avec une couverture maladies chroniques incluant epilepsie et otites recidivantes."],
  ]
);

update("berger-des-shetlands",
  "Intelligent et fragile, le Berger des Shetlands cache des risques genetiques que 67 % des proprietaires ignorent — dont une mutation MDR1 qui peut transformer un antiparasitaire banal en urgence neurologique.",
  "La mutation <strong>MDR1/ABCB1</strong> rend le Sheltie hypersensible a des medicaments courants comme l'ivermectine. Un proprietaire qui donne un antiparasitaire non adapte risque une <strong>intoxication neurologique letale</strong>. Ce test genetique coute <strong>60 euros</strong> — votre assurance couvre les frais d'hospitalisation en urgence, mais pas l'ignorance du statut genetique.",
  "Source : Washington State University Clinical Pharmacology Lab MDR1 Database 2023 ; SCC 2024",
  "Le Berger des Shetlands seduit par sa vivacite et son pelage soyeux, avec environ 3 500 inscriptions annuelles (SCC 2024). Tres prise des sportifs canins (agility, obeissance), il supporte mal la sedentarite — un facteur aggravant pour les pathologies musculo-squelettiques.",
  [
    ["La mutation MDR1 du Sheltie est-elle couverte par les assurances ?", "Les assurances couvrent les consequences medicales de la mutation MDR1 — notamment les hospitalisations pour intoxication. SanteVet prend en charge tous les soins de reanimation neurologique si une intoxication medicamenteuse se produit."],
    ["A quel age assurer mon Berger des Shetlands pour eviter les exclusions ?", "Des l'acquisition, idealement avant 6 mois. L'epilepsie et l'anomalie de l'oeil du Colley peuvent etre detectees tot — toute consultation ophtalmologique avant souscription peut creer une exclusion definitive."],
    ["Quel budget mensuel pour assurer un Berger des Shetlands ?", "Entre 18 et 28 euros/mois. La race presente un risque modere avec des tarifs raisonnables — une formule couvrant maladies hereditaires et soins neurologiques est particulierement adaptee."],
  ]
);

update("caniche",
  "Race la plus intelligente selon Stanley Coren, le Caniche est aussi l'une des plus longevives — mais cette longevite a un prix : des pathologies oculaires et endocriniennes qui apparaissent discretement apres 5 ans.",
  "La <strong>maladie d'Addison</strong> (insuffisance surrenalienne) touche le Caniche le plus souvent entre <strong>4 et 7 ans</strong>, apres des mois de symptomes vagues. Au moment du diagnostic, les assureurs l'excluent comme <strong>maladie preexistante</strong>. Souscrire avant 3 ans garantit une prise en charge complete du traitement substitutif a vie (<strong>200-600 euros/an</strong>).",
  "Source : Canine Addison's Disease Foundation Health Statistics 2023 ; Kennel Club UK Poodle Health Survey 2022",
  "Avec plus de 15 000 naissances annuelles, le Caniche reste l'une des races les plus representees en France (FACCO 2024). Sa longevite exceptionnelle (14-17 ans) signifie des annees supplementaires d'exposition aux maladies chroniques — ce qui rend une couverture assurance sur le long terme particulierement rentable.",
  [
    ["L'atrophie progressive de la retine (APR) du Caniche est-elle couverte ?", "L'APR etant hereditaire, elle est couverte si l'assurance est souscrite avant tout examen ophtalmologique revelant la pathologie. SanteVet prend en charge le suivi ophtalmologique et les soins palliatifs dans ses formules."],
    ["A quel age assurer son Caniche pour couvrir la maladie d'Addison ?", "Avant 3 ans, avant l'apparition des premiers signes. La maladie d'Addison se manifeste par des episodes vagues (fatigue, vomissements) — une simple consultation pour ces symptomes peut suffire a creer une exclusion chez certains assureurs."],
    ["Quel budget mensuel pour assurer un Caniche ?", "Entre 15 et 25 euros/mois selon la taille et la formule. Sa longevite rend la souscription precoce avantageuse — 15 ans de couverture a tarif fixe representent une excellente protection contre les maladies chroniques."],
  ]
);

update("husky-siberien",
  "Descendant des chiens de traineau inuits, le Husky Siberien est une machine athletique aux yeux magnetiques — mais ses maladies oculaires hereditaires menacent silencieusement sa vision des l'age adulte.",
  "L'<strong>uvéite hereditaire pigmentaire</strong> du Husky est une maladie auto-immune genetique : une fois declaree, elle ne peut pas etre couverte si l'assurance est souscrite apres le premier episode. <strong>60 % des cas</strong> sont diagnostiques entre 2 et 5 ans. Un bilan ophtalmologique annuel et une assurance active avant 2 ans sont les deux seules protections efficaces.",
  "Source : Siberian Husky Club of America Health Committee Report 2023 ; American College of Veterinary Ophthalmologists ACVO",
  "Le Husky Siberien est l'une des rares races nordiques a avoir conquis les salons francais. Sa demande d'exercice intense (minimum 2h/jour) le predispose a des traumatismes lors des activites de mushing ou de cani-cross — des accidents bien couverts par les contrats tous risques.",
  [
    ["L'uvéite hereditaire du Husky est-elle remboursee par l'assurance ?", "Oui, si la souscription precede tout diagnostic ophtalmologique. L'uvéite hereditaire necessite des collyres immunosuppresseurs a vie (150-300 euros/mois) et des controles reguliers — SanteVet couvre l'integralite de ces frais en formule Confort."],
    ["Quand souscrire une assurance pour un Husky Siberien ?", "Avant 18 mois, avant tout bilan ophtalmologique de depistage. Les anomalies retiniennes hereditaires peuvent etre detectees precocement — une fois documentees, elles deviennent des exclusions permanentes chez la plupart des assureurs."],
    ["Quel budget mensuel pour assurer un Husky Siberien ?", "Entre 20 et 35 euros/mois selon la formule et l'age. Le profil ophtalmologique particulier du Husky justifie une formule incluant les soins specialises — SanteVet propose des options adaptees des 18 euros/mois."],
  ]
);

update("chihuahua",
  "Ne vous fiez pas a sa taille : le Chihuahua accumule des fragilites articulaires, cardiaques et neurologiques qui surprennent meme les veterinaires — et qui peuvent couter bien plus que prevu.",
  "Une chirurgie de luxation de rotule pour un Chihuahua coute entre <strong>800 et 2 500 euros</strong> — soit <strong>4 a 11 ans d'assurance</strong> au tarif entree de gamme. L'<strong>hydrocephalie congenitale</strong>, diagnostiquee chez certains chiots, necessite un shunt chirurgical a <strong>3 000-5 000 euros</strong>. A cette taille, aucune pathologie n'est financierement anodine.",
  "Source : Federation Cynologique Internationale Chihuahua Breed Standard Health Notes ; Societe Centrale Canine 2024",
  "Le Chihuahua est la 6e race la plus populaire en France (FACCO 2024), tres prise en milieu urbain pour sa taille compacte. Cette miniaturisation extreme a un cout biologique : les organes condenses dans un si petit corps generent des pathologies structurelles specifiques, parfois des le plus jeune age.",
  [
    ["La luxation de la rotule du Chihuahua est-elle remboursee ?", "Oui, la chirurgie de luxation de rotule est couverte par SanteVet des le premier jour si souscrit avant tout diagnostic. Elle represente 800 a 2 500 euros selon le grade — rembourses a 100 % en formule Confort."],
    ["Un petit chien a-t-il vraiment besoin d'une assurance sante ?", "Absolument. Les frais veterinaires d'un Chihuahua peuvent atteindre le meme niveau qu'un grand chien pour des pathologies comme l'hydrocephalie (3 000-5 000 euros) ou les cardiopathies congenitales. La taille miniature ne reduit pas les couts."],
    ["Quelle formule choisir pour un Chihuahua ?", "Une formule couvrant chirurgie orthopedique, soins neurologiques et cardiopathies est recommandee. SanteVet propose des formules adaptees aux petites races des 15 euros/mois, avec une couverture complete des maladies hereditaires caracteristiques."],
  ]
);

update("cavalier-king-charles",
  "Visage d'ange et sante vulnerable : le Cavalier King Charles est la race pour laquelle une assurance n'est pas une option mais une necessite absolue — la maladie cardiaque touche quasi 100 % des individus a 10 ans.",
  "La <strong>maladie valvulaire mitrale (MVD)</strong> touche <strong>50 % des Cavaliers a 5 ans</strong> et <strong>quasi 100 % a 10 ans</strong>. Les assureurs acceptant encore un Cavalier apres 4-5 ans appliquent des <strong>majorations de prime de 40 a 80 %</strong> et excluent souvent les cardiopathies. Souscrire avant <strong>1 an</strong> est la seule facon de figer des conditions favorables.",
  "Source : Cavalier Health UK MVD Breeding Protocol Statistics 2023 ; Haggstrom et al., Journal of Veterinary Internal Medicine",
  "Le Cavalier King Charles est l'un des chiens de compagnie les plus apprecies de France pour sa tendresse. Les proprietaires de Cavalier depensent en moyenne 2 a 3 fois plus en frais veterinaires que pour une race de sante standard — une realite que peu anticipent a l'achat.",
  [
    ["La maladie valvulaire mitrale du Cavalier King Charles est-elle couverte ?", "Oui, a condition de souscrire avant tout souffle cardiaque detecte a l'auscultation. SanteVet couvre la medication cardiaque a vie, les echocardiographies et les hospitalisations — des frais pouvant atteindre 1 500 euros/an."],
    ["Pourquoi assurer son Cavalier King Charles le plus tot possible ?", "Parce que la MVD est inevitable dans cette race, et chaque mois d'attente risque de voir apparaitre un premier souffle bloquant la couverture cardiaque definitivement. Les chiots Cavalier doivent etre assures des leur arrivee au foyer."],
    ["Quel budget mensuel pour assurer un Cavalier King Charles ?", "Entre 28 et 55 euros/mois — les tarifs les plus eleves de toutes les races de compagnie. Face a des frais pouvant depasser 3 000 euros/an en phase cardiaque avancee, c'est le meilleur investissement possible pour cette race."],
  ]
);

update("shih-tzu",
  "Petit lion a la criniere royale, le Shih Tzu impressionne par son elegance — mais ses yeux saillants et son museau court font de chaque journee une vigilance ophtalmologique que tout proprietaire doit integrer.",
  "Une <strong>proptose oculaire</strong> (luxation du globe) chez le Shih Tzu est une urgence chirurgicale a traiter en <strong>moins de 30 minutes</strong> pour esperer sauver l'oeil — cout : <strong>1 500 a 3 000 euros</strong>. Cette pathologie est imprevisible et peut survenir lors d'un jeu trop vigoureux. Sans assurance active, ce cout repose entierement sur le proprietaire.",
  "Source : British Veterinary Association BVA Brachycephalic Breed Health Report 2023 ; Societe Centrale Canine",
  "Le Shih Tzu est tres apprecie des seniors et des familles en appartement pour son caractere doux et ses besoins d'exercice moderes. Sa toilette exigeante cree un lien quotidien — ce qui permet souvent de detecter precocement les infections cutanees et oculaires qui, traitees tot, restent peu couteuses.",
  [
    ["Les urgences oculaires du Shih Tzu sont-elles couvertes par l'assurance ?", "Oui, SanteVet couvre les urgences ophtalmologiques incluant la proptose et les ulceres corneens perforants. Ces interventions, qui peuvent atteindre 3 000 euros, sont remboursees a 100 % en formule Confort."],
    ["A quel age assurer son Shih Tzu ?", "Des l'acquisition, avant toute consultation ophtalmologique. Les pathologies oculaires et brachycephales peuvent etre documentees tres tot — chaque consultation avant souscription cree un risque d'exclusion definitive."],
    ["Quel budget mensuel pour assurer un Shih Tzu ?", "Entre 20 et 35 euros/mois selon la formule et l'age. Le Shih Tzu presente un profil de risque moyen a eleve avec ses pathologies brachycephales et oculaires — une formule avec couverture chirurgie et ophtalmologie est recommandee."],
  ]
);

update("yorkshire-terrier",
  "Petit chien au grand caractere, le Yorkshire Terrier reunit dans son corps miniature trois fragilites majeures : trachee, rotule et foie — chacune pouvant necessiter une intervention chirurgicale couteuse.",
  "Le <strong>collapsus tracheal</strong> en phase avancee necessite la pose d'un <strong>stent tracheal a 2 500-3 000 euros</strong> — non rembourse si la pathologie est declaree avant la souscription. La <strong>maladie de Legg-Calve-Perthes</strong>, frequente chez les chiots Yorkshire de 4 a 12 mois, necessite une chirurgie a <strong>1 500-3 500 euros</strong>.",
  "Source : Yorkshire Terrier Club of Great Britain Health Survey 2022 ; Societe Centrale Canine fiches races 2024",
  "Le Yorkshire Terrier est depuis des decennies l'une des races toy les plus populaires en France (FACCO 2024), particulierement prise en appartement. Sa toux chronique souvent banalisee peut masquer un collapsus tracheal progressif qui s'aggrave sans traitement.",
  [
    ["Le collapsus tracheal du Yorkshire Terrier est-il couvert par l'assurance ?", "Oui, a condition de souscrire avant tout diagnostic. SanteVet couvre les traitements medicaux et la pose de stent tracheal si necessaire — une intervention a 2 500-3 000 euros remboursee a 100 % en formule Confort."],
    ["A quel age assurer son Yorkshire Terrier ?", "Des l'acquisition, idealement avant 6 mois. La toux chronique peut apparaitre des 3-4 ans — tout diagnostic de collapsus avant souscription exclut definitivement la pathologie respiratoire du contrat."],
    ["Quel budget mensuel pour assurer un Yorkshire Terrier ?", "Entre 18 et 30 euros/mois selon la formule et l'age. Le Yorkshire est une race de risque modere dont les pathologies specifiques (trachee, rotule, foie) justifient une formule avec bonne couverture chirurgicale."],
  ]
);
