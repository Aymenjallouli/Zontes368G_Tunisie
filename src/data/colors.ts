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
    heroSrc: '/images/white/RIGHTBLANCFRONT.png',
    espritSrc: '/images/white/FRONTLEFTBLANC.png',
    views: [
      { src: '/images/white/FRONTLEFTBLANC.png',  cap: 'Trois-quarts avant gauche' },
      { src: '/images/white/FULLLEFTBLANC.png',   cap: 'Profil gauche' },
      { src: '/images/white/LEFTBACKBLANC.png',   cap: 'Trois-quarts arrière gauche' },
      { src: '/images/white/BACKFULLBLANC.png',   cap: 'Face arrière' },
      { src: '/images/white/BACKRIGHTBLANC.png',  cap: 'Trois-quarts arrière droit' },
      { src: '/images/white/RIGHTFULLBLANC.png',  cap: 'Profil droit' },
      { src: '/images/white/RIGHTBLANCFRONT.png', cap: 'Trois-quarts avant droit' },
      { src: '/images/white/FULLFRONTBLANC.png',  cap: 'Face avant' },
    ],
  },

  noir: {
    label: 'Noir',
    swatchBg: '#1c1c21',
    heroSrc: '/images/black/FRONTRIGHTBLACK.png',
    espritSrc: '/images/black/LEFTSIDEFRONTBLACK.png',
    views: [
      { src: '/images/black/LEFTSIDEFRONTBLACK.png', cap: 'Trois-quarts avant gauche' },
      { src: '/images/black/FULLLEFTBLACK.png',      cap: 'Profil gauche' },
      { src: '/images/black/LEFTBACKBLACK.png',      cap: 'Trois-quarts arrière gauche' },
      { src: '/images/black/BACKSIDEBLACK.png',      cap: 'Face arrière' },
      { src: '/images/black/RIGHTBACKBLACK.png',     cap: 'Trois-quarts arrière droit' },
      { src: '/images/black/FULLRIGHTBLACK.png',     cap: 'Profil droit' },
      { src: '/images/black/FRONTRIGHTBLACK.png',    cap: 'Trois-quarts avant droit' },
      { src: '/images/black/FRONTBLACK.png',         cap: 'Face avant' },
    ],
  },

  bleu: {
    label: 'Bleu',
    swatchBg: '#1a3360',
    heroSrc: '/images/blue/RIGHTFRONTBLUE.png',
    espritSrc: '/images/blue/FRONTSIDEBLUE.png',
    views: [
      { src: '/images/blue/FRONT.png',          cap: 'Face avant' },
      { src: '/images/blue/FRONTSIDEBLUE.png',  cap: 'Trois-quarts avant gauche' },
      { src: '/images/blue/FULLLEFTSIDE.png',   cap: 'Profil gauche' },
      { src: '/images/blue/LEFT.png',           cap: 'Vue latérale gauche' },
      { src: '/images/blue/BACKLEFTSIDE.png',   cap: 'Trois-quarts arrière gauche' },
      { src: '/images/blue/FULLBACKBLUE.png',   cap: 'Face arrière' },
      { src: '/images/blue/BACKRIGHTBLUE.png',  cap: 'Trois-quarts arrière droit' },
      { src: '/images/blue/RIGHTFRONTBLUE.png', cap: 'Trois-quarts avant droit' },
    ],
  },
};

export const COLOR_KEYS: ColorKey[] = ['blanc', 'noir', 'bleu'];
