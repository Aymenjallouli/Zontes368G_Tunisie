import { useState, useEffect } from 'react';
import { COLOR_DATA, ColorKey } from '../data/colors';
import Reveal from './Reveal';
import styles from './Esprit.module.css';

interface Props { activeColor: ColorKey; }

export default function Esprit({ activeColor }: Props) {
  const [imgSrc, setImgSrc] = useState(COLOR_DATA[activeColor].espritSrc);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    setFading(true);
    const t = setTimeout(() => {
      setImgSrc(COLOR_DATA[activeColor].espritSrc);
      setFading(false);
    }, 200);
    return () => clearTimeout(t);
  }, [activeColor]);

  return (
    <section className={`section dark on-dark ${styles.section}`} id="esprit">
      <div className="wrap">
        <div className={styles.grid}>
          <Reveal className={styles.text}>
            <div className="eyebrow">L'esprit SUV</div>
            <p className={styles.lead}>
              Avec son design audacieux et unique, le <b>368 G</b> attire tous les regards.
              Polyvalent, innovant, taillé pour l'aventure.
            </p>
            <div className={styles.cols}>
              <p>Ses lignes dynamiques, son cadre robuste et ses finitions soignées en font un scooter SUV à la fois polyvalent et innovant, à l'aise sur tous les terrains.</p>
              <p>Équipé d'un moteur monocylindre de 368 cm³, il délivre des performances équilibrées pour affronter aussi bien la ville que les chemins.</p>
              <p>Sa puissance de 38 cv à 7 500 tr/min et son couple de 40 N·m à 6 000 tr/min garantissent des accélérations réactives, tandis que son rendement optimisé assure une consommation maîtrisée.</p>
              <p>Pensé pour le confort, sa suspension avant inversée et son amortisseur arrière à réservoir séparé absorbent efficacement les irrégularités du terrain.</p>
            </div>
          </Reveal>

          <Reveal delay={1} className={styles.fig}>
            <img
              src={imgSrc}
              alt={`Zontes 368 G ${COLOR_DATA[activeColor].label} — vue latérale`}
              className={fading ? styles.imgFade : ''}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
