import { useEffect, useRef, useState } from 'react';
import styles from './Nav.module.css';

const LINKS = [
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
  const navRef = useRef<HTMLElement>(null);

  /* scroll state */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* active link via IntersectionObserver */
  useEffect(() => {
    const sections = LINKS.map(l => document.querySelector(l.href)).filter(Boolean) as Element[];
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
  }, []);

  /* close menu on link click */
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        ref={navRef}
        className={[styles.nav, scrolled ? styles.scrolled : ''].join(' ')}
        aria-label="Navigation principale"
      >
        <div className="wrap">
          <div className={styles.brand}>
            <span className={styles.mark}>Zontes</span>
            <span className={styles.sub}>368 G</span>
          </div>

          <div className={styles.links} role="list">
            {LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                role="listitem"
                className={[styles.link, activeHref === l.href ? styles.active : ''].join(' ')}
              >
                {l.label}
              </a>
            ))}
          </div>

          <a href="#prix" className={`btn gold ${styles.cta}`}>
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

      <div
        className={[styles.drawer, menuOpen ? styles.drawerOpen : ''].join(' ')}
        aria-hidden={!menuOpen}
      >
        {LINKS.map(l => (
          <a key={l.href} href={l.href} className={styles.drawerLink} onClick={closeMenu}>
            {l.label}
          </a>
        ))}
        <a href="#prix" className={`btn gold ${styles.drawerCta}`} onClick={closeMenu}>
          Demander un devis
        </a>
      </div>
    </>
  );
}
