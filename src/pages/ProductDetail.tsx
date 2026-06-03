import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, Product } from '../lib/api';
import Nav from '../components/Nav';
import styles from './ProductDetail.module.css';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api.getProducts().then(products => {
      const found = products.find(p => p.id === id);
      if (found) setProduct(found);
      else setNotFound(true);
      setLoading(false);
    });
  }, [id]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  if (loading) {
    return (
      <>
        <Nav />
        <div className={styles.loadingPage}>
          <span className={styles.spinner} />
        </div>
      </>
    );
  }

  if (notFound || !product) {
    return (
      <>
        <Nav />
        <div className={styles.notFound}>
          <p>Produit introuvable.</p>
          <Link to="/pieces" className={`btn gold`}>← Retour au catalogue</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <div className="wrap">

          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Fil d'ariane">
            <Link to="/pieces">Pièces &amp; Accessoires</Link>
            <span>/</span>
            <span>{product.name}</span>
          </nav>

          <div className={styles.layout}>

            {/* Image */}
            <div className={styles.imageCol}>
              {product.image_url ? (
                <div className={styles.imgWrap}>
                  <img src={product.image_url} alt={product.name} className={styles.img} />
                </div>
              ) : (
                <div className={styles.noImg}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span>Pas d'image disponible</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className={styles.infoCol}>
              {product.categories && (
                <Link to={`/pieces`} className={styles.catLink}>
                  {product.categories.name}
                </Link>
              )}

              <h1 className={styles.name}>{product.name}</h1>

              <div className={product.available ? styles.statusOk : styles.statusNo}>
                <span className={styles.dot} />
                {product.available
                  ? 'En stock — disponible immédiatement'
                  : product.arrival_date
                    ? `Sur commande — arrivage prévu le ${formatDate(product.arrival_date)}`
                    : 'Sur commande'}
              </div>

              <div className={styles.price}>
                {Number(product.price).toLocaleString('fr-TN', { minimumFractionDigits: 3 })}
                <span className={styles.cur}>TND</span>
              </div>

              {product.description && (
                <div className={styles.descSection}>
                  <h2 className={styles.descTitle}>Description</h2>
                  <p className={styles.desc}>{product.description}</p>
                </div>
              )}

              <div className={styles.actions}>
                <a href="/#prix" className="btn gold">Demander un devis</a>
                <Link to="/pieces" className="btn ghost">← Retour catalogue</Link>
              </div>

              <div className={styles.meta}>
                <div className={styles.metaRow}>
                  <span className={styles.metaKey}>Référence</span>
                  <span className={styles.metaVal}>{product.id.slice(0, 8).toUpperCase()}</span>
                </div>
                {product.categories && (
                  <div className={styles.metaRow}>
                    <span className={styles.metaKey}>Catégorie</span>
                    <span className={styles.metaVal}>{product.categories.name}</span>
                  </div>
                )}
                <div className={styles.metaRow}>
                  <span className={styles.metaKey}>Compatibilité</span>
                  <span className={styles.metaVal}>Zontes 368 G</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
