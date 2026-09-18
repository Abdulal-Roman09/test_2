import React from 'react';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import { roastLabel, formatPrice, dietaryClasses } from './menuUtils';

export default function MenuCard({ item, qty = 0, onOpen, onAdd, onIncrement, onDecrement }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      aria-label={`View details for ${item.name}`}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-[#e7dfd0] bg-[#fffdf9] shadow-[0_2px_14px_-4px_rgba(13,8,6,0.12)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#dfd2b6] hover:shadow-[0_22px_45px_-18px_rgba(13,8,6,0.30)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf6ef]"
    >
      {/* Photo */}
      <div className="relative aspect-[16/10] overflow-hidden bg-espresso-900 rounded-t-3xl">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
        />

        {/* Price pill */}
        <span className="absolute right-3.5 top-3.5 rounded-full border border-gold-500/40 bg-espresso-950/90 px-3.5 py-1 font-display text-sm font-bold text-gold-300 shadow-md group-hover:animate-[price-pulse_1s_ease-in-out_infinite]">
          {formatPrice(item.price)}
        </span>

        {/* Roast-level tag */}
        <span className="absolute bottom-3.5 left-3.5 rounded-full bg-espresso-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-cream-50 backdrop-blur-sm">
          {roastLabel(item.roastLevel)}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Category + dietary pills */}
        <div className="mb-2.5 flex items-start justify-between gap-3">
          <span className="pt-0.5 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-[#a67c2e]">
            {item.category}
          </span>
          <div className="flex flex-wrap justify-end gap-1.5">
            {(item.dietary || []).map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center rounded-full px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-wider transition-colors duration-200 ${dietaryClasses(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Drink name */}
        <h3 className="font-display text-xl font-bold leading-snug text-[#2e1f16]">{item.name}</h3>

        {/* Description */}
        <p className="mt-2 font-body text-sm leading-relaxed text-[#7a6c61]">{item.description}</p>

        {/* Divider */}
        <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-[#ece3d2] to-transparent" />

        {/* Tasting notes */}
        <div>
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9c8a6f]">
            Tasting Notes
          </span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {(item.tastingNotes || []).map((note) => (
              <span
                key={note}
                className="rounded-full bg-[#f1e9d9] px-3 py-1 font-body text-xs font-medium text-[#47382a] transition-colors duration-200 hover:bg-[#e3d6bc]"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Origin */}
        {item.origin && (
          <p className="mt-3.5 font-body text-xs italic text-[#8b7d71]">Origin: {item.origin}</p>
        )}

        {/* Add to Order (revealed on hover) */}
        <div
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          className="mt-auto pt-5"
        >
          <div className="translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            {qty === 0 ? (
              <button
                type="button"
                onClick={onAdd}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-espresso-950 px-4 py-2.5 font-body text-sm font-semibold text-cream-50 shadow-md transition-colors duration-200 hover:bg-espresso-900 active:scale-[0.98]"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Order
              </button>
            ) : (
              <div className="flex items-center justify-between rounded-full border border-[#e3d7c0] bg-[#fbf7ee] p-1 pl-4">
                <span className="font-body text-xs font-medium text-[#5c4b3a]">
                  {qty} in order
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={onDecrement}
                    aria-label={`Remove one ${item.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#efe6d4] text-[#4a3c2d] transition-colors duration-200 hover:bg-[#e0d3ba] active:scale-95"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center font-display text-sm font-bold text-[#2e1f16]">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={onIncrement}
                    aria-label={`Add one ${item.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso-950 text-cream-50 transition-colors duration-200 hover:bg-espresso-800 active:scale-95"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}