import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, Category, Product } from '../lib/api';
import Nav from '../components/Nav';
import styles from './Shop.module.css';

export default function Shop() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getCategories(), api.getProducts()]).then(([cats, prods]) => {
      setCategories(cats);
      setProducts(prods);
      setLoading(false);
    });
  }, []);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category_id === activeCategory);

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <div className="wrap">
          <header className={styles.header}>
            <div className="eyebrow">Zontes 368 G</div>
            <h1 className={styles.title}>Pièces &amp; Accessoires</h1>
            <p className={styles.subtitle}>
              Catalogue officiel de pièces et accessoires d'origine pour votre Zontes 368 G en Tunisie.
            </p>
          </header>
        </div>

        {/* Filtres sticky */}
        <div className={styles.filtersWrap}>
          <div className="wrap">
            <div className={styles.filters}>
              <button
                className={[styles.filter, activeCategory === 'all' ? styles.filterActive : ''].join(' ')}
                onClick={() => setActiveCategory('all')}
              >
                Tous
              </button>
              {categories.map(c => (
                <button
                  key={c.id}
                  className={[styles.filter, activeCategory === c.id ? styles.filterActive : ''].join(' ')}
                  onClick={() => setActiveCategory(c.id)}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="wrap">
          {loading ? (
            <div className={styles.loading}>
              <span className={styles.spinner} />
              Chargement...
            </div>
          ) : filtered.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🔧</div>
              <p>Aucun produit disponible pour le moment.</p>
              <p className={styles.emptySub}>Revenez bientôt — notre catalogue s'enrichit régulièrement.</p>
            </div>
          ) : (
            <>
              <p className={styles.count}>{filtered.length} produit{filtered.length > 1 ? 's' : ''}</p>
              <div className={styles.list}>
                {filtered.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

function ProductCard({ product }: { product: Product }) {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <Link to={`/pieces/${product.id}`} className={styles.card}>
      <div className={styles.imgWrap}>
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className={styles.img} loading="lazy" />
        ) : (
          <div className={styles.noImg}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
        <span className={product.available ? styles.badgeOk : styles.badgeNo}>
          {product.available ? 'En stock' : 'Commande'}
        </span>
      </div>

      <div className={styles.body}>
        {product.categories && (
          <span className={styles.cat}>{product.categories.name}</span>
        )}
        <h3 className={styles.name}>{product.name}</h3>
        {product.description && (
          <p className={styles.desc}>{product.description}</p>
        )}
        <div className={styles.footer}>
          <span className={styles.price}>
            {Number(product.price).toLocaleString('fr-TN', { minimumFractionDigits: 3 })} TND
          </span>
          {!product.available && product.arrival_date && (
            <span className={styles.arrival}>
              Arrivage<br />{formatDate(product.arrival_date)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
