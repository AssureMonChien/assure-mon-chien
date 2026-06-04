import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const RACE_DIR = 'src/pages/races';
const DRY_RUN  = process.argv.includes('--dry-run');

const TITLES = {
  'akita-inu':             'Akita Inu : santé, maladies et coûts vétérinaires 2026',
  'beagle':                'Beagle : santé, maladies et coûts vétérinaires 2026',
  'bearded-collie':        'Bearded Collie 2026 : dysplasie, Addison et hypothyroïdie',
  'berger-allemand':       'Berger Allemand : santé, maladies et coûts vétérinaires 2026',
  'berger-australien':     'Berger Australien : santé, maladies et coûts vétérinaires 2026',
  'berger-des-shetlands':  'Berger des Shetlands : santé, maladies et coûts vétérinaires 2026',
  'bichon-frise':          'Bichon Frisé : santé, maladies et coûts vétérinaires 2026',
  'border-collie':         'Border Collie : santé, maladies et coûts vétérinaires 2026',
  'bouledogue-francais':   'Bouledogue Français : santé, maladies et coûts vétérinaires 2026',
  'bouvier-bernois':       'Bouvier Bernois 2026 : histiocytose et coûts vétérinaires',
  'boxer':                 'Boxer : santé, maladies et coûts vétérinaires 2026',
  'caniche':               'Caniche : santé, maladies et coûts vétérinaires 2026',
  'cane-corso':            'Cane Corso 2026 : dysplasie, DCM & obligations légales',
  'carlin':                'Carlin : santé, maladies et coûts vétérinaires 2026',
  'cavalier-king-charles': 'Cavalier King Charles : santé et coûts vétérinaires 2026',
  'chihuahua':             'Chihuahua : santé, maladies et coûts vétérinaires 2026',
  'chow-chow':             'Chow-Chow : santé, maladies et coûts vétérinaires 2026',
  'cocker-spaniel':        'Cocker Spaniel : santé, maladies et coûts vétérinaires 2026',
  'corgi':                 'Corgi 2026 : hernie discale, dos long et coûts vétérinaires',
  'coton-de-tulear':       'Coton de Tuléar 2026 : longévité, PRA & luxation rotule',
  'dalmatien':             'Dalmatien : santé, maladies et coûts vétérinaires 2026',
  'dobermann':             'Dobermann : santé, maladies et coûts vétérinaires 2026',
  'dogue-allemand':        'Dogue Allemand 2026 : torsion gastrique & cardiomyopathie',
  'epagneul-breton':       'Épagneul Breton : santé, maladies et coûts vétérinaires 2026',
  'eurasier':              'Eurasier 2026 : dysplasie, hypothyroïdie et PRA',
  'golden-retriever':      'Golden Retriever : santé, maladies et coûts vétérinaires 2026',
  'husky-siberien':        'Husky Sibérien : santé, maladies et coûts vétérinaires 2026',
  'jack-russell':          'Jack Russell Terrier : santé, maladies et coûts vétérinaires 2026',
  'labrador':              'Labrador Retriever : santé, maladies et coûts vétérinaires 2026',
  'malinois':              'Malinois : santé, maladies et coûts vétérinaires 2026',
  'montagne-des-pyrenees': 'Montagne des Pyrénées : santé et coûts vétérinaires 2026',
  'pomsky':                'Pomsky 2026 : croisement Husky × Spitz Poméranien, non LOF',
  'rottweiler':            'Rottweiler : santé, maladies et coûts vétérinaires 2026',
  'saint-bernard':         'Saint-Bernard : santé, maladies et coûts vétérinaires 2026',
  'samoyede':              'Samoyède : santé, maladies et coûts vétérinaires 2026',
  'setter-irlandais':      'Setter Irlandais : santé, maladies et coûts vétérinaires 2026',
  'shar-pei':              'Shar-Peï 2026 : entropion, Fièvre Shar-Peï et amyloïdose',
  'shih-tzu':              'Shih Tzu : santé, maladies et coûts vétérinaires 2026',
  'spitz-pomeranien':      'Spitz Poméranien 2026 : luxation rotule & alopécie X',
  'teckel':                'Teckel : santé, maladies et coûts vétérinaires 2026',
  'yorkshire-terrier':     'Yorkshire Terrier : santé, maladies et coûts vétérinaires 2026',
};

