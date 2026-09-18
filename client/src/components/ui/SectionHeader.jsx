import React from 'react';

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  theme = 'light',
  className = ''
}) {
  const isCenter = align === 'center';

  return (
    <div className={`max-w-2xl ${isCenter ? 'mx-auto text-center' : ''} mb-12 sm:mb-16 ${className}`}>
      {eyebrow && (
        <span className={`inline-block text-xs font-semibold tracking-widest uppercase mb-3 ${
          theme === 'dark' ? 'text-gold-400' : 'text-gold-600'
        }`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance leading-tight ${
        theme === 'dark' ? 'text-cream-50' : 'text-espresso-950'
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed text-balance ${
          theme === 'dark' ? 'text-cream-300/80' : 'text-espresso-700/80'
        }`}>
          {description}
        </p>
      )}
    </div>
  );
}
