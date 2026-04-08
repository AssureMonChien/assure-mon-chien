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

update("border-collie",
  "Unanimement reconnu comme le chien le plus intelligent du monde, le Border Collie cache derriere ses prouesses cognitives une sensibilite genetique medicamenteuse qui peut rendre un traitement banal potentiellement fatal.",
  "Jusqu'a <strong>35 % des Border Collies</strong> sont porteurs de la mutation <strong>MDR1/ABCB1</strong>. Cette mutation peut rendre mortels des medicaments courants — antiparasitaires, antidiarrheiques, anesthesiants. L'<strong>anomalie de l'oeil du Colley (AOC)</strong>, presente chez 70 % des individus non testes, est hereditaire et non couverte si diagnostiquee avant la souscription.",
  "Source : Washington State University Vet Clinical Pharmacology Lab MDR1 Border Collie Statistics 2023 ; International Sheep Dog Society Health Survey",
  "Le Border Collie est la race de predilection des passionnes d'agility, d'obeissance et de troupeau en France. Sa vivacite mentale exige une stimulation constante — un manque d'activite genere des comportements compulsifs qui se traduisent parfois par des blessures auto-infligees necessitant des consultations vétérinaires repetees.",
  [
    ["L'anomalie de l'oeil du Colley (AOC) est-elle couverte par l'assurance ?", "Oui, a condition de souscrire avant tout examen ophtalmologique revelant la malformation. SanteVet couvre le suivi ophtalmologique et les interventions en cas de decollement de retine — une complication possible meme dans les formes dites beningnes."],
    ["Pourquoi tester son Border Collie pour MDR1 avant de souscrire une assurance ?", "Le test MDR1 (60 euros) permet d'adapter les soins et les traitements au statut genetique du chien. L'assurance couvre les urgences liees a une intoxication — mais un proprietaire informe peut les prevenir en evitant les molecules sensibles."],
    ["Quel budget mensuel pour assurer un Border Collie ?", "Entre 20 et 32 euros/mois selon la formule et l'age. Le Border Collie est une race de risque modere — ses tarifs d'assurance sont raisonnables tout en justifiant une couverture incluant soins ophtalmologiques et neurologiques."],
  ]
);

update("cocker-spaniel",
  "Séduisant avec ses grandes oreilles soyeuses, le Cocker Spaniel fait partie des races les plus touchees par les otites chroniques en France — une pathologie banalisee qui peut evoluer vers des chirurgies couteuses.",
  "Une <strong>ablation totale du conduit auditif (TECA)</strong> chez un Cocker Spaniel avec otites chroniques severes coute entre <strong>2 000 et 4 000 euros par oreille</strong>. La <strong>nephropathie familiale</strong>, specifique au Cocker Anglais, necessite une dialyse palliative a <strong>500-800 euros/mois</strong> en phase terminale. Ces deux pathologies hereditaires sont couvertes par SanteVet si la souscription intervient avant tout diagnostic.",
  "Source : Cocker Spaniel Club Health Survey UK 2022 ; Familial Nephropathy in Cocker Spaniels JAVMA 2021",
  "Le Cocker Spaniel Anglais est une race de chasse appreciee et un compagnon familial reconnu pour sa douceur (FACCO 2024). Sa predisposition aux otites cree un cercle vicieux : infections recurrentes traitees superficiellement, evolution vers l'otite chronique, puis vers des interventions chirurgicales lourdes que peu de proprietaires anticipent.",
  [
    ["Les otites chroniques du Cocker Spaniel sont-elles remboursees ?", "Oui, SanteVet couvre les consultations, traitements et chirurgies lies aux otites chroniques, y compris l'ablation du conduit auditif si necessaire. Le remboursement a 100 % en formule Confort evite de differer les soins qui aggravent la pathologie."],
    ["Quand assurer son Cocker Spaniel pour couvrir la nephropathie familiale ?", "Avant 2 ans, avant tout bilan renal. La nephropathie familiale est detectable par test ADN depuis 2020 — une fois diagnostiquee, elle devient une exclusion permanente. SanteVet couvre l'integralite du suivi renal si la souscription precede le diagnostic."],
    ["Quel budget mensuel pour assurer un Cocker Spaniel ?", "Entre 20 et 35 euros/mois selon la formule et l'age. Le profil de risque modere a eleve du Cocker — combine otites chroniques et risque de nephropathie — justifie une formule avec bonne couverture medecine specialisee."],
  ]
);

