import { Router } from 'express';
import { pool } from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT key, value FROM site_config');
    const config = Object.fromEntries(rows.map((r: { key: string; value: string }) => [r.key, r.value]));
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.put('/', requireAuth, async (req: AuthRequest, res) => {
  const entries = Object.entries(req.body) as [string, string][];
  try {
    for (const [key, value] of entries) {
      await pool.query(
        `INSERT INTO site_config (key, value, updated_at) VALUES ($1, $2, NOW())
         ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()`,
        [key, String(value)]
      );
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
