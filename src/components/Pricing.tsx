import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Reveal from './Reveal';
import styles from './Pricing.module.css';

export default function Pricing() {
  const [motoAvailable, setMotoAvailable] = useState<boolean | null>(null);
  const [arrivalDate, setArrivalDate] = useState<string>('');

  useEffect(() => {
    api.getConfig().then(cfg => {
      setMotoAvailable(cfg.moto_available !== 'false');
      setArrivalDate(cfg.moto_arrival_date || '');
    }).catch(() => {});
  }, []);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <section className={`section on-dark ${styles.section}`} id="prix">
      <div className="wrap">
        <div className={styles.inner}>
          <Reveal className={styles.card}>
            <span className={styles.flag}>
              <span className={styles.tn} />
              Tarif Tunisie
            </span>
            <div className={styles.from}>Prix public TTC</div>
            <div className={styles.amount}>
              29 000<span className={styles.cur}>TND</span>
            </div>
            <span className={styles.ttc}>Toutes taxes comprises</span>

            {motoAvailable !== null && (
              <div className={motoAvailable ? styles.statusOk : styles.statusNo}>
                {motoAvailable ? (
                  <><DotIcon ok /> En stock — disponible immédiatement</>
                ) : arrivalDate ? (
                  <><DotIcon ok={false} /> Arrivage prévu le {formatDate(arrivalDate)}</>
                ) : (
                  <><DotIcon ok={false} /> Actuellement sur commande</>
                )}
              </div>
            )}

            <ul className={styles.incl}>
              <li><CheckIcon /> Tarif clé en main, hors options</li>
              <li><CheckIcon /> Garantie constructeur incluse</li>
              <li><CheckIcon /> Disponible en blanc, noir et bleu</li>
            </ul>
          </Reveal>

          <Reveal delay={1} className={styles.copy}>
            <div className="eyebrow">Réseau revendeurs</div>
            <h2>Prix &amp; disponibilité.</h2>
            <p>
              Pour toute demande de devis, configuration ou commande, contactez votre distributeur Zontes en Tunisie. Nos revendeurs agréés vous accompagnent à chaque étape.
            </p>
            <div className={styles.cta}>
              <a href="#" className="btn gold">Demander un devis</a>
              <a href="#" className="btn ghost">Devenir revendeur</a>
            </div>
            <div className={styles.dealer}>
              <div><div className={styles.dk}>Modèle</div><div className={styles.dv}>368 G</div></div>
              <div><div className={styles.dk}>Catégorie</div><div className={styles.dv}>Scooter SUV 368 cc</div></div>
              <div><div className={styles.dk}>Coloris</div><div className={styles.dv}>Blanc · Noir · Bleu</div></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12l5 5 9-11" />
    </svg>
  );
}

function DotIcon({ ok }: { ok: boolean }) {
  return (
    <span style={{
      display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
      background: ok ? '#6fcf97' : '#f2994a', flexShrink: 0, marginTop: 1,
    }} />
  );
}
