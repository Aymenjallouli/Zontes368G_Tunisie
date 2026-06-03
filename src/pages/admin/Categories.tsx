import { useEffect, useState, FormEvent } from 'react';
import { api, Category } from '../../lib/api';
import AdminLayout from './AdminLayout';
import styles from './Categories.module.css';

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const toSlug = (s: string) =>
    s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const load = () => api.getCategories().then(data => { setCategories(data); setLoading(false); });

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setName(''); setModalOpen(true); };
  const openEdit = (c: Category) => { setEditing(c); setName(c.name); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditing(null); setName(''); };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { name: name.trim(), slug: toSlug(name.trim()) };
    try {
      if (editing) await api.updateCategory(editing.id, payload);
      else await api.createCategory(payload);
      closeModal();
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur');
    }
    setSaving(false);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await api.deleteCategory(deleteId);
    setDeleteId(null);
    load();
  };

  return (
    <AdminLayout>
      <div className={styles.page}>
        <div className={styles.pageHead}>
          <h1 className={styles.heading}>Catégories</h1>
          <button className={styles.addBtn} onClick={openAdd}>+ Ajouter une catégorie</button>
        </div>

        {loading ? (
          <div className={styles.loading}>Chargement...</div>
        ) : categories.length === 0 ? (
          <div className={styles.empty}>Aucune catégorie. Créez-en une pour organiser vos produits.</div>
        ) : (
          <div className={styles.list}>
            {categories.map(cat => (
              <div key={cat.id} className={styles.row}>
                <div>
                  <div className={styles.catName}>{cat.name}</div>
                  <div className={styles.catSlug}>{cat.slug}</div>
                </div>
                <div className={styles.actions}>
                  <button className={styles.editBtn} onClick={() => openEdit(cat)}>Modifier</button>
                  <button className={styles.delBtn} onClick={() => setDeleteId(cat.id)}>Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <div className={styles.overlay} onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className={styles.modal}>
            <div className={styles.modalHead}>
              <h2 className={styles.modalTitle}>{editing ? 'Modifier la catégorie' : 'Nouvelle catégorie'}</h2>
              <button className={styles.closeBtn} onClick={closeModal}>✕</button>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label className={styles.label}>Nom de la catégorie *</label>
                <input
                  className={styles.input}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Ex: Carénage, Échappement..."
                />
                {name && <span className={styles.slugPreview}>Slug : {toSlug(name)}</span>}
              </div>
              <div className={styles.modalFoot}>
                <button type="button" className={styles.cancelBtn} onClick={closeModal}>Annuler</button>
                <button type="submit" className={styles.submitBtn} disabled={saving}>
                  {saving ? 'Enregistrement...' : editing ? 'Enregistrer' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className={styles.overlay}>
          <div className={styles.confirmBox}>
            <p className={styles.confirmText}>Supprimer cette catégorie ?<br /><small>Les produits associés ne seront pas supprimés.</small></p>
            <div className={styles.confirmActions}>
              <button className={styles.cancelBtn} onClick={() => setDeleteId(null)}>Annuler</button>
              <button className={styles.deleteConfirm} onClick={confirmDelete}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
