import { Router } from 'express';
import { pool } from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT p.*,
             c.id   AS cat_id,
             c.name AS cat_name,
             c.slug AS cat_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `);
    const products = rows.map(r => ({
      ...r,
      categories: r.cat_id ? { id: r.cat_id, name: r.cat_name, slug: r.cat_slug } : null,
    }));
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post('/', requireAuth, async (req: AuthRequest, res) => {
  const { name, description, price, category_id, image_url, available, arrival_date } = req.body;
  if (!name) { res.status(400).json({ error: 'Nom requis' }); return; }
  try {
    const { rows } = await pool.query(
      `INSERT INTO products (name, description, price, category_id, image_url, available, arrival_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, description ?? '', price ?? 0, category_id ?? null, image_url ?? '', available ?? true, arrival_date ?? null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.put('/:id', requireAuth, async (req: AuthRequest, res) => {
  const { name, description, price, category_id, image_url, available, arrival_date } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE products
       SET name=$1, description=$2, price=$3, category_id=$4, image_url=$5, available=$6, arrival_date=$7, updated_at=NOW()
       WHERE id=$8 RETURNING *`,
      [name, description ?? '', price ?? 0, category_id ?? null, image_url ?? '', available ?? true, arrival_date ?? null, req.params.id]
    );
    if (!rows[0]) { res.status(404).json({ error: 'Produit introuvable' }); return; }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.delete('/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    await pool.query('DELETE FROM products WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
