const BASE = import.meta.env.VITE_API_URL ?? '';

const token = () => localStorage.getItem('admin_token');

const authHeaders = (): Record<string, string> => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token()}`,
});

async function json<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Erreur ${res.status}`);
  return data as T;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string | null;
  image_url: string;
  available: boolean;
  arrival_date: string | null;
  created_at: string;
  updated_at: string;
  categories?: Category | null;
}

export const api = {
  /* ── Public ── */
  getCategories: () =>
    fetch(`${BASE}/api/categories`).then(r => json<Category[]>(r)),

  getProducts: () =>
    fetch(`${BASE}/api/products`).then(r => json<Product[]>(r)),

  getConfig: () =>
    fetch(`${BASE}/api/config`).then(r => json<Record<string, string>>(r)),

  /* ── Auth ── */
  login: (email: string, password: string) =>
    fetch(`${BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(r => r.json() as Promise<{ token?: string; email?: string; error?: string }>),

  /* ── Admin — Categories ── */
  createCategory: (data: { name: string; slug: string }) =>
    fetch(`${BASE}/api/categories`, {
      method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
    }).then(r => json<Category>(r)),

  updateCategory: (id: string, data: { name: string; slug: string }) =>
    fetch(`${BASE}/api/categories/${id}`, {
      method: 'PUT', headers: authHeaders(), body: JSON.stringify(data),
    }).then(r => json<Category>(r)),

  deleteCategory: (id: string) =>
    fetch(`${BASE}/api/categories/${id}`, {
      method: 'DELETE', headers: authHeaders(),
    }).then(r => json<{ success: boolean }>(r)),

  /* ── Admin — Products ── */
  createProduct: (data: Partial<Product>) =>
    fetch(`${BASE}/api/products`, {
      method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
    }).then(r => json<Product>(r)),

  updateProduct: (id: string, data: Partial<Product>) =>
    fetch(`${BASE}/api/products/${id}`, {
      method: 'PUT', headers: authHeaders(), body: JSON.stringify(data),
    }).then(r => json<Product>(r)),

  deleteProduct: (id: string) =>
    fetch(`${BASE}/api/products/${id}`, {
      method: 'DELETE', headers: authHeaders(),
    }).then(r => json<{ success: boolean }>(r)),

  /* ── Admin — Config ── */
  updateConfig: (data: Record<string, string>) =>
    fetch(`${BASE}/api/config`, {
      method: 'PUT', headers: authHeaders(), body: JSON.stringify(data),
    }).then(r => json<{ success: boolean }>(r)),

  /* ── Admin — Upload ── */
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${BASE}/api/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token()}` },
      body: formData,
    });
    const data = await json<{ url: string }>(res);
    return data.url;
  },
};
