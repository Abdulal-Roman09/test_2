const ROAST_LABELS = {
  light: 'LIGHT ROAST',
  medium: 'MEDIUM ROAST',
  dark: 'DARK ROAST',
};

export function roastLabel(roastLevel) {
  const value = (roastLevel || '').toLowerCase();
  if (value.startsWith('baked')) return 'BAKED FRESH';
  if (value.includes('dark')) return ROAST_LABELS.dark;
  if (value.includes('medium')) return ROAST_LABELS.medium;
  if (value.includes('light')) return ROAST_LABELS.light;
  return roastLevel ? roastLevel.toUpperCase() : ROAST_LABELS.medium;
}

export function formatPrice(amount) {
  return `$${Number(amount).toFixed(2)}`;
}

export function dietaryClasses(tag) {
  const key = (tag || '').toLowerCase();
  if (key === 'vegan') return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200';
  if (key === 'gf') return 'bg-[#efe2c8] text-[#6d5222] hover:bg-[#e3d1a9]';
  if (key.includes('dairy')) return 'bg-sky-100 text-sky-800 hover:bg-sky-200';
  if (key === 'vegetarian') return 'bg-lime-100 text-lime-800 hover:bg-lime-200';
  return 'bg-[#f1e9d9] text-[#4a3c2d] hover:bg-[#e4d8c0]';
}