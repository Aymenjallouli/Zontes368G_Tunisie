import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import AdminLayout from './AdminLayout';
import styles from './Dashboard.module.css';

interface Stats { totalProducts: number; totalCategories: number; availableProducts: number; }

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({ totalProducts: 0, totalCategories: 0, availableProducts: 0 });
  const [motoAvailable, setMotoAvailable] = useState(true);
  const [arrivalDate, setArrivalDate] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([api.getProducts(), api.getCategories(), api.getConfig()]).then(([prods, cats, cfg]) => {
      setStats({
        totalProducts: prods.length,
        totalCategories: cats.length,
        availableProducts: prods.filter(p => p.available).length,
      });
      setMotoAvailable(cfg.moto_available !== 'false');
      setArrivalDate(cfg.moto_arrival_date || '');
    });
  }, []);

  const saveMotoStatus = async () => {
    setSaving(true);
    await api.updateConfig({ moto_available: String(motoAvailable), moto_arrival_date: arrivalDate });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout>
      <div className={styles.page}>
        <h1 className={styles.heading}>Tableau de bord</h1>

        <div className={styles.statsGrid}>
          <StatCard label="Produits" value={stats.totalProducts} icon="📦" />
          <StatCard label="Catégories" value={stats.totalCategories} icon="🗂️" />
          <StatCard label="En stock" value={stats.availableProducts} icon="✅" />
        </div>

        <div className={styles.motoCard}>
          <div className={styles.motoHeader}>
            <div>
              <h2 className={styles.motoTitle}>Zontes 368 G — Disponibilité</h2>
              <p className={styles.motoSub}>Ce statut s'affiche sur la page principale dans la section Prix.</p>
            </div>
          </div>

          <div className={styles.motoBody}>
            <div className={styles.toggleRow}>
              <span className={styles.toggleLabel}>
                {motoAvailable ? 'En stock — disponible immédiatement' : 'Non disponible — sur commande'}
              </span>
              <button
                className={[styles.toggle, motoAvailable ? styles.toggleOn : styles.toggleOff].join(' ')}
                onClick={() => setMotoAvailable(v => !v)}
                role="switch"
                aria-checked={motoAvailable}
              >
                <span className={styles.toggleThumb} />
              </button>
            </div>

            {!motoAvailable && (
              <div className={styles.dateRow}>
                <label className={styles.dateLabel}>Date d'arrivage approximative</label>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={arrivalDate}
                  onChange={e => setArrivalDate(e.target.value)}
                />
              </div>
            )}

            <button className={styles.saveBtn} onClick={saveMotoStatus} disabled={saving}>
              {saving ? 'Enregistrement...' : saved ? '✓ Enregistré' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className={styles.statCard}>
      <span className={styles.statIcon}>{icon}</span>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}
