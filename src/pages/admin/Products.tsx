import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { api, Product, Category } from '../../lib/api';
import AdminLayout from './AdminLayout';
import styles from './Products.module.css';

const EMPTY_FORM = {
  name: '', description: '', price: '',
  category_id: '', image_url: '',
  available: true, arrival_date: '',
};
type FormData = typeof EMPTY_FORM;

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = () =>
    Promise.all([api.getProducts(), api.getCategories()]).then(([p, c]) => {
      setProducts(p); setCategories(c); setLoading(false);
    });

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name, description: p.description || '',
      price: String(p.price), category_id: p.category_id || '',
      image_url: p.image_url || '', available: p.available,
      arrival_date: p.arrival_date || '',
    });
    setModalOpen(true);
  };
  const closeModal = () => { setModalOpen(false); setEditing(null); };

  const handleField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await api.uploadImage(file);
      setForm(f => ({ ...f, image_url: url }));
    } catch (err) {
      alert(`Erreur upload : ${err instanceof Error ? err.message : 'Erreur'}`);
    }
    setUploading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name, description: form.description,
      price: parseFloat(form.price) || 0,
      category_id: form.category_id || null,
      image_url: form.image_url,
      available: form.available,
      arrival_date: !form.available && form.arrival_date ? form.arrival_date : null,
    };
    try {
      if (editing) await api.updateProduct(editing.id, payload);
      else await api.createProduct(payload);
      closeModal();
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur');
    }
    setSaving(false);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await api.deleteProduct(deleteId);
    setDeleteId(null);
    load();
  };

  return (
    <AdminLayout>
      <div className={styles.page}>
        <div className={styles.pageHead}>
          <h1 className={styles.heading}>Produits</h1>
          <button className={styles.addBtn} onClick={openAdd}>+ Ajouter un produit</button>
        </div>

        {loading ? (
          <div className={styles.loading}>Chargement...</div>
        ) : products.length === 0 ? (
          <div className={styles.empty}>Aucun produit. Cliquez sur « Ajouter un produit » pour commencer.</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Image</th><th>Nom</th><th>Catégorie</th><th>Prix (TND)</th><th>Statut</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td>{p.image_url ? <img src={p.image_url} alt={p.name} className={styles.thumb} /> : <div className={styles.noThumb} />}</td>
                    <td className={styles.tdName}>{p.name}</td>
                    <td className={styles.tdMuted}>{p.categories?.name || '—'}</td>
                    <td className={styles.tdMuted}>{Number(p.price).toFixed(3)}</td>
                    <td><span className={p.available ? styles.badgeOk : styles.badgeNo}>{p.available ? 'En stock' : 'Sur commande'}</span></td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.editBtn} onClick={() => openEdit(p)}>Modifier</button>
                        <button className={styles.delBtn} onClick={() => setDeleteId(p.id)}>Supprimer</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className={styles.overlay} onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className={styles.modal}>
            <div className={styles.modalHead}>
              <h2 className={styles.modalTitle}>{editing ? 'Modifier le produit' : 'Nouveau produit'}</h2>
              <button className={styles.closeBtn} onClick={closeModal}>✕</button>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>Nom *</label>
                  <input name="name" className={styles.input} value={form.name} onChange={handleField} required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Catégorie</label>
                  <select name="category_id" className={styles.select} value={form.category_id} onChange={handleField}>
                    <option value="">— Aucune —</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Prix (TND) *</label>
                  <input name="price" type="number" step="0.001" min="0" className={styles.input} value={form.price} onChange={handleField} required />
                </div>
                <div className={[styles.field, styles.fieldFull].join(' ')}>
                  <label className={styles.label}>Description</label>
                  <textarea name="description" className={styles.textarea} rows={3} value={form.description} onChange={handleField} />
                </div>
                <div className={[styles.field, styles.fieldFull].join(' ')}>
                  <label className={styles.label}>Image</label>
                  <input name="image_url" className={styles.input} value={form.image_url} onChange={handleField} placeholder="URL ou télécharger ci-dessous" />
                  <div className={styles.uploadRow}>
                    <label className={styles.uploadBtn}>
                      {uploading ? 'Téléchargement...' : '📁 Télécharger une image'}
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} disabled={uploading} />
                    </label>
                    {form.image_url && <img src={form.image_url} alt="aperçu" className={styles.preview} />}
                  </div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Disponibilité</label>
                  <div className={styles.toggleRow}>
                    <button type="button"
                      className={[styles.toggle, form.available ? styles.toggleOn : styles.toggleOff].join(' ')}
                      onClick={() => setForm(f => ({ ...f, available: !f.available }))}>
                      <span className={styles.toggleThumb} />
                    </button>
                    <span className={styles.toggleLabel}>{form.available ? 'En stock' : 'Sur commande'}</span>
                  </div>
                </div>
                {!form.available && (
                  <div className={styles.field}>
                    <label className={styles.label}>Date d'arrivage approximative</label>
                    <input name="arrival_date" type="date" className={styles.input} value={form.arrival_date} onChange={handleField} />
                  </div>
                )}
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
            <p className={styles.confirmText}>Supprimer ce produit définitivement ?</p>
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
