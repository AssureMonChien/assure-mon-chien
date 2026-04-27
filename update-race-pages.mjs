import { readFileSync, writeFileSync } from 'fs';

// ── Données par race ──────────────────────────────────────────────────────────
// Pour chaque race :
//   title       : balise <title> SEO (≤ 65 car.)
//   description : meta description (≤ 160 car.)
//   kf          : 4 données clés affichées en haut de page
//   figures     : 4 chiffres clés dans la section du bas (value + label)
// ─────────────────────────────────────────────────────────────────────────────
const races = {

  'labrador': {
    title: "Assurance Labrador Retriever : Dysplasie & Cancer | 2026",
    description: "Labrador : dysplasie de hanche (12 %), mutation POMC, lymphome. Coûts jusqu'à 12 000 €. Comparez les assurances chien adaptées. Guide expert mis à jour 2026.",
    kf: [
      { value: "12 %",    label: "dysplasie de hanche (OFA 2024)" },
      { value: "300 – 480 €", label: "assurance annuelle" },
      { value: "23 %",    label: "porteurs mutation POMC" },
      { value: "30 000",  label: "naissances / an en France" },
    ],
    figures: [
      { value: "12 %",     label: "des Labradors testés présentent une dysplasie de hanche (OFA 2024)" },
      { value: "6 000 €",  label: "coût moyen d'une prothèse totale de hanche en France" },
      { value: "23 %",     label: "des Labradors porteurs de la mutation POMC développent une obésité sévère" },
      { value: "30 000",   label: "naissances de Labradors par an en France (FACCO 2024)" },
    ],
  },

  'beagle': {
    title: "Assurance Beagle : Épilepsie & Otites Chroniques | 2026",
    description: "Beagle : épilepsie héréditaire (5 %), otites chroniques (20–30 %), hypothyroïdie. Coûts documentés à vie. Comparez les meilleures assurances. Guide 2026.",
    kf: [
      { value: "~5 %",    label: "épilepsie primaire héréditaire" },
      { value: "250 – 420 €", label: "assurance annuelle" },
      { value: "20 – 30 %", label: "otites chroniques récidivantes" },
      { value: "8 000",   label: "naissances / an en France" },
    ],
    figures: [
      { value: "5 %",      label: "des Beagles développent une épilepsie primaire héréditaire (The Kennel Club UK 2022)" },
      { value: "800 €",    label: "coût annuel maximum du traitement antiépileptique à vie" },
      { value: "30 %",     label: "des Beagles souffrent d'otites chroniques récidivantes" },
      { value: "8 000",    label: "naissances de Beagles par an en France (FACCO 2024)" },
    ],
  },

  'berger-allemand': {
    title: "Assurance Berger Allemand : Dysplasie & Myélopathie | 2026",
    description: "Berger Allemand : dysplasie de hanche (20 % OFA), myélopathie dégénérative, dilatation gastrique. Frais jusqu'à 8 000 €. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "~20 %",   label: "dysplasie de hanche (OFA 2024)" },
      { value: "300 – 480 €", label: "assurance annuelle" },
      { value: "2 – 4 %", label: "myélopathie dégénérative" },
      { value: "15 000",  label: "naissances / an en France" },
    ],
    figures: [
      { value: "20 %",     label: "des Bergers Allemands testés présentent une dysplasie de hanche (OFA 2024)" },
      { value: "6 000 €",  label: "coût moyen d'une prothèse totale de hanche" },
      { value: "2 – 4 %",  label: "développent une myélopathie dégénérative après 7 ans" },
      { value: "15 000",   label: "naissances de Bergers Allemands par an en France (FACCO 2024)" },
    ],
  },

  'berger-australien': {
    title: "Assurance Berger Australien : Mutation MDR1 & AOC | 2026",
    description: "Berger Australien : mutation MDR1 (50 % porteurs), AOC, épilepsie. Urgences médicamenteuses jusqu'à 3 000 €. Comparez les assurances adaptées. Guide 2026.",
    kf: [
      { value: "~50 %",   label: "porteurs mutation MDR1/ABCB1" },
      { value: "250 – 420 €", label: "assurance annuelle" },
      { value: "~7 %",    label: "dysplasie de hanche (OFA 2024)" },
      { value: "30 000+", label: "naissances / an en France" },
    ],
    figures: [
      { value: "~50 %",    label: "des Bergers Australiens porteurs de la mutation MDR1/ABCB1 (ASHGI 2023)" },
      { value: "3 000 €",  label: "coût maximal d'une hospitalisation pour neurotoxicité MDR1 grave" },
      { value: "7 %",      label: "de prévalence de dysplasie de hanche (OFA 2024 — relativement faible)" },
      { value: "30 000+",  label: "naissances annuelles, 3e race la plus populaire (FACCO 2024)" },
    ],
  },

  'berger-des-shetlands': {
    title: "Assurance Berger des Shetlands : MDR1 & AOC | 2026",
    description: "Berger des Shetlands : AOC (60–70 %), mutation MDR1 (40–50 %), épilepsie. Sensibilités médicamenteuses critiques. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "60 – 70 %", label: "porteurs AOC (non testés)" },
      { value: "180 – 360 €", label: "assurance annuelle" },
      { value: "40 – 50 %", label: "porteurs mutation MDR1" },
      { value: "5 000",   label: "naissances / an en France" },
    ],
    figures: [
      { value: "60 – 70 %", label: "des Shelties non testés porteurs de l'AOC (Collie Health Foundation 2023)" },
      { value: "40 – 50 %", label: "des Shelties porteurs de la mutation MDR1 (sensibilité médicamenteuse)" },
      { value: "3 – 8 %",   label: "développent une épilepsie idiopathique" },
      { value: "5 000",     label: "naissances de Bergers des Shetlands par an en France" },
    ],
  },

  'bichon-frise': {
    title: "Assurance Bichon Frisé : Atopie & Luxation Rotule | 2026",
    description: "Bichon Frisé : dermatite atopique (20–30 %), luxation de rotule (15–25 %), cataracte héréditaire. Traitements chroniques. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "20 – 30 %", label: "dermatite atopique chronique" },
      { value: "200 – 380 €", label: "assurance annuelle" },
      { value: "15 – 25 %", label: "luxation de rotule" },
      { value: "4 000",   label: "naissances / an en France" },
    ],
    figures: [
      { value: "20 – 30 %", label: "des Bichons Frisés développent une dermatite atopique chronique" },
      { value: "2 500 €",   label: "coût moyen d'une chirurgie de luxation de rotule" },
      { value: "8 – 12 %",  label: "des chiots développent la maladie de Legg-Calvé-Perthes" },
      { value: "4 000",     label: "naissances de Bichons Frisés par an en France (FACCO 2024)" },
    ],
  },

  'border-collie': {
    title: "Assurance Border Collie : AOC & Mutation MDR1 | 2026",
    description: "Border Collie : AOC (≈70 % non testés), mutation MDR1 (35 %), épilepsie. Pathologies héréditaires documentées. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "≈ 70 %",  label: "porteurs AOC (non testés)" },
      { value: "220 – 400 €", label: "assurance annuelle" },
      { value: "≈ 35 %",  label: "porteurs mutation MDR1" },
      { value: "10 000",  label: "naissances / an en France" },
    ],
    figures: [
      { value: "≈ 70 %",   label: "des Border Collies non testés porteurs de l'AOC (ISDS 2023)" },
      { value: "≈ 35 %",   label: "des Border Collies porteurs de la mutation MDR1/ABCB1" },
      { value: "3 – 5 %",  label: "développent une épilepsie idiopathique primaire" },
      { value: "10 000",   label: "naissances de Border Collies par an en France (FACCO 2024)" },
    ],
  },

  'bouledogue-francais': {
    title: "Assurance Bouledogue Français : BOAS & Hernie Discale | 2026",
    description: "Bouledogue Français : BOAS sévère (>70 %), hernie discale, hemivertèbres. Chirurgies dès 1 500 €. Race la plus assurée en France. Comparatif 2026.",
    kf: [
      { value: "> 70 %",  label: "affectés par le BOAS (voies aériennes)" },
      { value: "300 – 540 €", label: "assurance annuelle" },
      { value: "1 500 – 4 000 €", label: "chirurgie BOAS" },
      { value: "55 000+", label: "naissances / an — 1re race en France" },
    ],
    figures: [
      { value: "> 70 %",     label: "des Bouledogues Français présentent un BOAS nécessitant une surveillance (BSAVA 2023)" },
      { value: "4 000 €",    label: "coût maximum d'une chirurgie naso-palatoplastie (BOAS)" },
      { value: "~ 40 %",     label: "présentent des hemivertèbres liées à la queue enroulée" },
      { value: "55 000+",    label: "naissances / an — 1re race française depuis 2015 (FACCO 2024)" },
    ],
  },

  'boxer': {
    title: "Assurance Boxer : ARVC & Mastocytomes | Comparatif 2026",
    description: "Boxer : ARVC (mutation striatin), mastocytomes (1re race mondiale), sténose aortique. Suivi cardiaque annuel obligatoire. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "Très élevée", label: "ARVC (cardiomyopathie arythmogène)" },
      { value: "300 – 480 €", label: "assurance annuelle" },
      { value: "1re race",  label: "incidence mastocytomes cutanés" },
      { value: "6 000",   label: "naissances / an en France" },
    ],
    figures: [
      { value: "Élevée",    label: "prévalence de l'ARVC — mutation striatin spécifique au Boxer (Meurs 2021)" },
      { value: "3 000 €",   label: "coût moyen d'exérèse et chimiothérapie mastocytome de grade II" },
      { value: "1re race",  label: "incidence mondiale de mastocytomes cutanés et tumeurs cérébrales" },
      { value: "6 000",     label: "naissances de Boxers par an en France (FACCO 2024)" },
    ],
  },

  'caniche': {
    title: "Assurance Caniche : PRA & Maladie d'Addison | 2026",
    description: "Caniche : PRA héréditaire (15–20 %), maladie d'Addison (2–5 %), épilepsie. Maladies chroniques évitables par test ADN. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "15 – 20 %", label: "PRA — atrophie rétinienne progressive" },
      { value: "200 – 380 €", label: "assurance annuelle" },
      { value: "2 – 5 %",  label: "maladie d'Addison (CADF 2023)" },
      { value: "20 000",  label: "naissances / an en France" },
    ],
    figures: [
      { value: "15 – 20 %", label: "des Caniches nains/toy porteurs de la PRA-prcd (OFA 2024)" },
      { value: "3 000 €",   label: "coût moyen traitement maladie d'Addison sur 3 ans" },
      { value: "5 – 8 %",   label: "des Caniches nains développent une épilepsie idiopathique" },
      { value: "20 000",    label: "naissances de Caniches par an en France (FACCO 2024)" },
    ],
  },

  'carlin': {
    title: "Assurance Carlin : BOAS & Hemivertèbres | Comparatif 2026",
    description: "Carlin : BOAS sévère (>70 %), hemivertèbres (~40 %), kératite pigmentaire. Chirurgies répétées. Race brachycéphale à risque élevé. Comparatif 2026.",
    kf: [
      { value: "> 70 %",  label: "affectés par le BOAS sévère" },
      { value: "300 – 540 €", label: "assurance annuelle" },
      { value: "~ 40 %",  label: "hemivertèbres (queue enroulée)" },
      { value: "10 000",  label: "naissances / an en France" },
    ],
    figures: [
      { value: "> 70 %",    label: "des Carlins présentent un BOAS sévère (Pug Dog Club of America 2023)" },
      { value: "5 000 €",   label: "coût maximum chirurgie BOAS + voies aériennes" },
      { value: "~ 40 %",    label: "présentent des hemivertèbres liées à la queue enroulée" },
      { value: "10 000",    label: "naissances de Carlins par an en France (FACCO 2024)" },
    ],
  },

  'cavalier-king-charles': {
    title: "Assurance Cavalier King Charles : MVD & Syringomyélie | 2026",
    description: "Cavalier King Charles : MVD (~100 % à 10 ans), syringomyélie (25–70 %). Pathologies quasi universelles. Comparez les meilleures assurances. Guide 2026.",
    kf: [
      { value: "~100 %",  label: "valvulopathie mitrale (MVD) à 10 ans" },
      { value: "300 – 480 €", label: "assurance annuelle" },
      { value: "25 – 70 %", label: "syringomyélie (IRM)" },
      { value: "8 000",   label: "naissances / an en France" },
    ],
    figures: [
      { value: "~100 %",    label: "des Cavaliers développent une MVD avant 10 ans (Haggström 2018)" },
      { value: "3 000 €",   label: "coût annuel traitement insuffisance cardiaque congestive stade C" },
      { value: "25 – 70 %", label: "des Cavaliers affectés par la syringomyélie selon les lignées (IRM)" },
      { value: "8 000",     label: "naissances de Cavaliers King Charles par an en France" },
    ],
  },

  'chihuahua': {
    title: "Assurance Chihuahua : Luxation Rotule & Hydrocéphalie | 2026",
    description: "Chihuahua : luxation de rotule (20–35 %), hydrocéphalie (5–10 %), collapsus trachéal. Pathologies de miniaturisation. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "20 – 35 %", label: "luxation de rotule" },
      { value: "180 – 360 €", label: "assurance annuelle" },
      { value: "5 – 10 %", label: "hydrocéphalie congénitale" },
      { value: "15 000",  label: "naissances / an en France" },
    ],
    figures: [
      { value: "20 – 35 %", label: "des Chihuahuas présentent une luxation de rotule (FCI 2023)" },
      { value: "2 500 €",   label: "coût maximum chirurgie luxation de rotule bilatérale" },
      { value: "5 – 10 %",  label: "des Chihuahuas nés avec une hydrocéphalie congénitale" },
      { value: "15 000",    label: "naissances de Chihuahuas par an en France (FACCO 2024)" },
    ],
  },

  'chow-chow': {
    title: "Assurance Chow-Chow : Dysplasie Hanche & Entropion | 2026",
    description: "Chow-Chow : dysplasie de hanche (top OFA), entropion (25 %), hypothyroïdie auto-immune. Coûts orthopédiques élevés. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "≈ 25 %",  label: "entropion bilatéral" },
      { value: "250 – 420 €", label: "assurance annuelle" },
      { value: "Top OFA", label: "dysplasie de hanche toutes races" },
      { value: "3 000",   label: "naissances / an en France" },
    ],
    figures: [
      { value: "Top OFA",   label: "le Chow-Chow figure parmi les races avec le plus fort taux de dysplasie (OFA 2024)" },
      { value: "7 000 €",   label: "coût maximum chirurgie bilatérale dysplasie de hanche" },
      { value: "≈ 25 %",    label: "des Chow-Chows développent un entropion bilatéral (Club Français 2024)" },
      { value: "3 000",     label: "naissances de Chow-Chows par an en France (FACCO 2024)" },
    ],
  },

  'cocker-spaniel': {
    title: "Assurance Cocker Spaniel : Otites & PRA | Comparatif 2026",
    description: "Cocker Spaniel : otites chroniques (1re cause de consultation), PRA (10–20 %), néphropathie familiale. Coûts récurrents. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "1re cause", label: "otites chroniques (consultations)" },
      { value: "220 – 380 €", label: "assurance annuelle" },
      { value: "10 – 20 %", label: "PRA selon les lignées" },
      { value: "12 000",  label: "naissances / an en France" },
    ],
    figures: [
      { value: "1re cause",  label: "d'otites chroniques parmi toutes les races (WSAVA 2023)" },
      { value: "600 €",      label: "coût par épisode d'otite chronique récidivante sévère" },
      { value: "10 – 20 %",  label: "des Cockers Spaniels développent une PRA selon les lignées" },
      { value: "12 000",     label: "naissances de Cockers Spaniels par an en France (FACCO 2024)" },
    ],
  },

  'dalmatien': {
    title: "Assurance Dalmatien : Surdité Congénitale & Urolithiase | 2026",
    description: "Dalmatien : surdité congénitale (≈30 % unilatérale), calculs uratiques universels. Test BAER indispensable. Comparez les assurances chien. Guide 2026.",
    kf: [
      { value: "≈ 30 %",  label: "surdité unilatérale (test BAER)" },
      { value: "220 – 380 €", label: "assurance annuelle" },
      { value: "100 %",   label: "prédisposition calculs uratiques" },
      { value: "3 000",   label: "naissances / an en France" },
    ],
    figures: [
      { value: "≈ 30 %",    label: "des Dalmatiens atteints de surdité unilatérale (Strain 1999)" },
      { value: "4 000 €",   label: "coût maximum traitement chirurgical urolithiase uratique" },
      { value: "100 %",     label: "des Dalmatiens prédisposés génétiquement aux calculs uratiques" },
      { value: "3 000",     label: "naissances de Dalmatiens par an en France (FACCO 2024)" },
    ],
  },

  'dobermann': {
    title: "Assurance Dobermann : CMD & von Willebrand | Comparatif 2026",
    description: "Dobermann : cardiomyopathie dilatée (40–70 %), von Willebrand I (70 % porteurs), Wobbler. Surveillance cardiaque obligatoire. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "40 – 70 %", label: "cardiomyopathie dilatée (CMD)" },
      { value: "300 – 480 €", label: "assurance annuelle" },
      { value: "≈ 70 %",  label: "porteurs von Willebrand type I" },
      { value: "5 000",   label: "naissances / an en France" },
    ],
    figures: [
      { value: "40 – 70 %", label: "des Dobermanns développent une CMD (Wess et al. JVIM 2010)" },
      { value: "3 500 €",   label: "coût annuel traitement insuffisance cardiaque CMD stade C" },
      { value: "≈ 70 %",    label: "des Dobermanns porteurs de la maladie de von Willebrand type I" },
      { value: "5 000",     label: "naissances de Dobermanns par an en France (FACCO 2024)" },
    ],
  },

  'epagneul-breton': {
    title: "Assurance Épagneul Breton : Dysplasie & Atopie | 2026",
    description: "Épagneul Breton : dysplasie de hanche (15–20 %), dermatite atopique, otites récidivantes. Race de chasse exposée. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "15 – 20 %", label: "dysplasie de hanche (OFA)" },
      { value: "200 – 360 €", label: "assurance annuelle" },
      { value: "10 – 15 %", label: "dermatite atopique" },
      { value: "10 000",  label: "naissances / an en France" },
    ],
    figures: [
      { value: "15 – 20 %", label: "des Épagneuls Bretons présentent une dysplasie de hanche (OFA / CBEF 2023)" },
      { value: "4 500 €",   label: "coût maximum chirurgie orthopédique hanche (prothèse)" },
      { value: "10 – 15 %", label: "développent une dermatite atopique liée à l'exposition aux milieux naturels" },
      { value: "10 000",    label: "naissances d'Épagneuls Bretons par an en France (FACCO 2024)" },
    ],
  },

  'golden-retriever': {
    title: "Assurance Golden Retriever : Cancer & Dysplasie | 2026",
    description: "Golden Retriever : cancer (60 % après 10 ans), dysplasie de hanche (20 %), lymphome. Race la plus touchée par le cancer. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "~20 %",   label: "dysplasie de hanche (OFA 2024)" },
      { value: "300 – 480 €", label: "assurance annuelle" },
      { value: "60 %",    label: "risque cancer après 10 ans" },
      { value: "15 000",  label: "naissances / an en France" },
    ],
    figures: [
      { value: "20 %",     label: "des Golden Retrievers testés présentent une dysplasie de hanche (OFA 2024)" },
      { value: "8 000 €",  label: "coût moyen chimiothérapie lymphome (protocole CHOP 6 mois)" },
      { value: "60 %",     label: "des Golden Retrievers décèdent d'un cancer — première cause de mortalité" },
      { value: "15 000",   label: "naissances de Golden Retrievers par an en France (FACCO 2024)" },
    ],
  },

  'husky-siberien': {
    title: "Assurance Husky Sibérien : PHU & Pathologies Oculaires | 2026",
    description: "Husky Sibérien : uvéite héréditaire pigmentaire (PHU), XLPRA, dysplasie de hanche. Contrôle ophtalmologique annuel indispensable. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "Élevée",  label: "uvéite héréditaire pigmentaire (PHU)" },
      { value: "220 – 400 €", label: "assurance annuelle" },
      { value: "Annuel",  label: "contrôle ophtalmologique recommandé" },
      { value: "8 000",   label: "naissances / an en France" },
    ],
    figures: [
      { value: "Élevée",    label: "prévalence de l'uvéite héréditaire pigmentaire (PHU) spécifique à la race" },
      { value: "3 000 €",   label: "coût maximum traitement glaucome secondaire à l'uvéite" },
      { value: "Modérée",   label: "prévalence dysplasie de hanche (~10 % selon OFA 2024)" },
      { value: "8 000",     label: "naissances de Huskies Sibériens par an en France (FACCO 2024)" },
    ],
  },

  'jack-russell': {
    title: "Assurance Jack Russell : Luxation Rotule & LCP | 2026",
    description: "Jack Russell : luxation de rotule (20–25 %), maladie de Legg-Calvé-Perthes (5–10 %), ataxie spinocérébelleuse. Comparez les assurances chien. Guide 2026.",
    kf: [
      { value: "20 – 25 %", label: "luxation de rotule" },
      { value: "180 – 340 €", label: "assurance annuelle" },
      { value: "5 – 10 %", label: "maladie de Legg-Calvé-Perthes" },
      { value: "12 000",  label: "naissances / an en France" },
    ],
    figures: [
      { value: "20 – 25 %", label: "des Jack Russells présentent une luxation de rotule (JRTCGB 2023)" },
      { value: "3 000 €",   label: "coût maximum chirurgie maladie de Legg-Calvé-Perthes" },
      { value: "5 – 8 %",   label: "développent une cataracte héréditaire précoce" },
      { value: "12 000",    label: "naissances de Jack Russells par an en France (FACCO 2024)" },
    ],
  },

  'malinois': {
    title: "Assurance Malinois : Dysplasie & Épilepsie | Comparatif 2026",
    description: "Malinois : dysplasie de hanche (10–15 %), épilepsie idiopathique, risques traumatiques (sport, travail). Race de travail exposée. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "10 – 15 %", label: "dysplasie de hanche (élevage)" },
      { value: "220 – 380 €", label: "assurance annuelle" },
      { value: "Modérée", label: "épilepsie idiopathique" },
      { value: "15 000",  label: "naissances / an en France" },
    ],
    figures: [
      { value: "10 – 15 %", label: "des Malinois testés présentent une dysplasie de hanche (CBBF 2023)" },
      { value: "4 500 €",   label: "coût maximum chirurgie orthopédique hanche" },
      { value: "Modérée",   label: "prévalence épilepsie idiopathique documentée dans la race" },
      { value: "15 000",    label: "naissances de Malinois par an en France (FACCO 2024)" },
    ],
  },

  'montagne-des-pyrenees': {
    title: "Assurance Montagne des Pyrénées : Dysplasie & OCD | 2026",
    description: "Montagne des Pyrénées : dysplasie hanche/coude élevée, OCD (race géante), entropion. Gabarit 60–90 kg. Frais vétérinaires majorés. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "Élevée",  label: "dysplasie de hanche et du coude" },
      { value: "300 – 480 €", label: "assurance annuelle" },
      { value: "60 – 90 kg", label: "poids adulte (gabarit géant)" },
      { value: "5 000",   label: "naissances / an en France" },
    ],
    figures: [
      { value: "Élevée",    label: "prévalence dysplasie de hanche et du coude (OFA / CMPCF 2024)" },
      { value: "8 000 €",   label: "coût maximum chirurgie bilatérale dysplasie de hanche (géante)" },
      { value: "60 – 90 kg", label: "poids adulte — frais vétérinaires majorés par le gabarit géant" },
      { value: "5 000",     label: "naissances de Montagnes des Pyrénées par an en France (FACCO 2024)" },
    ],
  },

  'rottweiler': {
    title: "Assurance Rottweiler : Ostéosarcome & Dysplasie | 2026",
    description: "Rottweiler : dysplasie de hanche (20 % OFA), ostéosarcome (1re race mondiale), dilatation gastrique. Frais jusqu'à 12 000 €. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "≈ 20 %",  label: "dysplasie de hanche (OFA 2024)" },
      { value: "350 – 540 €", label: "assurance annuelle" },
      { value: "1re race", label: "incidence ostéosarcome mondial" },
      { value: "8 000",   label: "naissances / an en France" },
    ],
    figures: [
      { value: "≈ 20 %",    label: "des Rottweilers testés présentent une dysplasie de hanche (OFA 2024)" },
      { value: "12 000 €",  label: "coût maximum ostéosarcome — chirurgie + chimiothérapie 12 mois" },
      { value: "1re race",  label: "incidence mondiale d'ostéosarcome (ARC / OFA 2024)" },
      { value: "8 000",     label: "naissances de Rottweilers par an en France (FACCO 2024)" },
    ],
  },

  'saint-bernard': {
    title: "Assurance Saint-Bernard : Dysplasie 47 % & DTG | 2026",
    description: "Saint-Bernard : dysplasie de hanche (47,7 % OFA), dilatation-torsion gastrique, ostéosarcome. Race géante à risques majeurs. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "47,7 %",  label: "dysplasie de hanche (OFA 2024)" },
      { value: "350 – 540 €", label: "assurance annuelle" },
      { value: "60 – 90 kg", label: "poids adulte (gabarit géant)" },
      { value: "2 000",   label: "naissances / an en France" },
    ],
    figures: [
      { value: "47,7 %",    label: "des Saint-Bernards testés présentent une dysplasie de hanche (OFA 2024)" },
      { value: "8 000 €",   label: "coût maximum chirurgie bilatérale dysplasie de hanche" },
      { value: "Élevée",    label: "prévalence dilatation-torsion gastrique (urgence vitale 6h max)" },
      { value: "2 000",     label: "naissances de Saint-Bernards par an en France (FACCO 2024)" },
    ],
  },

  'samoyede': {
    title: "Assurance Samoyède : Néphropathie & Diabète | Comparatif 2026",
    description: "Samoyède : néphropathie héréditaire liée à l'X, diabète insulino-dépendant, hémophilie A. Maladies chroniques coûteuses. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "Spécifique", label: "néphropathie héréditaire liée à l'X" },
      { value: "220 – 420 €", label: "assurance annuelle" },
      { value: "Élevée",  label: "prévalence diabète insulino-dépendant" },
      { value: "4 000",   label: "naissances / an en France" },
    ],
    figures: [
      { value: "Spécifique", label: "néphropathie héréditaire liée à l'X — insuffisance rénale avant 3 ans chez les mâles" },
      { value: "1 200 €",    label: "coût annuel maximum traitement diabète insulino-dépendant" },
      { value: "500 – 3 000 €", label: "coût par épisode d'hémophilie A avec transfusion" },
      { value: "4 000",      label: "naissances de Samoyèdes par an en France (FACCO 2024)" },
    ],
  },

  'setter-irlandais': {
    title: "Assurance Setter Irlandais : Épilepsie & Dysplasie | 2026",
    description: "Setter Irlandais : épilepsie héréditaire (1/8 individus), dysplasie de hanche (20–25 %), DTG. Race de chasse exposée. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "20 – 25 %", label: "dysplasie de hanche" },
      { value: "250 – 420 €", label: "assurance annuelle" },
      { value: "1 / 8",    label: "individus épileptiques (certaines familles)" },
      { value: "4 000",   label: "naissances / an en France" },
    ],
    figures: [
      { value: "20 – 25 %", label: "des Setters Irlandais testés présentent une dysplasie de hanche (OFA / ISCI 2023)" },
      { value: "1 / 8",     label: "individus épileptiques dans certaines familles génétiques de la race" },
      { value: "5 000 €",   label: "coût maximum dilatation-torsion gastrique (urgence chirurgicale)" },
      { value: "4 000",     label: "naissances de Setters Irlandais par an en France (FACCO 2024)" },
    ],
  },

  'shih-tzu': {
    title: "Assurance Shih Tzu : Entropion & BOAS | Comparatif 2026",
    description: "Shih Tzu : entropion (25–35 %), BOAS modéré, luxation de rotule, hernie discale cervicale. Morphologie brachycéphale. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "25 – 35 %", label: "entropion palpébral" },
      { value: "200 – 380 €", label: "assurance annuelle" },
      { value: "15 – 25 %", label: "luxation de rotule" },
      { value: "12 000",  label: "naissances / an en France" },
    ],
    figures: [
      { value: "25 – 35 %", label: "des Shih Tzus développent un entropion palpébral (Shih Tzu Club UK 2023)" },
      { value: "1 500 €",   label: "coût chirurgie entropion bilatéral" },
      { value: "15 – 25 %", label: "présentent une luxation de rotule (morphologie compacte)" },
      { value: "12 000",    label: "naissances de Shih Tzus par an en France (FACCO 2024)" },
    ],
  },

  'teckel': {
    title: "Assurance Teckel : Hernie Discale IVDD (25 %) | 2026",
    description: "Teckel : hernie discale Hansen I (25 % sur la vie), épilepsie de Lafora, diabète. Chirurgie décompressive jusqu'à 7 000 €. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "≈ 25 %",  label: "hernie discale IVDD (sur la vie)" },
      { value: "200 – 360 €", label: "assurance annuelle" },
      { value: "2 000 – 7 000 €", label: "chirurgie décompressive rachis" },
      { value: "18 000",  label: "naissances / an en France" },
    ],
    figures: [
      { value: "≈ 25 %",    label: "des Teckels développent une hernie discale IVDD au cours de leur vie (Stigen 2007)" },
      { value: "7 000 €",   label: "coût maximum chirurgie décompressive rachis (hémilaminectomie)" },
      { value: "Modérée",   label: "prévalence épilepsie progressive de Lafora (lignées à poil dur)" },
      { value: "18 000",    label: "naissances de Teckels par an en France (FACCO 2024)" },
    ],
  },

  'yorkshire-terrier': {
    title: "Assurance Yorkshire Terrier : Trachée & Rotule | 2026",
    description: "Yorkshire Terrier : collapsus trachéal, luxation de rotule, Legg-Calvé-Perthes, shunt porto-systémique. Races toy fragiles. Comparez les assurances. Guide 2026.",
    kf: [
      { value: "Très élevée", label: "collapsus trachéal" },
      { value: "180 – 360 €", label: "assurance annuelle" },
      { value: "Très élevée", label: "luxation de rotule (races toy)" },
      { value: "20 000",  label: "naissances / an en France" },
    ],
    figures: [
      { value: "Très élevée", label: "prévalence du collapsus trachéal chez les Yorkshire Terriers (YTCA 2023)" },
      { value: "6 000 €",    label: "coût maximum shunt porto-systémique hépatique (chirurgie + suivi)" },
      { value: "Très élevée", label: "prévalence luxation de rotule et maladie de Legg-Calvé-Perthes" },
      { value: "20 000",     label: "naissances de Yorkshire Terriers par an en France (FACCO 2024)" },
    ],
  },

};