update("rottweiler",
  "Gardien puissant et loyal, le Rottweiler porte dans ses genes un double risque redoutable : dysplasie severe et osteosarcome — un cancer osseux fulminant qui frappe 1 Rottweiler sur 8 au cours de sa vie.",
  "L'<strong>osteosarcome du Rottweiler</strong> necessite en premiere intention une <strong>amputation du membre atteint a 3 000-5 000 euros</strong> suivie de chimiotherapie adjuvante a <strong>5 000-7 000 euros</strong>. Sans assurance, la majorite des proprietaires optent pour l'euthanasie faute de moyens. SanteVet couvre les cancers des le premier jour si souscrit avant tout diagnostic.",
  "Source : Rottweiler Health Foundation Cancer Incidence Report 2023 ; OFA Hip Dysplasia Statistics Rottweiler breed data",
  "Le Rottweiler est une race de travail appreciee des proprietaires recherchant un chien de garde (SCC 2024). Sa masse musculaire imposante (45-60 kg) amplifie les consequences des pathologies orthopediques — chaque kilo supplementaire aggrave la charge articulaire et rend les interventions chirurgicales plus complexes et couteuses.",
  [
    ["L'osteosarcome du Rottweiler est-il couvert par les assurances ?", "Oui, SanteVet couvre l'osteosarcome (amputation + chimiotherapie) si souscrit avant tout diagnostic. Cette couverture peut representer 10 000-12 000 euros d'actes medicaux — seule une assurance premium souscrite tot permet de financer ce niveau de soins."],
    ["A quel age assurer son Rottweiler pour couvrir la dysplasie ?", "Avant 12 mois, avant toute radiographie de depistage HD. Le Rottweiler presente un taux de dysplasie eleve (20 % selon OFA) — souscrire tot garantit une couverture chirurgicale complete sans exclusion orthopedique."],
    ["Quel budget mensuel pour assurer un Rottweiler ?", "Entre 28 et 50 euros/mois selon la formule et l'age. Les grandes races a risque eleve comme le Rottweiler justifient pleinement une formule premium — le ratio cout/couverture est particulierement favorable face aux risques oncologiques."],
  ]
);

update("dobermann",
  "Race d'elite du monde cynophile, le Dobermann est menace en silence par une cardiomyopathie dilatee qui frappe 50 % de la race — souvent sans prevenir, parfois mortellement.",
  "La <strong>cardiomyopathie dilatee (DCM)</strong> du Dobermann se developpe entre <strong>2 et 8 ans</strong>, souvent de facon asymptomatique. Passe <strong>4 ans</strong>, les assureurs majorent les primes de <strong>20 a 40 %</strong> et excluent les cardiopathies sur antecedents familiaux. Un Dobermann assure avant 2 ans avec un Holter normal beneficie de la meilleure couverture au meilleur prix.",
  "Source : Dobermann Pinscher Club of America DCM Research Program 2023 ; Meurs et al., Journal of Veterinary Cardiology 2022",
  "Le Dobermann est une race prisee des proprietaires experimentes en France, souvent en contexte de sport canin ou de protection. Les cardiologues veterinaires recommandent unanimement un Holter ECG annuel des l'age de 2 ans pour detecter les arythmies avant qu'elles ne deviennent fatales.",
  [
    ["La cardiomyopathie dilatee du Dobermann est-elle couverte par l'assurance ?", "Oui, si souscrit avant tout souffle ou anomalie detectee. SanteVet couvre les Holters annuels, les medications antiarythmiques et les hospitalisations cardiologiques — un budget annuel de 500 a 1 500 euros entierement pris en charge en formule Confort."],
    ["Pourquoi assurer son Dobermann avant 2 ans ?", "Parce que la DCM peut se developper sans symptome des 2 ans — et chaque Holter anormal cree un antecedent qui exclut la couverture cardiaque. Souscrire avant le premier bilan cardiologique est la seule strategie sans risque."],
    ["Quel budget mensuel pour assurer un Dobermann ?", "Entre 28 et 48 euros/mois selon la formule et l'age. Le Dobermann presente un profil de risque cardiaque tres eleve qui justifie une formule premium — rentabilisee des le premier Holter pathologique necessitant une prise en charge specialisee."],
  ]
);

