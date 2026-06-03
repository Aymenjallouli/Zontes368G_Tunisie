-- ============================================================
-- Zontes 368 G — Supabase Setup
-- Coller ce SQL dans : Supabase > SQL Editor > New query
-- ============================================================

-- Catégories de pièces & accessoires
CREATE TABLE categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Produits (pièces & accessoires)
CREATE TABLE products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text DEFAULT '',
  price numeric(10,3) NOT NULL DEFAULT 0,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  image_url text DEFAULT '',
  available boolean DEFAULT true,
  arrival_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Configuration du site (disponibilité moto, etc.)
CREATE TABLE site_config (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Valeurs par défaut
INSERT INTO site_config (key, value) VALUES
  ('moto_available', 'true'),
  ('moto_arrival_date', '');

-- ──────────────────────────────────────────────────────────
-- Sécurité (RLS)
-- ──────────────────────────────────────────────────────────
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- Lecture publique (page Pièces & Accessoires)
CREATE POLICY "public_read_categories" ON categories FOR SELECT USING (true);
CREATE POLICY "public_read_products"   ON products   FOR SELECT USING (true);
CREATE POLICY "public_read_config"     ON site_config FOR SELECT USING (true);

-- Écriture authentifiée (admin uniquement)
CREATE POLICY "auth_write_categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_write_products"   ON products   FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_write_config"     ON site_config FOR ALL USING (auth.role() = 'authenticated');

-- ──────────────────────────────────────────────────────────
-- Trigger updated_at sur products
-- ──────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ──────────────────────────────────────────────────────────
-- Storage bucket pour les images produits
-- (faire manuellement dans Supabase > Storage > New Bucket)
-- Nom du bucket : product-images
-- Type : Public
-- Puis ajouter la policy Storage :
--   INSERT pour authenticated, SELECT pour public
-- ──────────────────────────────────────────────────────────
