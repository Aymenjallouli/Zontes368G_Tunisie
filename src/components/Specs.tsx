import { SPEC_BLOCKS } from '../data/specs';
import Reveal from './Reveal';
import styles from './Specs.module.css';

export default function Specs() {
  return (
    <section
      className={`section dark on-dark ${styles.section}`}
      id="fiche"
      style={{ background: 'var(--black-2)' }}
    >
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">Fiche technique</div>
          <h2>Caractéristiques.</h2>
          <p className="muted">Toutes les caractéristiques techniques détaillées du Zontes 368 G.</p>
        </Reveal>

        <div className={styles.grid}>
          {SPEC_BLOCKS.map((block, i) => (
            <Reveal key={block.index} delay={(i % 2 === 1 ? 1 : undefined) as 1 | undefined}>
              <div className={styles.block}>
                <h3>
                  {block.title} <i>/ {block.index}</i>
                </h3>
                {block.rows.map(row => (
                  <div key={row.k} className={styles.row}>
                    <span className={styles.k}>{row.k}</span>
                    <span className={styles.v}>
                      {row.bold ? <b>{row.bold}</b> : null}
                      {row.after}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
