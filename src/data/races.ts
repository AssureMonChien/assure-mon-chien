// Single source of truth pour les 31 races analysées sur le site.
// Chaque entrée porte : slug, nom, taille, profil de risque, score (calculé),
// fourchette de coût annuel d'assurance, et tags pathologiques pour la
// recommandation d'assurance par race (cf. /comparatif/par-race/[slug]).

export interface Race {
  slug:    string;
  nom:     string;
  taille:  'petite' | 'moyenne' | 'grande';
  risque:  'faible' | 'modere' | 'eleve';
  score:   number;          // 0–100, par défaut dérivé du risque
  cost:    string;          // ex: "300 – 480 €"
  tags:    string[];        // pathologies dominantes (clés courtes)
}

const SCORE_DEFAULT = { faible: 30, modere: 58, eleve: 82 } as const;

// Tags pathologiques par race (utilisés pour personnaliser la recommandation)
const RACE_TAGS: Record<string, string[]> = {
  "akita-inu": ["dysplasie", "hypothyroidie", "cancer"],
  "beagle": ["epilepsie", "obesite", "oreilles"],
  "berger-allemand": ["dysplasie", "cancer", "myelopathie"],
  "berger-australien": ["cancer", "oeil", "epilepsie"],
  "berger-des-shetlands": ["dermatomyosite", "oeil", "rotule"],
  "bichon-frise": ["allergies", "rotule", "oeil"],
  "border-collie": ["epilepsie", "oeil", "dysplasie"],
  "bouledogue-francais": ["brachycephale", "dos", "allergies"],
  "boxer": ["cancer", "cardiaque", "dysplasie"],
  "caniche": ["oeil", "rotule", "epilepsie"],
  "carlin": ["brachycephale", "oeil", "allergies"],
  "cavalier-king-charles": ["cardiaque", "syringomyelie", "oeil"],
  "chihuahua": ["rotule", "hypoglycemie", "cardiaque"],
  "chow-chow": ["dysplasie", "oeil", "allergies"],
  "cocker-spaniel": ["oreilles", "oeil", "cardiaque"],
  "dalmatien": ["surdite", "urinaire", "allergies"],
  "dobermann": ["cardiaque", "cancer", "von-willebrand"],
  "epagneul-breton": ["dysplasie", "epilepsie", "oreilles"],
  "golden-retriever": ["cancer", "dysplasie", "cardiaque"],
  "husky-siberien": ["oeil", "dysplasie", "auto-immune"],
  "jack-russell": ["rotule", "oeil", "surdite"],
  "labrador": ["dysplasie", "obesite", "cancer"],
  "malinois": ["dysplasie", "estomac", "cancer"],
  "montagne-des-pyrenees": ["dysplasie", "estomac", "cancer"],
  "rottweiler": ["dysplasie", "cancer", "cardiaque"],
  "saint-bernard": ["dysplasie", "estomac", "cardiaque"],
  "samoyede": ["dysplasie", "auto-immune", "oeil"],
  "setter-irlandais": ["estomac", "epilepsie", "cancer"],
  "shih-tzu": ["oeil", "rotule", "allergies"],
  "teckel": ["dos", "rotule", "oeil"],
  "yorkshire-terrier": ["rotule", "foie", "allergies"],
};

