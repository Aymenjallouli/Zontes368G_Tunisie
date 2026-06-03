import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Nav.module.css';

const HOME_LINKS = [
  { href: '#apercu',      label: 'Aperçu' },
  { href: '#esprit',      label: "L'esprit SUV" },
  { href: '#galerie',     label: 'Galerie' },
  { href: '#fiche',       label: 'Fiche technique' },
  { href: '#equipements', label: 'Équipements' },
  { href: '#prix',        label: 'Prix' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('');
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isShop = location.pathname === '/pieces';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = HOME_LINKS.map(l => document.querySelector(l.href)).filter(Boolean) as Element[];
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveHref('#' + e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, [isHome]);

  const closeMenu = () => setMenuOpen(false);

  /* CTA href : scrolls on home, navigates from other pages */
  const ctaHref = isHome ? '#prix' : '/#prix';

  return (
    <>
      <nav
        className={[styles.nav, scrolled ? styles.scrolled : ''].join(' ')}
        aria-label="Navigation principale"
      >
        <div className="wrap">
          <Link to="/" className={styles.brand}>
            <span className={styles.mark}>Zontes</span>
            <span className={styles.sub}>368 G</span>
          </Link>

          <div className={styles.links} role="list">
            {/* Sur la page pièces : lien retour moto */}
            {isShop && (
              <Link to="/" role="listitem" className={styles.link}>
                ← Moto 368 G
              </Link>
            )}

            {/* Liens de section (homepage uniquement) */}
            {isHome && HOME_LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                role="listitem"
                className={[styles.link, activeHref === l.href ? styles.active : ''].join(' ')}
              >
                {l.label}
              </a>
            ))}

            {/* Lien Pièces & Accessoires — toujours visible */}
            <Link
              to="/pieces"
              role="listitem"
              className={[styles.link, styles.piecesLink, isShop ? styles.active : ''].join(' ')}
            >
              Pièces &amp; Accessoires
            </Link>
          </div>

          <a href={ctaHref} className={`btn gold ${styles.cta}`}>
            Demander un devis
          </a>

          <button
            className={[styles.hamburger, menuOpen ? styles.open : ''].join(' ')}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Drawer mobile */}
      <div
        className={[styles.drawer, menuOpen ? styles.drawerOpen : ''].join(' ')}
        aria-hidden={!menuOpen}
      >
        {isShop && (
          <Link to="/" className={styles.drawerLink} onClick={closeMenu}>
            ← Moto 368 G
          </Link>
        )}

        {isHome && HOME_LINKS.map(l => (
          <a key={l.href} href={l.href} className={styles.drawerLink} onClick={closeMenu}>
            {l.label}
          </a>
        ))}

        <Link
          to="/pieces"
          className={[styles.drawerLink, isShop ? styles.drawerLinkActive : ''].join(' ')}
          onClick={closeMenu}
        >
          Pièces &amp; Accessoires
        </Link>

        <a href={ctaHref} className={`btn gold ${styles.drawerCta}`} onClick={closeMenu}>
          Demander un devis
        </a>
      </div>
    </>
  );
}
