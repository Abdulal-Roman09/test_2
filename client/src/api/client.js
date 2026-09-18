// Base API URL falls back to relative /api which is proxied by Vite dev server
const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Fetch menu items with optional category, dietary tag, or featured filtering
 */
export async function fetchMenu(params = {}) {
  const query = new URLSearchParams();
  if (params.category && params.category !== 'All') {
    query.set('category', params.category);
  }
  if (params.dietary && params.dietary.length > 0) {
    query.set('dietary', Array.isArray(params.dietary) ? params.dietary.join(',') : params.dietary);
  }
  if (params.featured) {
    query.set('featured', 'true');
  }

  const url = `${API_BASE}/menu${query.toString() ? `?${query.toString()}` : ''}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch menu items (HTTP ${response.status})`);
  }
  
  return response.json();
}

/**
 * Fetch single menu item by ID
 */
export async function fetchMenuItem(id) {
  const response = await fetch(`${API_BASE}/menu/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch menu item ${id}`);
  }
  return response.json();
}

/**
 * Fetch single menu item by slug
 */
export async function fetchMenuItemBySlug(slug) {
  const response = await fetch(`${API_BASE}/menu/slug/${slug}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch menu item with slug '${slug}'`);
  }
  return response.json();
}

/**
 * Submit contact inquiry
 */
export async function submitContact(formData) {
  const response = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || 'Submission failed');
    error.errors = data.errors || {};
    throw error;
  }
  return data;
}

/**
 * Subscribe email to newsletter
 */
export async function subscribeNewsletter(email) {
  const response = await fetch(`${API_BASE}/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || 'Newsletter signup failed');
    error.errors = data.errors || {};
    throw error;
  }
  return data;
}