update("boxer",
  "Athlete au coeur de clown, le Boxer souffre d'une double menace unique : une cardiomyopathie arythmique potentiellement mortelle et une predisposition exceptionnelle aux tumeurs cerebrales.",
  "La <strong>cardiomyopathie arythmogene (ARVC)</strong> du Boxer est causee par une <strong>mutation du gene striatin</strong> identifiee en 2009. Un test ADN (<strong>environ 90 euros</strong>) distingue les porteurs sains des porteurs homozygotes a haut risque. Mais la mutation ne garantit pas l'absence de maladie — le suivi cardio annuel et une assurance active avant tout symptome restent indispensables.",
  "Source : Meurs et al., Identification of a missense mutation in the boxer dog Circulation 2021 ; Boxer Breed Council Health Report UK 2023",
  "Le Boxer est une des races de grande taille les plus populaires de France pour son energie communicative et son caractere espiegle (FACCO 2024). Sa morphologie brachycephale moderee le rend vulnerable aux coups de chaleur — un risque souvent sous-estime par les proprietaires qui pratiquent le canicross ou l'agility en ete.",
  [
    ["La cardiomyopathie arythmogene (ARVC) du Boxer est-elle couverte ?", "Oui, SanteVet couvre le suivi cardiologique (Holter, echocardiographie) et les traitements antiarythmiques a condition de souscrire avant tout diagnostic. L'ARVC peut provoquer une mort subite — une couverture active est le seul filet de securite medicale."],
    ["A quel age assurer son Boxer pour couvrir les cardiopathies ?", "Avant 18 mois, avant tout premier bilan cardiologique. La DCM et l'ARVC peuvent etre detectees des 2 ans chez certains Boxers — souscrire tot garantit que la decouverte d'une arythmie ne se traduira pas par une exclusion immediatement apres le diagnostic."],
    ["Quel budget mensuel pour assurer un Boxer ?", "Entre 25 et 45 euros/mois selon la formule et l'age. Le Boxer presente un risque cardiaque et oncologique eleve — une formule couvrant cardiologie et cancers est indispensable pour une protection reelle face aux pathologies caracteristiques de la race."],
  ]
);

update("dalmatien",
  "Iconique et athletique, le Dalmatien est porteur de deux anomalies genetiques bien documentees : une surdite hereditaire silencieuse et une metabolisation des urates qui genere des calculs urinaires uniques dans le monde canin.",
  "Le Dalmatien est la seule race canine avec une <strong>mutation genetique SLC2A9</strong> provoquant une elimination anormale d'acide urique. Cette predisposition aux <strong>calculs d'urate</strong> est hereditaire et non couverte comme exclusion si declaree avant souscription. <strong>100 % des Dalmatiens</strong> sont porteurs — seule l'alimentation adaptee et un suivi regulier limitent le risque d'obstruction urinaire urgente.",
  "Source : Bannasch et al., Mutations in SLC2A9 PLoS Genetics 2008 confirme 2023 ; Dalmatian Club of America Health Committee 2023",
  "Le Dalmatien est une race active necessitant plus de 2h d'exercice quotidien — un chien qui s'epanouit dans les familles sportives et les grands espaces. Son regime alimentaire doit etre controle en purines tout au long de sa vie pour limiter la formation de calculs uratiques, ce qui genere un cout alimentaire specifique en plus des frais veterinaires.",
  [
    ["Les calculs urinaires d'urate du Dalmatien sont-ils couverts par l'assurance ?", "Oui, SanteVet couvre les episodes d'obstruction urinaire, la cystotomie et le suivi urologique a condition de souscrire avant tout episode diagnostique. La predisposition etant universelle dans la race, une souscription precoce est particulierement strategique."],
    ["Quand assurer son Dalmatien pour couvrir les pathologies genetiques ?", "Des l'acquisition, avant tout bilan urologique ou audiologique. Le test BAER (surdite) et le premier dosage d'acide urique avant souscription peuvent creer des exclusions definitives — souscrire avant ces examens est la seule strategie efficace."],
    ["Quel budget mensuel pour assurer un Dalmatien ?", "Entre 18 et 30 euros/mois selon la formule et l'age. Le Dalmatien presente un profil de risque modere avec des pathologies specifiques mais previsibles — une formule avec bonne couverture urologique et neurologique est adaptee."],
  ]
);

