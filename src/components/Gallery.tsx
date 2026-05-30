import { useState, useEffect, useRef } from 'react';
import { COLOR_DATA, COLOR_KEYS, ColorKey } from '../data/colors';
import Reveal from './Reveal';
import styles from './Gallery.module.css';

interface Props {
  activeColor: ColorKey;
  onColorChange: (c: ColorKey) => void;
}

const DOT_BG: Record<ColorKey, string> = {
  blanc: '#f0eeea',
  noir:  '#3a3a42',
  bleu:  '#1a3360',
};

export default function Gallery({ activeColor, onColorChange }: Props) {
  const [gi, setGi] = useState(0);
  const [fading, setFading] = useState(false);
  const [displaySrc, setDisplaySrc] = useState(COLOR_DATA[activeColor].views[0].src);
  const [displayCap, setDisplayCap] = useState(COLOR_DATA[activeColor].views[0].cap);
  const stageImgRef = useRef<HTMLImageElement>(null);

  const views = COLOR_DATA[activeColor].views;

  function go(nextIndex: number, color?: ColorKey) {
    const targetViews = color ? COLOR_DATA[color].views : views;
    const safeIndex = ((nextIndex % targetViews.length) + targetViews.length) % targetViews.length;
    setFading(true);
    setTimeout(() => {
      setDisplaySrc(targetViews[safeIndex].src);
      setDisplayCap(targetViews[safeIndex].cap);
      setGi(safeIndex);
      setFading(false);
    }, 180);
  }

  /* reset to 0 when color changes */
  useEffect(() => { go(0, activeColor); }, [activeColor]);

  return (
    <section className={`section dark on-dark ${styles.section}`} id="galerie">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Galerie 360°</div>
          <h2>Sous tous les angles.</h2>
        </Reveal>

        <Reveal>
          {/* color tabs */}
          <div className={styles.tabs} role="tablist" aria-label="Coloris">
            {COLOR_KEYS.map(c => (
              <button
                key={c}
                role="tab"
                aria-selected={activeColor === c}
                className={[styles.tab, activeColor === c ? styles.tabActive : ''].join(' ')}
                onClick={() => onColorChange(c)}
              >
                <span
                  className={styles.dot}
                  style={{ background: DOT_BG[c], border: c === 'blanc' ? '1px solid rgba(255,255,255,.3)' : 'none' }}
                />
                {COLOR_DATA[c].label}
              </button>
            ))}
          </div>

          {/* stage */}
          <div className={styles.stage}>
            <button
              className={`${styles.arrow} ${styles.prev}`}
              aria-label="Précédent"
              onClick={() => go(gi - 1)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>

            <img
              ref={stageImgRef}
              src={displaySrc}
              alt={`Zontes 368 G — ${displayCap}`}
              className={fading ? styles.imgFade : ''}
            />

            <button
              className={`${styles.arrow} ${styles.next}`}
              aria-label="Suivant"
              onClick={() => go(gi + 1)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className={styles.caption}>{displayCap}</div>
            <div className={styles.count}>
              <b>{String(gi + 1).padStart(2, '0')}</b> / {String(views.length).padStart(2, '0')}
            </div>
          </div>

          {/* thumbnails */}
          <div className={styles.thumbs}>
            {views.map((v, i) => (
              <button
                key={i}
                className={[styles.thumb, gi === i ? styles.thumbActive : ''].join(' ')}
                aria-label={v.cap}
                onClick={() => go(i)}
              >
                <img src={v.src} alt={v.cap} loading="lazy" />
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
