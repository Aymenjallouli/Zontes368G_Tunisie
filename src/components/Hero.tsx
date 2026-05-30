import { useState, useEffect } from 'react';
import { COLOR_DATA, COLOR_KEYS, ColorKey } from '../data/colors';
import styles from './Hero.module.css';
import Reveal from './Reveal';
import SoundButton from './SoundButton';

const STATS = [
  { v: '367', unit: 'cc', k: 'Cylindrée' },
  { v: '38',  unit: 'cv', k: 'Puissance' },
  { v: '40',  unit: 'Nm', k: 'Couple' },
  { v: '180', unit: 'mm', k: 'Garde au sol' },
  { v: '203', unit: 'kg', k: 'Poids' },
];

interface Props {
  activeColor: ColorKey;
  onColorChange: (c: ColorKey) => void;
}

export default function Hero({ activeColor, onColorChange }: Props) {
  const [imgSrc, setImgSrc] = useState(COLOR_DATA[activeColor].heroSrc);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    setFading(true);
    const t = setTimeout(() => {
      setImgSrc(COLOR_DATA[activeColor].heroSrc);
      setFading(false);
    }, 200);
    return () => clearTimeout(t);
  }, [activeColor]);

  return (
    <header className={styles.hero} id="apercu">
      <div className={styles.watermark} aria-hidden="true">368</div>

      <div className={styles.body}>
        <div className="wrap">
          <Reveal className={styles.copy}>
            <div className="eyebrow">Scooter SUV d'aventure · 368 cc</div>
            <h1>368<span className={styles.g}> G</span></h1>
            <div className={styles.tag}>
              L'esprit <em className={styles.em}>SUV.</em>
            </div>
            <p className={styles.lede}>
              Lignes dynamiques, cadre robuste, finitions soignées. Un scooter d'aventure taillé pour passer de la ville aux chemins sans compromis — disponible en blanc, noir et bleu.
            </p>

            <div className={styles.colorSwitcher} role="group" aria-label="Choisir un coloris">
              <span className={styles.colorLabel}>Coloris</span>
              <div className={styles.swatches}>
                {COLOR_KEYS.map(c => (
                  <button
                    key={c}
                    className={[styles.swatch, activeColor === c ? styles.swatchActive : ''].join(' ')}
                    style={{
                      background: COLOR_DATA[c].swatchBg,
                      borderColor: COLOR_DATA[c].swatchBorder ?? COLOR_DATA[c].swatchBg,
                    }}
                    aria-label={COLOR_DATA[c].label}
                    title={COLOR_DATA[c].label}
                    onClick={() => onColorChange(c)}
                  />
                ))}
              </div>
              <span className={styles.colorName}>{COLOR_DATA[activeColor].label}</span>
            </div>

            <div className={styles.cta}>
              <a href="#prix" className="btn gold">Voir le prix</a>
              <a href="#fiche" className="btn ghost">Fiche technique</a>
              <SoundButton />
            </div>
          </Reveal>

          <div className={styles.imgWrap}>
            <img
              src={imgSrc}
              alt={`Zontes 368 G ${COLOR_DATA[activeColor].label} — trois-quarts avant`}
              className={fading ? styles.imgFade : ''}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className="wrap">
          {STATS.map(s => (
            <div key={s.k} className={styles.stat}>
              <span className={styles.statV}>
                {s.v}<small>{s.unit}</small>
              </span>
              <span className={styles.statK}>{s.k}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.scrollcue} aria-hidden="true">
        Défiler<span />
      </div>
    </header>
  );
}
