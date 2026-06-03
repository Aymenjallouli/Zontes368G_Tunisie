import { Router } from 'express';
import { pool } from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM categories ORDER BY name');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post('/', requireAuth, async (req: AuthRequest, res) => {
  const { name, slug } = req.body;
  if (!name || !slug) { res.status(400).json({ error: 'Nom et slug requis' }); return; }
  try {
    const { rows } = await pool.query(
      'INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING *',
      [name.trim(), slug.trim()]
    );
    res.status(201).json(rows[0]);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : '';
    res.status(msg.includes('unique') ? 409 : 500).json({ error: msg.includes('unique') ? 'Ce slug existe déjà' : 'Erreur serveur' });
  }
});

router.put('/:id', requireAuth, async (req: AuthRequest, res) => {
  const { name, slug } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE categories SET name=$1, slug=$2 WHERE id=$3 RETURNING *',
      [name.trim(), slug.trim(), req.params.id]
    );
    if (!rows[0]) { res.status(404).json({ error: 'Catégorie introuvable' }); return; }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.delete('/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    await pool.query('DELETE FROM categories WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
