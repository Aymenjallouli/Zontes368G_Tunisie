import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  adminId?: number;
  adminEmail?: string;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Non autorisé' });
    return;
  }
  try {
    const token = header.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; email: string };
    req.adminId = payload.id;
    req.adminEmail = payload.email;
    next();
  } catch {
    res.status(401).json({ error: 'Token invalide ou expiré' });
  }
}