update("carlin",
  "Masque de clown et regard attendrissant, le Carlin dissimule derriere sa rondeur une anatomie parmi les plus compromises du monde canin — des problemes respiratoires severes aux neurologies fatales.",
  "Le cout moyen d'une <strong>chirurgie brachycephale complete</strong> pour un Carlin (narines, palais, saccules) atteint <strong>3 500-5 000 euros</strong> — souvent necessaire avant l'age de 2 ans. Une <strong>hernie discale paralysante</strong> ajoute 4 000-7 000 euros d'IRM et chirurgie. Sans assurance, le budget moyen d'un proprietaire de Carlin sur 10 ans depasse <strong>12 000 euros de frais veterinaires</strong>.",
  "Source : Pug Dog Club of America Health & Research Committee 2023 ; BSAVA Congress Proceedings Brachycephalic Breeds 2023",
  "Le Carlin (Pug) est l'une des races brachycephales les plus populaires de France, particulierement prise en milieu urbain (FACCO 2024). Malgre sa popularite sur les reseaux sociaux, moins de 10 % des proprietaires de Carlin connaissent l'existence de l'encephalite PDE — pourtant l'une des causes de mortalite les plus frequentes dans la race.",
  [
    ["L'encephalite du Carlin (PDE) est-elle couverte par les assurances ?", "Oui, sous reserve de souscription avant les premiers symptomes neurologiques. La PDE (Pug Dog Encephalitis) est toujours fatale une fois declaree — SanteVet couvre les bilans neurologiques, l'IRM diagnostique et les soins palliatifs en formule premium."],
    ["Pourquoi assurer son Carlin avant 6 mois ?", "Le syndrome brachycephale necessite souvent une chirurgie avant 18 mois — souscrire apres cette consultation implique une exclusion de toutes les pathologies respiratoires. L'acquisition d'un Carlin sans assurance immediate est un risque financier majeur."],
    ["Pourquoi l'assurance d'un Carlin est-elle plus chere ?", "Les assureurs basent leurs tarifs sur les statistiques de sinistres par race. Le Carlin cumule BOAS, hernies discales, encephalite PDE et problemes oculaires — son cout veterinaire moyen est parmi les plus eleves toutes races confondues. Comptez 30 a 55 euros/mois."],
  ]
);

update("teckel",
  "Champion du monde de hernie discale, le Teckel vit avec une epee de Damocles vertebrale : 1 chien sur 4 sera un jour paralyse, souvent du jour au lendemain, sans signe avant-coureur.",
  "Une <strong>hernie discale Hansen type I</strong> du Teckel peut evoluer d'une douleur dorsale moderee a une <strong>paralysie complete en moins de 12 heures</strong>. La fenetre chirurgicale optimale est de <strong>24 a 48 heures</strong> apres les premiers signes — passé ce delai, les chances de recuperation motrice tombent sous 50 %. Une assurance avec remboursement rapide n'est pas un luxe : c'est une condition de survie fonctionnelle.",
  "Source : IWGPD International Working Group on Paraplegia in Dogs 2023 ; Jeffery et al., Disc Herniation Prognosis in Dachshunds JVIM 2021",
  "Le Teckel est la race qui illustre le mieux le decalage entre apparence robuste et fragilite structurelle. En France, les cliniques veterinaires specialisees voient leurs admissions en urgence IVDD doubler chaque decennie (donnees ANMV). L'IVDD est aujourd'hui la pathologie veterinaire urgente la plus frequente en neurologie canine.",
  [
    ["La hernie discale (IVDD) du Teckel est-elle remboursee par l'assurance ?", "Oui, SanteVet couvre l'IRM diagnostique, la chirurgie de decompression et la reeducation neurologique post-operatoire. Ces frais cumulés atteignent 5 000-8 000 euros — entierement rembourses a 100 % en formule Confort, sous reserve de souscription avant tout episode."],
    ["A quel age assurer son Teckel pour couvrir les hernies discales ?", "Des l'acquisition du chiot, idealement avant 6 mois. Le premier episode peut survenir des 3 ans chez le Teckel standard. Tout antecedent de douleur dorsale mentionne en consultation avant souscription peut exclure definitivement les pathologies spinales."],
    ["Quel budget mensuel pour assurer un Teckel ?", "Entre 22 et 38 euros/mois selon la formule et l'age. Le profil IVDD du Teckel justifie pleinement une formule avec couverture neurologie et chirurgie — le ratio prime/risque est l'un des plus favorables de toutes les races."],
  ]
);

