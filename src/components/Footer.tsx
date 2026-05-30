import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div>
          <div className={styles.mark}>Zontes</div>
          <p className={styles.legal}>
            368 G. Caractéristiques et illustrations non contractuelles, susceptibles d'évoluer sans préavis.
            Document destiné au réseau revendeurs &amp; distributeurs.
          </p>
        </div>
        <div className={styles.right}>
          <p>Fiche produit · Tunisie</p>
          <p>Prix public : <a href="#prix">29 000 TND TTC</a></p>
        </div>
      </div>
    </footer>
  );
}