// 40/41 descriptions corrigées — pomsky est déjà informationnel, non modifié
const DESCRIPTIONS = {
  'akita-inu':
    "Akita Inu : syndrome VKH (auto-immune oculaire), pemphigus, dysplasie hanche ~20 %. Traitements chroniques jusqu'à 5 000 €/an. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'beagle':
    "Beagle : épilepsie héréditaire (5 %), otites chroniques (20–30 %), hypothyroïdie. Coûts documentés à vie. Guide santé 2026.",
  'bearded-collie':
    "Bearded Collie : dysplasie hanche (12-18 %), maladie d'Addison (5-8 %), hypothyroïdie. Espérance de vie 12-15 ans. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'berger-allemand':
    "Berger Allemand : dysplasie de hanche (20 % OFA), myélopathie dégénérative, dilatation gastrique. Frais jusqu'à 8 000 €. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'berger-australien':
    "Berger Australien : mutation MDR1 (50 % porteurs), AOC, épilepsie. Urgences médicamenteuses jusqu'à 3 000 €. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'berger-des-shetlands':
    "Berger des Shetlands : AOC (60–70 %), mutation MDR1 (40–50 %), épilepsie. Sensibilités médicamenteuses critiques. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'bichon-frise':
    "Bichon Frisé : dermatite atopique (20–30 %), luxation de rotule (15–25 %), cataracte héréditaire. Traitements chroniques. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'border-collie':
    "Border Collie : AOC (≈70 % non testés), mutation MDR1 (35 %), épilepsie. Pathologies héréditaires documentées et coûts vétérinaires estimés. Guide 2026.",
  'bouledogue-francais':
    "Bouledogue Français : BOAS sévère (>70 %), hernie discale, hemivertèbres. Chirurgies dès 1 500 €. Pathologies, prévention et coûts vétérinaires 2026.",
  'bouvier-bernois':
    "Bouvier Bernois : histiocytose maligne (~25 %), dysplasie, cancers responsables de 50 % des décès. Espérance de vie 7-10 ans. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'boxer':
    "Boxer : ARVC (mutation striatin), mastocytomes (1re race mondiale), sténose aortique. Suivi cardiaque annuel obligatoire. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'caniche':
    "Caniche : atrophie rétinienne progressive (15–20 %), maladie d'Addison et épilepsie. Pathologies héréditaires documentées et coûts vétérinaires estimés. Guide 2026.",
  'cane-corso':
    "Cane Corso (catégorie 1) : dysplasie hanches/coudes, cardiomyopathie dilatée, ectropion. Obligations légales en France. Risques santé et coûts vétérinaires 2026.",
  'carlin':
    "Carlin : BOAS sévère (>70 %), hemivertèbres (~40 %), kératite pigmentaire. Chirurgies répétées. Race brachycéphale à risque élevé. Coûts vétérinaires documentés. Guide 2026.",
  'cavalier-king-charles':
    "Cavalier King Charles : MVD (~100 % à 10 ans), syringomyélie (25–70 %). Pathologies quasi universelles. Coûts vétérinaires estimés. Guide 2026.",
  'chihuahua':
    "Chihuahua : luxation de rotule (20–35 %), hydrocéphalie (5–10 %), collapsus trachéal. Pathologies de miniaturisation documentées et coûts vétérinaires estimés. Guide 2026.",
  'chow-chow':
    "Chow-Chow : dysplasie de hanche (top OFA), entropion (25 %), hypothyroïdie auto-immune. Coûts orthopédiques documentés et estimés. Guide 2026.",
  'cocker-spaniel':
    "Cocker Spaniel : otites chroniques (1re cause de consultation), PRA (10–20 %), néphropathie familiale. Coûts récurrents documentés et estimés. Guide 2026.",
  'corgi':
    "Corgi : hernie discale IVDD (chondrodystrophie), dysplasie, myélopathie dégénérative et atrophie progressive de la rétine. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'coton-de-tulear':
    "Coton de Tuléar : longévité exceptionnelle (jusqu'à 19 ans), luxation de la rotule, atrophie progressive de la rétine, neuropathie progressive. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'dalmatien':
    "Dalmatien : surdité congénitale (≈30 % unilatérale), calculs uratiques universels. Test BAER indispensable. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'dobermann':
    "Dobermann : cardiomyopathie dilatée (40–70 %), maladie de von Willebrand I et syndrome de Wobbler. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'dogue-allemand':
    "Dogue Allemand : torsion gastrique (risque vital, race la plus touchée), cardiomyopathie dilatée, ostéosarcome. Espérance de vie 7-10 ans. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'epagneul-breton':
    "Épagneul Breton : dysplasie de hanche (15–20 %), dermatite atopique, otites récidivantes. Race de chasse exposée. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'eurasier':
    "Eurasier : dysplasie hanche (10-15 %), hypothyroïdie (5-8 %), PRA (4-7 %). Espérance de vie 12-14 ans. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'golden-retriever':
    "Golden Retriever : cancer (60 % après 10 ans), dysplasie de hanche (20 %), lymphome. Race la plus touchée par le cancer. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'husky-siberien':
    "Husky Sibérien : uvéite héréditaire pigmentaire et PRA liée à l'X. Contrôle ophtalmologique annuel indispensable. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'jack-russell':
    "Jack Russell : luxation de rotule (20–25 %), maladie de Legg-Calvé-Perthes (5–10 %), ataxie spinocérébelleuse. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'labrador':
    "Labrador Retriever : dysplasie de hanche (12 %), mutation POMC et obésité. Pathologies héréditaires documentées et budget estimé sur 12 ans. Guide santé 2026.",
  'malinois':
    "Malinois : dysplasie de hanche (10–15 %), épilepsie et blessures sport/travail. Pathologies documentées et coûts vétérinaires estimés. Guide santé 2026.",
  'montagne-des-pyrenees':
    "Montagne des Pyrénées : dysplasie hanche et coude, OCD et entropion. Race géante (60–90 kg) aux coûts vétérinaires élevés. Fiche santé et budget 12 ans. Guide 2026.",
  'rottweiler':
    "Rottweiler : dysplasie de hanche (20 % OFA), ostéosarcome (1re race mondiale), dilatation gastrique. Frais jusqu'à 12 000 €. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'saint-bernard':
    "Saint-Bernard : dysplasie de hanche (47,7 % OFA), dilatation-torsion gastrique et ostéosarcome. Race géante aux coûts vétérinaires élevés. Fiche santé 2026.",
  'samoyede':
    "Samoyède : néphropathie héréditaire liée à l'X, diabète insulino-dépendant et hémophilie A. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'setter-irlandais':
    "Setter Irlandais : épilepsie héréditaire (1/8 individus), dysplasie de hanche (20–25 %), DTG. Race de chasse exposée. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'shar-pei':
    "Shar-Peï : entropion (70-80 %), Fièvre Shar-Peï (25-30 %), amyloïdose rénale. Espérance de vie 8-12 ans. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'shih-tzu':
    "Shih Tzu : entropion (25–35 %), BOAS modéré, luxation de rotule, hernie discale cervicale. Morphologie brachycéphale. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'spitz-pomeranien':
    "Spitz Poméranien : luxation de la rotule (15-25 %), alopécie X, collapsus trachéal. Espérance de vie 12-16 ans. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'teckel':
    "Teckel : hernie discale Hansen I (25 % sur la vie), épilepsie de Lafora, diabète. Chirurgie décompressive jusqu'à 7 000 €. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  'yorkshire-terrier':
    "Yorkshire Terrier : collapsus trachéal, luxation de rotule, Legg-Calvé-Perthes, shunt porto-systémique. Races toy fragiles. Pathologies documentées et coûts vétérinaires estimés. Guide 2026.",
  // pomsky : description déjà informationelle — non modifiée
};