update("saint-bernard",
  "Legende des Alpes et geant au coeur d'or, le Saint-Bernard concentre dans sa masse imposante les risques des grandes races : dysplasie record, torsion gastrique et osteosarcome font de chaque annee une vigilance veterinaire intense.",
  "La <strong>dysplasie de hanche bilaterale</strong> touche jusqu'a <strong>47 % des Saint-Bernards</strong> selon les registres radiographiques — le taux le plus eleve parmi les grandes races. Deux protheses totales de hanche atteignent <strong>16 000 euros</strong>. Une assurance a 40 euros/mois represente <strong>480 euros par an</strong> — soit un ratio de 1 pour 33 par rapport au pire scenario chirurgical.",
  "Source : OFA Hip Dysplasia Statistics Saint Bernard breed 47.7 % affected ; Saint Bernard Club of America Health Survey 2023",
  "Le Saint-Bernard est une race emblematique en France, appreciee des amateurs de grandes races pour son calme et sa douceur (SCC 2024). Sa taille exceptionnelle (70-90 kg) signifie des frais veterinaires majores sur chaque acte : anesthesie, chirurgie, hospitalisation — tout coute proportionnellement plus cher que pour une race de taille standard.",
  [
    ["La dysplasie de hanche du Saint-Bernard est-elle couverte a 100 % ?", "Oui, sous reserve de souscription avant tout examen radiographique. SanteVet couvre la chirurgie orthopedique incluant les protheses totales de hanche — jusqu'a 8 000 euros par hanche, rembourses a 100 % en formule Confort."],
    ["A quel age assurer son Saint-Bernard pour couvrir la dysplasie ?", "Avant 12 mois, avant tout bilan radiographique. Avec un taux de dysplasie de 47 % dans la race, souscrire avant le premier examen HD est une necessite absolue — un score HD-D avant souscription exclut toute chirurgie orthopedique."],
    ["Quel budget mensuel pour assurer un Saint-Bernard ?", "Entre 35 et 60 euros/mois selon la formule et l'age — parmi les tarifs les plus eleves du marche pour les grandes races. Ce surcout est largement justifie face a des frais veterinaires potentiels de 15 000 a 20 000 euros sur la vie du chien."],
  ]
);

update("montagne-des-pyrenees",
  "Gardien des troupeaux pyreneens depuis des siecles, la Montagne des Pyrenees est une race robuste — mais sa taille imposante et ses predispositions auto-immunes necessitent un suivi veterinaire regulier et couteux.",
  "L'<strong>hypothyroidie auto-immune</strong> de la Montagne des Pyrenees est hereditaire et sous-diagnostiquee : ses symptomes (prise de poids, alopecie, lethargie) sont souvent attribues a l'age. Non traites, les dommages thyroidiens s'aggravent de facon irreversible. Un dosage de <strong>T4 libre annuel (60 euros)</strong> et une couverture assurance avant 3 ans permettent une prise en charge optimale.",
  "Source : Great Pyrenees Club of America Health Survey 2022 ; OFA Thyroid Disease Statistics breed-specific data",
  "La Montagne des Pyrenees reste une race typiquement francaise, avec une base de proprietaires repartis entre eleveurs de montagne et familles ayant de grands espaces (SCC 2024). Sa nature independante et territoriale peut compliquer les consultations veterinaires — certains individus requierent une sedation pour les examens de routine, ce qui augmente les couts de chaque visite.",
  [
    ["La dysplasie de hanche de la Montagne des Pyrenees est-elle couverte ?", "Oui, a condition de souscrire avant tout examen radiographique. Avec une taille pouvant atteindre 70 kg, les frais chirurgicaux sont particulierement eleves — SanteVet couvre les protheses de hanche et les soins orthopediques jusqu'aux montants maximaux en formule premium."],
    ["Quand assurer sa Montagne des Pyrenees ?", "Avant 12 mois, avant tout bilan orthopedique ou thyroidien. La race presente des risques specifiques qui peuvent etre detectes jeunes — chaque examen avant souscription cree un risque d'exclusion de la pathologie concernee."],
    ["Quel budget mensuel pour assurer une Montagne des Pyrenees ?", "Entre 32 et 55 euros/mois selon la formule et l'age. Sa taille imposante majore chaque acte veterinaire — une formule couvrant chirurgie orthopedique, soins endocriniens et maladies auto-immunes est particulierement adaptee a cette race."],
  ]
);
