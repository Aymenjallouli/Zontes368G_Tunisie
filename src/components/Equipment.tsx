import Reveal from './Reveal';
import styles from './Equipment.module.css';

const ITEMS = [
  {
    title: 'Clé mains libres',
    desc: 'Démarrage et accès sans contact, sécurité intégrée.',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="8" cy="9" r="4" />
        <path d="M11 11l9 9M16 16l2-2M18 18l2-2" />
      </svg>
    ),
  },
  {
    title: 'Éclairage Full-LED',
    desc: 'Phares, feux et clignotants 100 % LED.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M5 14a7 7 0 1 1 14 0v1H5v-1z" />
        <path d="M9 19h6M10 22h4" />
      </svg>
    ),
  },
  {
    title: 'TFT couleur 8"',
    desc: 'Tableau de bord numérique haute lisibilité.',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="13" rx="1.5" />
        <path d="M9 21h6M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'Bulle réglable',
    desc: 'Protection ajustable sur 5 positions.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 16c4-10 12-10 16 0" />
        <path d="M7 16l-2 4M17 16l2 4" />
      </svg>
    ),
  },
  {
    title: 'Poignées chauffantes',
    desc: 'Confort par tous les temps.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M5 12h14M7 9c0-2 2-2 2 0M11 9c0-2 2-2 2 0M15 9c0-2 2-2 2 0" />
        <path d="M5 12v3a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-3" />
      </svg>
    ),
  },
  {
    title: 'Pack protection',
    desc: 'Crash bars, sabot moteur, protège-mains.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 3l7 3v6c0 5-3 7-7 9-4-2-7-4-7-9V6l7-3z" />
      </svg>
    ),
  },
  {
    title: 'Coffre 2 casques',
    desc: "Volume d'emport généreux et verrouillé.",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="5" y="8" width="14" height="11" rx="1.5" />
        <path d="M8 8V6a4 4 0 0 1 8 0v2" />
      </svg>
    ),
  },
  {
    title: 'USB A & C',
    desc: 'Recharge double standard à bord.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M9 4v7M15 4v7M7 11h10v3a5 5 0 0 1-10 0v-3zM12 19v2" />
      </svg>
    ),
  },
];

export default function Equipment() {
  return (
    <section className="section" id="equipements">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">De série</div>
          <h2>Équipé pour tout.</h2>
        </Reveal>
        <Reveal className={styles.grid}>
          {ITEMS.map(item => (
            <div key={item.title} className={styles.cell}>
              {item.icon}
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
