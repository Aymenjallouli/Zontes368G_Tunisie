import bcrypt from 'bcryptjs';
import { pool } from '../src/db';
import dotenv from 'dotenv';
dotenv.config();

const [,, email, password] = process.argv;

if (!email || !password) {
  console.error('Usage: npx tsx scripts/create-admin.ts <email> <password>');
  process.exit(1);
}

(async () => {
  const hash = await bcrypt.hash(password, 12);
  await pool.query(
    'INSERT INTO admin_users (email, password_hash) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET password_hash=$2',
    [email, hash]
  );
  console.log(`✓ Admin créé / mis à jour : ${email}`);
  await pool.end();
})();
