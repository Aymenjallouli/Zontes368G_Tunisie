export type ColorKey = 'blanc' | 'noir' | 'bleu';

export interface GalleryView {
  src: string;
  cap: string;
}

export interface ColorVariant {
  label: string;
  swatchBg: string;
  swatchBorder?: string;
  heroSrc: string;
  espritSrc: string;
  views: GalleryView[];
}

export const COLOR_DATA: Record<ColorKey, ColorVariant> = {
  blanc: {
    label: 'Blanc',
    swatchBg: '#f0eeea',
    swatchBorder: 'rgba(21,21,26,.2)',
    heroSrc: '/images/white/RIGHTBLANCFRONT.webp',
    espritSrc: '/images/white/FRONTLEFTBLANC.webp',
    views: [
      { src: '/images/white/FRONTLEFTBLANC.webp',  cap: 'Trois-quarts avant gauche' },
      { src: '/images/white/FULLLEFTBLANC.webp',   cap: 'Profil gauche' },
      { src: '/images/white/LEFTBACKBLANC.webp',   cap: 'Trois-quarts arrière gauche' },
      { src: '/images/white/BACKFULLBLANC.webp',   cap: 'Face arrière' },
      { src: '/images/white/BACKRIGHTBLANC.webp',  cap: 'Trois-quarts arrière droit' },
      { src: '/images/white/RIGHTFULLBLANC.webp',  cap: 'Profil droit' },
      { src: '/images/white/RIGHTBLANCFRONT.webp', cap: 'Trois-quarts avant droit' },
      { src: '/images/white/FULLFRONTBLANC.webp',  cap: 'Face avant' },
    ],
  },

  noir: {
    label: 'Noir',
    swatchBg: '#1c1c21',
    heroSrc: '/images/black/FRONTRIGHTBLACK.webp',
    espritSrc: '/images/black/LEFTSIDEFRONTBLACK.webp',
    views: [
      { src: '/images/black/LEFTSIDEFRONTBLACK.webp', cap: 'Trois-quarts avant gauche' },
      { src: '/images/black/FULLLEFTBLACK.webp',      cap: 'Profil gauche' },
      { src: '/images/black/LEFTBACKBLACK.webp',      cap: 'Trois-quarts arrière gauche' },
      { src: '/images/black/BACKSIDEBLACK.webp',      cap: 'Face arrière' },
      { src: '/images/black/RIGHTBACKBLACK.webp',     cap: 'Trois-quarts arrière droit' },
      { src: '/images/black/FULLRIGHTBLACK.webp',     cap: 'Profil droit' },
      { src: '/images/black/FRONTRIGHTBLACK.webp',    cap: 'Trois-quarts avant droit' },
      { src: '/images/black/FRONTBLACK.webp',         cap: 'Face avant' },
    ],
  },

  bleu: {
    label: 'Bleu',
    swatchBg: '#1a3360',
    heroSrc: '/images/blue/RIGHTFRONTBLUE.webp',
    espritSrc: '/images/blue/FRONTSIDEBLUE.webp',
    views: [
      { src: '/images/blue/FRONT.webp',          cap: 'Face avant' },
      { src: '/images/blue/FRONTSIDEBLUE.webp',  cap: 'Trois-quarts avant gauche' },
      { src: '/images/blue/FULLLEFTSIDE.webp',   cap: 'Profil gauche' },
      { src: '/images/blue/LEFT.webp',           cap: 'Vue latérale gauche' },
      { src: '/images/blue/BACKLEFTSIDE.webp',   cap: 'Trois-quarts arrière gauche' },
      { src: '/images/blue/FULLBACKBLUE.webp',   cap: 'Face arrière' },
      { src: '/images/blue/BACKRIGHTBLUE.webp',  cap: 'Trois-quarts arrière droit' },
      { src: '/images/blue/RIGHTFRONTBLUE.webp', cap: 'Trois-quarts avant droit' },
    ],
  },
};

export const COLOR_KEYS: ColorKey[] = ['blanc', 'noir', 'bleu'];
