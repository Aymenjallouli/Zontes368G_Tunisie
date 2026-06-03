import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import categoriesRoutes from './routes/categories';
import productsRoutes from './routes/products';
import configRoutes from './routes/config';
import uploadRoutes from './routes/upload';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth',       authRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/products',   productsRoutes);
app.use('/api/config',     configRoutes);
app.use('/api/upload',     uploadRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date() }));

app.listen(PORT, () => console.log(`✓ Zontes API → http://localhost:${PORT}`));
