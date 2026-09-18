import React from 'react';

export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`bg-cream-100/90 rounded-2xl border border-cream-300/70 p-6 shadow-sm ${
        hover ? 'transition-all duration-300 hover:shadow-artisanal hover:border-gold-500/50 hover:-translate-y-1' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
