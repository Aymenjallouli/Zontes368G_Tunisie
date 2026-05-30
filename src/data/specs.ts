export interface SpecRow {
  k: string;
  bold?: string;
  after: string;
}

export interface SpecBlock {
  title: string;
  index: string;
  rows: SpecRow[];
}

export const SPEC_BLOCKS: SpecBlock[] = [
  {
    title: 'Moteur',
    index: '01',
    rows: [
      { k: 'Type de moteur',  after: 'Monocylindre, 4 temps' },
      { k: 'Refroidissement', after: 'Liquide' },
      { k: 'Cylindrée',       bold: '367', after: ' cc' },
      { k: 'Puissance',       bold: '38',  after: ' cv (28 kW) à 7 500 tr/min' },
      { k: 'Boîte de vitesse',after: 'CVT' },
      { k: 'Consommation',    bold: '3,4', after: ' L/100 km' },
      { k: 'Émissions CO₂',  bold: '79',  after: ' g/km' },
    ],
  },
  {
    title: 'Dimensions & poids',
    index: '02',
    rows: [
      { k: 'L × l × H',                  after: '2 230 × 925 × 1 370 mm' },
      { k: 'Empattement',                 bold: '1 560', after: ' mm' },
      { k: 'Garde au sol',                bold: '180',   after: ' mm' },
      { k: 'Hauteur de selle',            bold: '795',   after: ' mm' },
      { k: 'Réservoir',                   bold: '17,5',  after: ' litres' },
      { k: 'Poids (en ordre de marche)',  bold: '203',   after: ' kg' },
    ],
  },
  {
    title: 'Châssis & freins',
    index: '03',
    rows: [
      { k: 'Frein avant',         after: 'Disque J.Juan' },
      { k: 'Frein arrière',       after: 'Disque J.Juan' },
      { k: 'Pneu avant',          after: '110/70 R17' },
      { k: 'Pneu arrière',        after: '150/70 R14' },
      { k: 'Fourche',             after: '41 mm, réglable' },
      { k: 'Suspensions',         after: 'Réglables' },
      { k: 'Aides à la conduite', after: 'ABS, contrôle de traction' },
    ],
  },
  {
    title: 'Équipements de série',
    index: '04',
    rows: [
      { k: 'Système de clé',  after: 'Mains libres' },
      { k: 'Phares et feux',  after: 'LED' },
      { k: 'Clignotants',     after: 'LED' },
      { k: 'Tableau de bord', after: 'TFT couleur 8"' },
      { k: 'Bulle',           after: 'Réglable 5 positions' },
      { k: 'Confort',         after: 'Poignées chauffantes' },
      { k: 'Protection',      after: 'Crash bars, sabot, protège-mains' },
      { k: 'Coffre',          after: '2 casques' },
      { k: 'Connectique',     after: 'USB type A et type C' },
    ],
  },
];
