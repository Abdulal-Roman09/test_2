import React, { useEffect, useRef } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { roastLabel, formatPrice, dietaryClasses } from './menuUtils';

export default function MenuItemModal({ item, qty = 0, onClose, onAdd, onIncrement, onDecrement }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name} details`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-espresso-950/60 backdrop-blur-sm animate-menu-backdrop-in" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-2xl animate-menu-modal-in overflow-hidden rounded-t-3xl bg-[#fffdf9] shadow-2xl sm:rounded-3xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-espresso-950/70 text-cream-50 backdrop-blur-md transition-colors duration-200 hover:bg-espresso-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Larger image */}
        <div className="relative h-56 w-full overflow-hidden sm:h-72">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          <span className="absolute bottom-4 right-4 rounded-full border border-gold-500/40 bg-espresso-950/90 px-4 py-1.5 font-display text-base font-bold text-gold-300 shadow-lg">
            {formatPrice(item.price)}
          </span>
        </div>

        {/* Full details */}
        <div className="p-6 sm:p-8">
          <div className="mb-3 flex items-start justify-between gap-4">
            <span className="pt-0.5 font-body text-xs font-semibold uppercase tracking-[0.12em] text-[#a67c2e]">
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

          <h3 className="font-display text-3xl font-bold leading-tight text-[#2e1f16]">
            {item.name}
          </h3>

          <p className="mt-3 font-body text-[15px] leading-relaxed text-[#6f6258]">
            {item.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-espresso-950/75 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-cream-50">
              {roastLabel(item.roastLevel)}
            </span>
            {item.origin && (
              <span className="font-body text-xs italic text-[#8b7d71]">
                Origin: {item.origin}
              </span>
            )}
          </div>

          <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-[#ece3d2] to-transparent" />

          <div className="mb-6">
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9c8a6f]">
              Tasting Notes
            </span>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {(item.tastingNotes || []).map((note) => (
                <span
                  key={note}
                  className="rounded-full bg-[#f1e9d9] px-3.5 py-1.5 font-body text-sm font-medium text-[#47382a] transition-colors duration-200 hover:bg-[#e3d6bc]"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Add to Order */}
          {qty === 0 ? (
            <button
              type="button"
              onClick={onAdd}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-espresso-950 px-5 py-3 font-body text-sm font-semibold text-cream-50 shadow-md transition-all duration-200 hover:bg-espresso-900 hover:shadow-lg active:scale-[0.98]"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Order · {formatPrice(item.price)}
            </button>
          ) : (
            <div className="flex items-center justify-between rounded-full border border-[#e3d7c0] bg-[#fbf7ee] p-1.5 pl-5">
              <span className="font-body text-sm font-medium text-[#5c4b3a]">
                {qty} {qty === 1 ? 'item' : 'items'} in your order
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={onDecrement}
                  aria-label={`Remove one ${item.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#efe6d4] text-[#4a3c2d] transition-colors duration-200 hover:bg-[#e0d3ba] active:scale-95"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-7 text-center font-display text-lg font-bold text-[#2e1f16]">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={onIncrement}
                  aria-label={`Add one ${item.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-espresso-950 text-cream-50 transition-colors duration-200 hover:bg-espresso-800 active:scale-95"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}