const slugs = Object.keys(TITLES);
let updated = 0, errors = 0;

for (const slug of slugs) {
  const filePath = join(RACE_DIR, `${slug}.astro`);
  let content;
  try {
    content = readFileSync(filePath, 'utf-8');
  } catch {
    console.error(`✗ ${slug}.astro — fichier introuvable`);
    errors++;
    continue;
  }
  const original = content;
  const newTitle = TITLES[slug];
  const newDesc  = DESCRIPTIONS[slug];

  if (!content.includes('title="')) {
    console.error(`✗ ${slug}.astro — attribut title= non trouvé`);
    errors++;
    continue;
  }

  content = content.replace(/title="[^"]*"/, `title="${newTitle}"`);

  if (newDesc) {
    if (!content.includes('description="')) {
      console.error(`✗ ${slug}.astro — attribut description= non trouvé`);
      errors++;
      content = original;
      continue;
    }
    content = content.replace(/description="[^"]*"/, `description="${newDesc}"`);
  }

  if (content === original) {
    console.log(`- ${slug}.astro (inchangé)`);
    continue;
  }

  if (DRY_RUN) {
    console.log(`~ ${slug}.astro (dry-run — non écrit)`);
  } else {
    writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ ${slug}.astro`);
  }
  updated++;
}

console.log(`\n${DRY_RUN ? '[DRY-RUN] ' : ''}Done — ${updated}/${slugs.length} fichiers ${DRY_RUN ? 'seraient modifiés' : 'modifiés'}${errors ? `, ${errors} erreur(s)` : ''}.`);
