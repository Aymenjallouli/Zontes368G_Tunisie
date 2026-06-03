import { Router } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { requireAuth, AuthRequest } from '../middleware/auth';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Seules les images sont acceptées'));
  },
});

const router = Router();

router.post('/', requireAuth, upload.single('image'), async (req: AuthRequest, res) => {
  if (!req.file) { res.status(400).json({ error: 'Aucun fichier fourni' }); return; }
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataUri = `data:${req.file.mimetype};base64,${b64}`;
    const result = await cloudinary.v2.uploader.upload(dataUri, {
      folder: 'zontes-pieces',
      transformation: [{ quality: 'auto', fetch_format: 'auto', width: 900, crop: 'limit' }],
    });
    res.json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur upload Cloudinary' });
  }
});

export default router;