export const RACES: Race[] = [
  { slug: "akita-inu", nom: "Akita Inu", taille: "grande", risque: "modere", score: SCORE_DEFAULT['modere'], cost: "216 – 480 €", tags: RACE_TAGS["akita-inu"] },
  { slug: "beagle", nom: "Beagle", taille: "petite", risque: "modere", score: SCORE_DEFAULT['modere'], cost: "250 – 420 €", tags: RACE_TAGS["beagle"] },
  { slug: "berger-allemand", nom: "Berger Allemand", taille: "grande", risque: "eleve", score: SCORE_DEFAULT['eleve'], cost: "300 – 480 €", tags: RACE_TAGS["berger-allemand"] },
  { slug: "berger-australien", nom: "Berger Australien", taille: "grande", risque: "modere", score: SCORE_DEFAULT['modere'], cost: "250 – 420 €", tags: RACE_TAGS["berger-australien"] },
  { slug: "berger-des-shetlands", nom: "Berger des Shetlands", taille: "petite", risque: "modere", score: SCORE_DEFAULT['modere'], cost: "180 – 360 €", tags: RACE_TAGS["berger-des-shetlands"] },
  { slug: "bichon-frise", nom: "Bichon Frisé", taille: "petite", risque: "faible", score: SCORE_DEFAULT['faible'], cost: "200 – 380 €", tags: RACE_TAGS["bichon-frise"] },
  { slug: "border-collie", nom: "Border Collie", taille: "grande", risque: "modere", score: SCORE_DEFAULT['modere'], cost: "220 – 400 €", tags: RACE_TAGS["border-collie"] },
  { slug: "bouledogue-francais", nom: "Bouledogue Français", taille: "petite", risque: "eleve", score: SCORE_DEFAULT['eleve'], cost: "300 – 540 €", tags: RACE_TAGS["bouledogue-francais"] },
  { slug: "boxer", nom: "Boxer", taille: "grande", risque: "eleve", score: SCORE_DEFAULT['eleve'], cost: "300 – 480 €", tags: RACE_TAGS["boxer"] },
  { slug: "caniche", nom: "Caniche", taille: "petite", risque: "faible", score: SCORE_DEFAULT['faible'], cost: "200 – 380 €", tags: RACE_TAGS["caniche"] },
  { slug: "carlin", nom: "Carlin", taille: "petite", risque: "eleve", score: SCORE_DEFAULT['eleve'], cost: "300 – 540 €", tags: RACE_TAGS["carlin"] },
  { slug: "cavalier-king-charles", nom: "Cavalier King Charles", taille: "petite", risque: "eleve", score: SCORE_DEFAULT['eleve'], cost: "300 – 480 €", tags: RACE_TAGS["cavalier-king-charles"] },
  { slug: "chihuahua", nom: "Chihuahua", taille: "petite", risque: "modere", score: SCORE_DEFAULT['modere'], cost: "180 – 360 €", tags: RACE_TAGS["chihuahua"] },
  { slug: "chow-chow", nom: "Chow-Chow", taille: "grande", risque: "modere", score: SCORE_DEFAULT['modere'], cost: "250 – 420 €", tags: RACE_TAGS["chow-chow"] },
  { slug: "cocker-spaniel", nom: "Cocker Spaniel", taille: "petite", risque: "modere", score: SCORE_DEFAULT['modere'], cost: "220 – 380 €", tags: RACE_TAGS["cocker-spaniel"] },
  { slug: "dalmatien", nom: "Dalmatien", taille: "grande", risque: "modere", score: SCORE_DEFAULT['modere'], cost: "220 – 380 €", tags: RACE_TAGS["dalmatien"] },
  { slug: "dobermann", nom: "Dobermann", taille: "grande", risque: "eleve", score: SCORE_DEFAULT['eleve'], cost: "300 – 480 €", tags: RACE_TAGS["dobermann"] },
  { slug: "epagneul-breton", nom: "Épagneul Breton", taille: "petite", risque: "faible", score: SCORE_DEFAULT['faible'], cost: "200 – 360 €", tags: RACE_TAGS["epagneul-breton"] },
  { slug: "golden-retriever", nom: "Golden Retriever", taille: "grande", risque: "eleve", score: SCORE_DEFAULT['eleve'], cost: "300 – 480 €", tags: RACE_TAGS["golden-retriever"] },
  { slug: "husky-siberien", nom: "Husky Sibérien", taille: "grande", risque: "modere", score: SCORE_DEFAULT['modere'], cost: "220 – 400 €", tags: RACE_TAGS["husky-siberien"] },
  { slug: "jack-russell", nom: "Jack Russell Terrier", taille: "petite", risque: "modere", score: SCORE_DEFAULT['modere'], cost: "180 – 340 €", tags: RACE_TAGS["jack-russell"] },
  { slug: "labrador", nom: "Labrador Retriever", taille: "grande", risque: "eleve", score: 73, cost: "300–480 €", tags: RACE_TAGS["labrador"] },
  { slug: "malinois", nom: "Malinois", taille: "grande", risque: "modere", score: SCORE_DEFAULT['modere'], cost: "220 – 380 €", tags: RACE_TAGS["malinois"] },
  { slug: "montagne-des-pyrenees", nom: "Montagne des Pyrénées", taille: "grande", risque: "modere", score: SCORE_DEFAULT['modere'], cost: "300 – 480 €", tags: RACE_TAGS["montagne-des-pyrenees"] },
  { slug: "rottweiler", nom: "Rottweiler", taille: "grande", risque: "eleve", score: SCORE_DEFAULT['eleve'], cost: "350 – 540 €", tags: RACE_TAGS["rottweiler"] },
  { slug: "saint-bernard", nom: "Saint-Bernard", taille: "grande", risque: "eleve", score: SCORE_DEFAULT['eleve'], cost: "350 – 540 €", tags: RACE_TAGS["saint-bernard"] },
  { slug: "samoyede", nom: "Samoyède", taille: "grande", risque: "modere", score: SCORE_DEFAULT['modere'], cost: "220 – 420 €", tags: RACE_TAGS["samoyede"] },
  { slug: "setter-irlandais", nom: "Setter Irlandais", taille: "grande", risque: "modere", score: SCORE_DEFAULT['modere'], cost: "250 – 420 €", tags: RACE_TAGS["setter-irlandais"] },
  { slug: "shih-tzu", nom: "Shih Tzu", taille: "petite", risque: "modere", score: SCORE_DEFAULT['modere'], cost: "200 – 380 €", tags: RACE_TAGS["shih-tzu"] },
  { slug: "teckel", nom: "Teckel", taille: "petite", risque: "eleve", score: SCORE_DEFAULT['eleve'], cost: "200 – 360 €", tags: RACE_TAGS["teckel"] },
  { slug: "yorkshire-terrier", nom: "Yorkshire Terrier", taille: "petite", risque: "modere", score: SCORE_DEFAULT['modere'], cost: "180 – 360 €", tags: RACE_TAGS["yorkshire-terrier"] },
];

// Lookup helper
export const RACE_MAP: Record<string, Race> = Object.fromEntries(
  RACES.map(r => [r.slug, r])
);

// Mapping accent-aware pour les filenames d'images
export const RACE_IMG_MAP: Record<string, string> = {
  'bouledogue-francais':   'bouledogue-français',
  'montagne-des-pyrenees': 'montagne-des-Pyrénées',
};

// Helper image
export function raceImagePath(slug: string): string {
  return `/images/races/${RACE_IMG_MAP[slug] ?? slug}.webp`;
}
