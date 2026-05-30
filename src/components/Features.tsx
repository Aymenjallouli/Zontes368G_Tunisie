import { FEATURES } from '../data/features';
import Reveal from './Reveal';
import styles from './Features.module.css';

export default function Features() {
  return (
    <section className="section" id="design">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Conçu dans le détail</div>
          <h2>Une ingénierie<br />qui se regarde.</h2>
          <p className="muted">
            Chaque surface a une fonction. Du regard Full-LED à la selle ergonomique, le 368 G assume une présence de premier rang.
          </p>
        </Reveal>

        <div className={styles.list}>
          {FEATURES.map(f => (
            <Reveal key={f.index} className={[styles.feature, f.flip ? styles.flip : ''].join(' ')}>
              <div className={styles.media}>
                <span className={styles.index} aria-hidden="true">{f.index}</span>
                <img src={f.imgSrc} alt={f.imgAlt} />
              </div>
              <div className={styles.body}>
                <div className="eyebrow">{f.eyebrow}</div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
                <div className={styles.fspec}>
                  {f.stats.map((s, i) => (
                    <div key={i}>
                      <div className={styles.sv}>
                        {s.value}
                        {s.unit && <span className={styles.unit}>{s.unit}</span>}
                      </div>
                      <div className={styles.sk}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