// ── Construit la prop kf en syntaxe Astro ────────────────────────────────────
function buildKfProp(items) {
  const rows = items.map(({value, label}) =>
    `    { value: "${value}", label: "${label}" },`
  ).join('\n');
  return `kf={[\n${rows}\n  ]}`;
}

// ── Construit les figures HTML ───────────────────────────────────────────────
function buildFigures(figures) {
  return figures.map(({value, label}) =>
    `      <div class="figure"><span class="figure-value">${value}</span><span class="figure-label">${label}</span></div>`
  ).join('\n');
}

// ── Applique les modifications à un fichier ──────────────────────────────────
let updated = 0;

for (const [slug, data] of Object.entries(races)) {
  const path = `src/pages/races/${slug}.astro`;
  let content;
  try {
    content = readFileSync(path, 'utf-8');
  } catch (e) {
    console.log(`SKIP (not found): ${path}`);
    continue;
  }

  // 1. Meta title
  content = content.replace(/title="[^"]*"/, `title="${data.title}"`);

  // 2. Meta description
  content = content.replace(/description="[^"]*"/, `description="${data.description}"`);

  // 3. kf prop — insert or replace
  const kfStr = buildKfProp(data.kf);
  if (content.includes('kf={[')) {
    // Replace existing kf prop
    content = content.replace(/kf=\{\[[\s\S]*?\]\}/, kfStr);
  } else {
    // Add kf prop after risque=
    content = content.replace(/(risque="[^"]*"\s*\n)(\s*>)/, `$1  ${kfStr}\n$2`);
  }

  // 4. Replace figures in key-figures section
  const newFigsHtml = buildFigures(data.figures);
  content = content.replace(
    /(<div class="figures-grid">\s*\n)([\s\S]*?)(\s*<\/div>\s*\n\s*<\/div>\s*\n\s*<!-- 13)/,
    (match, open, _old, close) => `${open}${newFigsHtml}\n    ${close}`
  );

  writeFileSync(path, content, 'utf-8');
  console.log(`UPDATED: ${slug}`);
  updated++;
}

console.log(`\nDone. ${updated} files updated.`);
