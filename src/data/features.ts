export interface FeatureStat {
  value: string;
  unit?: string;
  label: string;
}

export interface Feature {
  index: string;
  imgSrc: string;
  imgAlt: string;
  eyebrow: string;
  title: string;
  description: string;
  stats: [FeatureStat, FeatureStat];
  flip?: boolean;
}

export const FEATURES: Feature[] = [
  {
    index: '01',
    imgSrc: '/images/assets/detail-headlight.webp',
    imgAlt: 'Optiques Full-LED',
    eyebrow: 'Signature lumineuse',
    title: 'Regard Full-LED',
    description:
      'Projecteurs et feux de jour intégralement LED, clignotants LED et signature lumineuse affirmée. Une face avant à la fois intimidante et raffinée.',
    stats: [
      { value: '100%', label: 'Éclairage LED' },
      { value: 'LED',  label: 'Clignotants' },
    ],
  },
  {
    index: '02',
    imgSrc: '/images/assets/detail-wheel.webp',
    imgAlt: 'Fourche inversée et disque',
    eyebrow: 'Châssis & liaison au sol',
    title: 'Fourche inversée 41 mm',
    description:
      "Fourche inversée réglable de 41 mm, amortisseur arrière à réservoir séparé et freinage à disques J.Juan avec ABS. La rigueur d'un véritable châssis d'aventure.",
    stats: [
      { value: '41', unit: ' mm', label: 'Fourche réglable' },
      { value: 'ABS',             label: '+ Contrôle de traction' },
    ],
    flip: true,
  },
  {
    index: '03',
    imgSrc: '/images/assets/detail-seat.webp',
    imgAlt: 'Selle ergonomique',
    eyebrow: 'Confort grand tourisme',
    title: 'Selle ergonomique',
    description:
      "Selle sculptée pour les longues distances, poignées chauffantes et bulle réglable sur 5 positions. Le confort d'un GT dans un format d'aventure.",
    stats: [
      { value: '795', unit: ' mm', label: 'Hauteur de selle' },
      { value: '5',                label: 'Positions de bulle' },
    ],
  },
  {
    index: '04',
    imgSrc: '/images/assets/detail-tank.webp',
    imgAlt: 'Réservoir et clé mains libres',
    eyebrow: 'Usage & technologie',
    title: 'Mains libres & 17,5 L',
    description:
      'Système de clé mains libres, tableau de bord TFT couleur 8", connectique USB type A et C. Un réservoir de 17,5 litres pour de longues étapes sans contrainte.',
    stats: [
      { value: '8"',  label: 'TFT couleur' },
      { value: '17,5', unit: ' L', label: 'Réservoir' },
    ],
    flip: true,
  },
];
