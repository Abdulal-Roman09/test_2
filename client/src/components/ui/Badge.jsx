import React from 'react';

export default function Badge({ children, variant = 'default', className = '' }) {
  const normalized = typeof children === 'string' ? children.toLowerCase() : '';

  let colorClasses = 'bg-cream-200 text-espresso-800 border-cream-300';

  if (variant === 'gold' || normalized === 'featured') {
    colorClasses = 'bg-gold-500/15 text-gold-700 border-gold-500/30';
  } else if (normalized.includes('vegan')) {
    colorClasses = 'bg-emerald-900/10 text-emerald-800 border-emerald-700/30';
  } else if (normalized.includes('gf') || normalized.includes('gluten')) {
    colorClasses = 'bg-amber-900/10 text-amber-800 border-amber-700/30';
  } else if (normalized.includes('dairy')) {
    colorClasses = 'bg-sky-900/10 text-sky-800 border-sky-700/30';
  } else if (normalized.includes('roast')) {
    colorClasses = 'bg-espresso-800 text-cream-200 border-espresso-700';
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide uppercase border ${colorClasses} ${className}`}
    >
      {children}
    </span>
  );
}
